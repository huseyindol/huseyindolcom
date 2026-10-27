import type { TenantCallPhase } from '@/types/call'
import { Mic, MicOff, PhoneOff, Video, VideoOff } from 'lucide-react'
import { useEffect, useRef } from 'react'

interface Props {
  phase: TenantCallPhase
  peerName: string | null
  micOn: boolean
  camOn: boolean
  localStream: MediaStream | null
  remoteStream: MediaStream | null
  onHangup: () => void
  onToggleMic: () => void
  onToggleCam: () => void
}

/** Tenant destek görüşmesi — chat panelinin üstüne binen basit görüşme ekranı. */
export function CallView({
  phase,
  peerName,
  micOn,
  camOn,
  localStream,
  remoteStream,
  onHangup,
  onToggleMic,
  onToggleCam,
}: Props) {
  const localVideo = useRef<HTMLVideoElement>(null)
  const remoteVideo = useRef<HTMLVideoElement>(null)
  const remoteAudio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const videoEl = localVideo.current
    if (!videoEl) return
    videoEl.srcObject = localStream
    if (localStream) {
      void videoEl.play().catch(() => {})
    }
  }, [localStream, phase])

  useEffect(() => {
    const videoEl = remoteVideo.current
    if (videoEl) {
      videoEl.srcObject = remoteStream
      if (remoteStream) {
        void videoEl.play().catch(() => {})
      }
    }
    const audioEl = remoteAudio.current
    if (audioEl) {
      const audioTracks = remoteStream?.getAudioTracks() ?? []
      if (audioTracks.length > 0) {
        audioTracks.forEach(t => {
          t.enabled = true
        })
        audioEl.srcObject = new MediaStream(audioTracks)
        audioEl.muted = false
        audioEl.volume = 1
        void audioEl.play().catch(() => {})
      } else {
        audioEl.srcObject = null
      }
    }
  }, [remoteStream, phase])

  if (phase === 'idle') return null
  const active = phase === 'active'

  return (
    <div className="absolute inset-0 z-20 flex flex-col bg-slate-950">
      <audio ref={remoteAudio} autoPlay className="hidden" />
      <div className="relative flex-1">
        {active ? (
          <video
            ref={remoteVideo}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center text-slate-300">
            <div className="bg-primary/30 mb-3 h-14 w-14 animate-pulse rounded-full" />
            <p className="text-sm">Temsilciye bağlanılıyor…</p>
          </div>
        )}
        <p className="absolute left-3 top-3 rounded bg-black/50 px-2 py-0.5 text-xs text-white">
          {active ? (peerName ?? 'Temsilci') : 'Destek çağrısı'}
        </p>
        <video
          ref={localVideo}
          autoPlay
          playsInline
          muted
          className="absolute bottom-3 right-3 h-24 w-32 rounded-lg object-cover ring-1 ring-white/20"
        />
      </div>
      <div className="flex items-center justify-center gap-4 bg-slate-900 py-4">
        {active && (
          <>
            <button
              type="button"
              onClick={onToggleMic}
              aria-label={micOn ? 'Mikrofonu kapat' : 'Mikrofonu aç'}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition ${
                micOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-rose-600'
              }`}
            >
              {micOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </button>
            <button
              type="button"
              onClick={onToggleCam}
              aria-label={camOn ? 'Kamerayı kapat' : 'Kamerayı aç'}
              className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition ${
                camOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-rose-600'
              }`}
            >
              {camOn ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </button>
          </>
        )}
        <button
          type="button"
          onClick={onHangup}
          aria-label={active ? 'Kapat' : 'İptal'}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-600 text-white transition hover:bg-rose-700"
        >
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
