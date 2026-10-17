import { useGuestChat } from '@/hooks/chat/useGuestChat'
import { ChatGroup } from '@/types/chat'
import { useEffect, useRef } from 'react'
import { ChatComposer } from './ChatComposer'
import { MessageBubble } from './MessageBubble'

export function ChatView({
  token,
  mySessionId,
  myUsername,
  group,
  onAuthExpired,
}: {
  token: string
  mySessionId: string | null
  /** Login'li kullanıcının username'i — "kendi mesajım" eşleşmesi için (guest'te null). */
  myUsername?: string | null
  group: ChatGroup
  onAuthExpired?: () => void
}) {
  const { messages, connected, banned, typingUsers, sendMessage, sendTyping } =
    useGuestChat(token, group.id, mySessionId, onAuthExpired)
  const bottomRef = useRef<HTMLDivElement>(null)

  // "Kendi mesajım":
  // - Login'li (myUsername): mesajın senderUsername'i benimkine eşit (GUEST değil).
  // - Guest (mySessionId): GUEST + mesajın sessionId'si benim oturum kimliğime eşit.
  //   (sessionId cihaz bazlı kalıcı → aynı tarayıcıdan dönen guest'in eski mesajları da eşleşir.)
  const isOwnMessage = (msg: (typeof messages)[number]) =>
    myUsername != null
      ? msg.senderType !== 'GUEST' && msg.senderUsername === myUsername
      : msg.senderType === 'GUEST' &&
        mySessionId !== null &&
        msg.sessionId === mySessionId

  const typingLabel =
    typingUsers.length === 0
      ? null
      : typingUsers.length === 1
        ? `${typingUsers[0]} yazıyor…`
        : `${typingUsers.length} kişi yazıyor…`

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, typingLabel])

  return (
    <div className="flex h-full flex-col">
      {!connected && (
        <div className="px-3 py-1 text-xs text-amber-500">Bağlanıyor…</div>
      )}
      <div className="flex-1 space-y-3 overflow-y-auto p-3">
        {messages.length === 0 && (
          <p className="text-xs text-muted-foreground">
            İlk mesajı siz yazın 👋
          </p>
        )}
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} isOwn={isOwnMessage(msg)} />
        ))}
        <div ref={bottomRef} />
      </div>
      {typingLabel && !banned && (
        <p className="animate-pulse px-3 py-1 text-xs italic text-muted-foreground">
          {typingLabel}
        </p>
      )}
      {banned && (
        <p className="border-destructive/30 bg-destructive/10 border-t px-3 py-2 text-center text-xs text-destructive">
          Yazma yetkiniz kaldırıldı. Mesajları görmeye devam edebilirsiniz.
        </p>
      )}
      <ChatComposer
        disabled={!connected || banned}
        banned={banned}
        onSubmit={content => sendMessage(content)}
        onTyping={sendTyping}
      />
    </div>
  )
}
