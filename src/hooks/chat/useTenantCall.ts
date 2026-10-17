import { CHAT_TENANT_ID, ELLY_API_URL, ICE_SERVERS } from '@/lib/chat-config'
import type { CallSignal, TenantCallPhase } from '@/types/call'
import { Client } from '@stomp/stompjs'
import { useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'
import { toast } from 'sonner'

/** getUserMedia hatasını kullanıcıya anlaşılır Türkçe mesaja çevirir. */
function mediaErrorMessage(err: unknown): string {
  const name = (err as { name?: string })?.name
  switch (name) {
    case 'NotAllowedError':
      return 'Kamera/mikrofon izni reddedildi — adres çubuğundaki kamera simgesinden izin verin.'
    case 'NotFoundError':
      return 'Kamera veya mikrofon bulunamadı.'
    case 'NotReadableError':
      return 'Kamera/mikrofon başka bir uygulama tarafından kullanılıyor.'
    default:
      return 'Kamera/mikrofon açılamadı.'
  }
}

/**
 * Tenant destek araması (WebRTC caller). Login'li tenant kullanıcısı "Görüntülü destek"e
 * basınca tüm online panel kullanıcılarına ring-all gider; ilk cevaplayan ile 1:1 görüşme.
 *
 * Kendi STOMP bağlantısını (auth JWT) açar ve {@code /user/queue/rtc}'yi dinler. Caller
 * olduğu için ANSWERED gelince offer üretir. Panel tenant'ı ARAMADIĞINDAN INCOMING_CALL almaz.
 */
export function useTenantCall(token: string, enabled: boolean) {
  const [phase, setPhase] = useState<TenantCallPhase>('idle')
  const [peerName, setPeerName] = useState<string | null>(null)
  const [micOn, setMicOn] = useState(true)
  const [camOn, setCamOn] = useState(true)
  const [localStream, setLocalStream] = useState<MediaStream | null>(null)
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

  // Client tarafı ref — caller sinyallerine /topic/rtc-client/{myRef}/rtc'den abone olunur
  // (userId lookup gerekmez; prod'da o zincir kırılgan). Session boyunca sabit.
  const [myRef] = useState(
    () =>
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random().toString(36).slice(2)}`,
  )
  const [connected, setConnected] = useState(false)

  const clientRef = useRef<Client | null>(null)
  const callIdRef = useRef<string | null>(null)
  const pcRef = useRef<RTCPeerConnection | null>(null)
  const localRef = useRef<MediaStream | null>(null)
  const pendingIce = useRef<RTCIceCandidateInit[]>([])
  const remoteReady = useRef(false)
  const phaseRef = useRef<TenantCallPhase>('idle')
  const handlerRef = useRef<(s: CallSignal) => void>(() => {})

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  const publish = (destination: string, body?: unknown) => {
    const c = clientRef.current
    if (!c?.connected) return
    c.publish({
      destination,
      body: body !== undefined ? JSON.stringify(body) : '',
    })
  }

  const teardown = () => {
    const pc = pcRef.current
    if (pc) {
      pc.onicecandidate = null
      pc.ontrack = null
      pc.close()
      pcRef.current = null
    }
    localRef.current?.getTracks().forEach(t => t.stop())
    localRef.current = null
    setLocalStream(null)
    setRemoteStream(null)
    callIdRef.current = null
    remoteReady.current = false
    pendingIce.current = []
    setPhase('idle')
    setPeerName(null)
  }

  // Caller: ANSWERED sonrası pc kur + offer üret
  const setupPeerAndOffer = async () => {
    // getUserMedia yalnız güvenli bağlamda (HTTPS/localhost) tanımlıdır.
    if (!navigator.mediaDevices?.getUserMedia) {
      toast.error('Görüntülü görüşme için HTTPS veya localhost gerekir.')
      if (callIdRef.current) publish(`/app/rtc/${callIdRef.current}/hangup`)
      teardown()
      return
    }
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS })
    pcRef.current = pc
    remoteReady.current = false
    pendingIce.current = []
    pc.onicecandidate = e => {
      if (e.candidate && callIdRef.current) {
        publish(`/app/rtc/${callIdRef.current}/ice`, {
          candidate: e.candidate.candidate,
          sdpMid: e.candidate.sdpMid,
          sdpMLineIndex: e.candidate.sdpMLineIndex,
        })
      }
    }
    pc.ontrack = e => {
      if (e.streams[0]) setRemoteStream(e.streams[0])
    }
    // Önce kamera+mikrofon; olmazsa sese düş (kamera bloklu ama mik açık olabilir).
    // Ses de alınamazsa hata dışarı fırlar → ANSWERED catch'i toast + hangup yapar.
    let stream: MediaStream
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      })
    } catch {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      toast.warning('Kamera açılamadı — sesli devam ediliyor.')
    }
    localRef.current = stream
    setLocalStream(stream)
    stream.getTracks().forEach(t => pc.addTrack(t, stream))
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    if (offer.sdp && callIdRef.current) {
      publish(`/app/rtc/${callIdRef.current}/sdp`, {
        sdpType: 'offer',
        sdp: offer.sdp,
      })
    }
  }

  // Sinyal işleyici — her render'da yeniden oluşur; ref'e effect'te bağlanır (aşağıda).
  const handleSignal = (sig: CallSignal) => {
    switch (sig.type) {
      case 'RINGING':
        callIdRef.current = sig.callId
        break
      case 'ANSWERED':
        callIdRef.current = sig.callId
        setPeerName(sig.peerDisplayName ?? 'Temsilci')
        setPhase('active')
        setupPeerAndOffer().catch(err => {
          console.error('getUserMedia/offer başarısız', err)
          toast.error(mediaErrorMessage(err))
          if (callIdRef.current) publish(`/app/rtc/${callIdRef.current}/hangup`)
          teardown()
        })
        break
      case 'SDP': {
        const pc = pcRef.current
        if (pc && sig.sdp) {
          pc.setRemoteDescription({
            type: sig.sdpType as RTCSdpType,
            sdp: sig.sdp,
          })
            .then(async () => {
              remoteReady.current = true
              for (const c of pendingIce.current) {
                await pc.addIceCandidate(c).catch(() => {})
              }
              pendingIce.current = []
            })
            .catch(e => console.error('SDP uygulanamadı', e))
        }
        break
      }
      case 'ICE': {
        const pc = pcRef.current
        if (pc && sig.candidate) {
          const cand: RTCIceCandidateInit = {
            candidate: sig.candidate,
            sdpMid: sig.sdpMid ?? undefined,
            sdpMLineIndex: sig.sdpMLineIndex ?? undefined,
          }
          if (remoteReady.current) {
            pc.addIceCandidate(cand).catch(() => {})
          } else {
            pendingIce.current.push(cand)
          }
        }
        break
      }
      // Caller için terminal sinyaller
      case 'REJECTED':
      case 'HANGUP':
      case 'TIMEOUT':
      case 'CANCELLED':
      case 'CALL_TAKEN':
      case 'UNAVAILABLE':
      case 'BUSY':
      case 'ERROR':
        teardown()
        break
    }
  }

  // Güncel işleyiciyi ref'e effect'te bağla (render'da ref yazma — react-hooks/refs).
  useEffect(() => {
    handlerRef.current = handleSignal
  })

  // STOMP bağlantısı (auth token) + /user/queue/rtc (yedek) aboneliği
  useEffect(() => {
    if (!enabled || !token) return
    const client = new Client({
      webSocketFactory: () => new SockJS(`${ELLY_API_URL}/ws`),
      connectHeaders: { Authorization: `Bearer ${token}` },
      reconnectDelay: 5000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      onConnect: () => {
        setConnected(true)
        client.subscribe('/user/queue/rtc', frame => {
          try {
            handlerRef.current(JSON.parse(frame.body) as CallSignal)
          } catch (e) {
            console.error('rtc sinyali parse edilemedi', e)
          }
        })
      },
      onDisconnect: () => setConnected(false),
      onWebSocketClose: () => setConnected(false),
    })
    client.activate()
    clientRef.current = client
    return () => {
      void client.deactivate()
      clientRef.current = null
      setConnected(false)
      teardown()
    }
  }, [enabled, token])

  // ESAS teslim yolu: /topic/rtc-client/{myRef}/rtc (userId gerekmez; user-queue teslim etmiyor).
  // Bağlantı kurulunca abone olunur.
  useEffect(() => {
    const c = clientRef.current
    if (!connected || !c) return
    const sub = c.subscribe(`/topic/rtc-client/${myRef}/rtc`, frame => {
      try {
        handlerRef.current(JSON.parse(frame.body) as CallSignal)
      } catch (e) {
        console.error('rtc topic sinyali parse edilemedi', e)
      }
    })
    return () => {
      try {
        sub.unsubscribe()
      } catch {
        // yoksay
      }
    }
  }, [connected, myRef])

  // Mute / kamera toggle
  useEffect(() => {
    localRef.current?.getAudioTracks().forEach(t => {
      t.enabled = micOn
    })
  }, [micOn])
  useEffect(() => {
    localRef.current?.getVideoTracks().forEach(t => {
      t.enabled = camOn
    })
  }, [camOn])

  const startCall = () => {
    if (phaseRef.current !== 'idle') return
    if (!clientRef.current?.connected) {
      toast.error('Bağlantı kurulamadı — sayfayı yenileyip tekrar deneyin')
      return
    }
    setPhase('calling')
    setPeerName(null)
    publish(`/app/tenant-rtc/${CHAT_TENANT_ID}/call`, { clientRef: myRef })
  }

  const hangup = () => {
    if (callIdRef.current) {
      publish(
        `/app/rtc/${callIdRef.current}/${phaseRef.current === 'active' ? 'hangup' : 'cancel'}`,
      )
    }
    teardown()
  }

  return {
    phase,
    peerName,
    micOn,
    camOn,
    localStream,
    remoteStream,
    startCall,
    hangup,
    toggleMic: () => setMicOn(v => !v),
    toggleCam: () => setCamOn(v => !v),
  }
}
