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
  const mediaPromiseRef = useRef<Promise<MediaStream | null> | null>(null)
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
    mediaPromiseRef.current = null
    localRef.current?.getTracks().forEach(t => t.stop())
    localRef.current = null
    setLocalStream(null)
    setRemoteStream(null)
    callIdRef.current = null
    remoteReady.current = false
    pendingIce.current = []
    phaseRef.current = 'idle'
    setPhase('idle')
    setPeerName(null)
  }

  /**
   * Yerel kamera/mikrofon akışını açar. Kullanıcı tıklaması sırasında (startCall)
   * çağrıldığında tarayıcı izin penceresi güvenilir şekilde tetiklenir; kamera/mikrofon
   * hiç açılamasa bile çağrıyı koparmak yerine null döner (recvonly devam edilir).
   */
  const acquireLocalStream = (): Promise<MediaStream | null> => {
    if (localRef.current) {
      return Promise.resolve(localRef.current)
    }
    if (mediaPromiseRef.current) {
      return mediaPromiseRef.current
    }
    const promise = (async (): Promise<MediaStream | null> => {
      if (
        typeof navigator === 'undefined' ||
        !navigator.mediaDevices?.getUserMedia
      ) {
        toast.warning(
          'Kamera/mikrofon erişimi yok — görüşmeye yalnız alıcı olarak devam ediliyor.',
        )
        return null
      }
      let stream: MediaStream
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })
      } catch (videoAudioErr) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ audio: true })
          toast.warning('Kamera açılamadı — sesli devam ediliyor.')
        } catch {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true })
            toast.warning(
              'Mikrofon açılamadı — yalnız görüntü ile devam ediliyor.',
            )
          } catch {
            toast.warning(
              `${mediaErrorMessage(videoAudioErr)} Karşı tarafın ses/görüntüsü alınacak.`,
            )
            return null
          }
        }
      }
      if (phaseRef.current === 'idle') {
        stream.getTracks().forEach(t => t.stop())
        return null
      }
      stream.getAudioTracks().forEach(t => {
        t.enabled = micOn
      })
      stream.getVideoTracks().forEach(t => {
        t.enabled = camOn
      })
      localRef.current = stream
      setLocalStream(stream)
      return stream
    })().finally(() => {
      mediaPromiseRef.current = null
    })
    mediaPromiseRef.current = promise
    return promise
  }

  // Caller: ANSWERED sonrası pc kur + offer üret
  const setupPeerAndOffer = async () => {
    // Aynı çağrı için mükerrer ANSWERED sinyali (/user/queue/rtc + /topic/rtc-client) gelirse ikinci kez kurma.
    if (pcRef.current) return
    const targetCallId = callIdRef.current
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
      if (e.streams[0]) {
        setRemoteStream(e.streams[0])
      } else if (e.track) {
        setRemoteStream(prev => {
          const next = prev
            ? new MediaStream(prev.getTracks())
            : new MediaStream()
          next.addTrack(e.track)
          return next
        })
      }
    }

    const stream = localRef.current ?? (await acquireLocalStream())
    if (pcRef.current !== pc || callIdRef.current !== targetCallId) {
      return
    }
    if (stream) {
      stream.getTracks().forEach(t => pc.addTrack(t, stream))
      if (
        stream.getAudioTracks().length === 0 &&
        typeof pc.addTransceiver === 'function'
      ) {
        pc.addTransceiver('audio', { direction: 'recvonly' })
      }
      if (
        stream.getVideoTracks().length === 0 &&
        typeof pc.addTransceiver === 'function'
      ) {
        pc.addTransceiver('video', { direction: 'recvonly' })
      }
    } else if (typeof pc.addTransceiver === 'function') {
      pc.addTransceiver('audio', { direction: 'recvonly' })
      pc.addTransceiver('video', { direction: 'recvonly' })
    }

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
    // Başka/eski bir çağrıya ait sinyalleri yoksay.
    if (
      sig.callId &&
      callIdRef.current &&
      sig.callId !== callIdRef.current &&
      sig.type !== 'RINGING'
    ) {
      return
    }
    switch (sig.type) {
      case 'RINGING':
        if (phaseRef.current !== 'calling') return
        callIdRef.current = sig.callId
        break
      case 'ANSWERED':
        if (phaseRef.current !== 'calling' && phaseRef.current !== 'active') {
          return
        }
        if (pcRef.current) return
        callIdRef.current = sig.callId
        setPeerName(sig.peerDisplayName ?? 'Temsilci')
        phaseRef.current = 'active'
        setPhase('active')
        setupPeerAndOffer().catch(err => {
          console.error('WebRTC offer oluşturulamadı', err)
          toast.error('Görüşme bağlantısı başlatılamadı.')
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
    phaseRef.current = 'calling'
    setPhase('calling')
    setPeerName(null)
    void acquireLocalStream()
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
