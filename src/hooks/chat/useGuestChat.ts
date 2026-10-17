import { CHAT_TENANT_ID, ELLY_API_URL } from '@/lib/chat-config'
import { publicChatApi } from '@/services/chat/publicChatApi'
import { ChatBanEvent, ChatMessage, ChatTyping } from '@/types/chat'
import { Client } from '@stomp/stompjs'
import { useCallback, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'

/** Mesajları createdAt'e göre ASC (eskiden yeniye) sıralar — API/realtime sırasından bağımsız. */
function byCreatedAtAsc(a: ChatMessage, b: ChatMessage): number {
  return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
}

const TYPING_TTL_MS = 5500 // bu süre yeni event gelmezse "yazıyor" kalkar (backend ile uyumlu)
const TYPING_THROTTLE_MS = 2500 // typing event'ini en sık bu aralıkla gönder

/**
 * Bir grubun geçmişini (anonim public GET) + canlı WS akışını (mesaj & typing) yönetir.
 *
 * - "Kendi mesajım": ChatView'de sessionId ile.
 * - Typing: hem dinler (kim yazıyorsa gösterir, kendi sessionId'si hariç) hem gönderir.
 */
/** STOMP hata mesajı token süresi/geçersizliğine işaret ediyor mu? */
function isAuthError(frameText: string): boolean {
  return /jwt|token|expired|unauthor|forbidden/i.test(frameText)
}

export function useGuestChat(
  token: string,
  groupId: string,
  mySessionId: string | null,
  onAuthExpired?: () => void,
) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [connected, setConnected] = useState(false)
  const [typingUsers, setTypingUsers] = useState<string[]>([])
  // Bu ziyaretçi (mySessionId) banlı mı → composer kilitlenir, okuma serbest
  const [banned, setBanned] = useState(false)
  const clientRef = useRef<Client | null>(null)
  const mySessionIdRef = useRef(mySessionId)
  useEffect(() => {
    mySessionIdRef.current = mySessionId
  }, [mySessionId])
  const onAuthExpiredRef = useRef(onAuthExpired)
  useEffect(() => {
    onAuthExpiredRef.current = onAuthExpired
  }, [onAuthExpired])
  // Aynı (ölü) token için yenilemeyi yalnızca bir kez tetikle → sonsuz döngü olmasın
  const authHandledRef = useRef<string | null>(null)
  const lastTypingSentRef = useRef(0)
  const typingTimersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(
    new Map(),
  )

  // Bir kullanıcının "yazıyor" göstergesini ve zamanlayıcısını anında temizler
  const clearTyping = useCallback((name: string) => {
    setTypingUsers(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : prev,
    )
    const timers = typingTimersRef.current
    const t = timers.get(name)
    if (t) {
      clearTimeout(t)
      timers.delete(name)
    }
  }, [])

  const upsert = useCallback(
    (msg: ChatMessage) => {
      setMessages(prev =>
        prev.some(m => m.id === msg.id)
          ? prev
          : [...prev, msg].sort(byCreatedAtAsc),
      )
      // Mesaj geldi → göndericinin "yazıyor"unu hemen kaldır (TTL'i bekleme)
      if (msg.senderUsername) clearTyping(msg.senderUsername)
    },
    [clearTyping],
  )

  const handleTyping = useCallback(
    (data: ChatTyping) => {
      // Kendi typing echo'mu gösterme
      if (data.sessionId && data.sessionId === mySessionIdRef.current) return
      const name = data.username
      if (!name) return
      setTypingUsers(prev => (prev.includes(name) ? prev : [...prev, name]))
      const timers = typingTimersRef.current
      const existing = timers.get(name)
      if (existing) clearTimeout(existing)
      timers.set(
        name,
        setTimeout(() => clearTyping(name), TYPING_TTL_MS),
      )
    },
    [clearTyping],
  )

  // Ban/unban olayı — yalnızca kendi sessionId'im hedeflenince state değişir
  const handleBan = useCallback((event: ChatBanEvent) => {
    if (event.sessionId && event.sessionId === mySessionIdRef.current) {
      setBanned(event.action === 'BANNED')
    }
  }, [])

  // 1) Geçmiş (anonim public GET)
  useEffect(() => {
    let alive = true
    publicChatApi
      .getHistory(groupId)
      .then(h => {
        if (alive) {
          setMessages([...h].sort(byCreatedAtAsc))
          setBanned(false) // yeni grup → ban durumu sıfırla
        }
      })
      .catch(() => {
        /* geçmiş yoksa boş başlar */
      })
    return () => {
      alive = false
    }
  }, [groupId])

  // 2) Canlı (WS): mesaj + typing
  useEffect(() => {
    if (!token) return

    const client = new Client({
      webSocketFactory: () => new SockJS(`${ELLY_API_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        setConnected(true)
        const base = `/topic/tenant/${CHAT_TENANT_ID}/group/${groupId}`
        client.subscribe(base, frame => {
          try {
            upsert(JSON.parse(frame.body) as ChatMessage)
          } catch (e) {
            console.error('Failed to parse chat message', e)
          }
        })
        client.subscribe(`${base}/typing`, frame => {
          try {
            handleTyping(JSON.parse(frame.body) as ChatTyping)
          } catch (e) {
            console.error('Failed to parse typing', e)
          }
        })
        client.subscribe(`${base}/bans`, frame => {
          try {
            handleBan(JSON.parse(frame.body) as ChatBanEvent)
          } catch (e) {
            console.error('Failed to parse ban event', e)
          }
        })
      },
      onDisconnect: () => setConnected(false),
      onWebSocketClose: () => setConnected(false),
      onStompError: frame => {
        console.error('STOMP error', frame.headers, frame.body)
        const text = `${frame.headers?.message ?? ''} ${frame.body ?? ''}`
        // Edge: banlı ziyaretçi yazmayı denerse backend reddeder (CHAT_BANNED) →
        // bağlantıyı/refresh'i tetikleme, sadece composer'ı kilitle
        if (/CHAT_BANNED/i.test(text)) {
          setBanned(true)
          return
        }
        // Token süresi dolmuş/geçersiz → ölü token'la reconnect döngüsünü durdur,
        // yeni token iste (token değişince effect yeniden bağlanır)
        if (isAuthError(text) && authHandledRef.current !== token) {
          authHandledRef.current = token
          void client.deactivate()
          setConnected(false)
          onAuthExpiredRef.current?.()
        }
      },
    })

    client.activate()
    clientRef.current = client

    const timers = typingTimersRef.current
    return () => {
      void client.deactivate()
      clientRef.current = null
      setConnected(false)
      timers.forEach(t => clearTimeout(t))
      timers.clear()
      setTypingUsers([])
    }
  }, [token, groupId, upsert, handleTyping, handleBan])

  const sendMessage = useCallback(
    (content: string) => {
      const c = clientRef.current
      const trimmed = content.trim()
      if (!c || !c.connected || !trimmed) return
      c.publish({
        destination: `/app/tenant-chat/${CHAT_TENANT_ID}/${groupId}/send`,
        body: JSON.stringify({ content: trimmed }),
      })
    },
    [groupId],
  )

  // Yazarken çağrılır; throttle ile en sık TYPING_THROTTLE_MS aralıkla yayınlar.
  const sendTyping = useCallback(() => {
    const c = clientRef.current
    if (!c || !c.connected) return
    const now = Date.now()
    if (now - lastTypingSentRef.current < TYPING_THROTTLE_MS) return
    lastTypingSentRef.current = now
    c.publish({
      destination: `/app/tenant-chat/${CHAT_TENANT_ID}/${groupId}/typing`,
      body: '',
    })
  }, [groupId])

  return { messages, connected, banned, typingUsers, sendMessage, sendTyping }
}
