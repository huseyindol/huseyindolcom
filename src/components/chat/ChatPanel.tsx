import { useCookie } from '@/context/CookieContext'
import { useAuthChatToken } from '@/hooks/chat/useAuthChatToken'
import { useGuestToken } from '@/hooks/chat/useGuestToken'
import { useTenantCall } from '@/hooks/chat/useTenantCall'
import { ChatGroup } from '@/types/chat'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import { ArrowLeft, Loader2, LogOut, Video, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { CallView } from './CallView'
import { ChatView } from './ChatView'
import { GroupList } from './GroupList'
import { GuestNameGate } from './GuestNameGate'

// Guest token bitmeden bu kadar önce sessizce yenile
const REFRESH_LEAD_MS = 30_000

export function ChatPanel({ onClose }: { onClose: () => void }) {
  const { cookies } = useCookie()
  const loginUsername = cookies[CookieEnum.USERNAME] || null
  const isAuth = !!loginUsername

  // Login'li → kendi JWT'siyle (BFF /api/chat/token) GERÇEK kimlikle bağlanır.
  // Anonim → guest-token akışı (ad-girme ekranı).
  const { token: authToken, refresh: authRefresh } = useAuthChatToken(isAuth)
  const {
    token: guestToken,
    displayName: guestDisplayName,
    sessionId: guestSessionId,
    expiresAt: guestExpiresAt,
    start: guestStart,
    refresh: guestRefresh,
    reset: guestReset,
    loading: guestLoading,
    error: guestError,
  } = useGuestToken()

  const [group, setGroup] = useState<ChatGroup | null>(null)

  // Guest token süresi dolmadan sessizce yenile (yalnız anonim akış)
  useEffect(() => {
    if (isAuth) return
    if (!guestToken || !guestExpiresAt) return
    const delay = guestExpiresAt - Date.now() - REFRESH_LEAD_MS
    if (delay <= 0) {
      void guestRefresh()
      return
    }
    const t = setTimeout(() => void guestRefresh(), delay)
    return () => clearTimeout(t)
  }, [isAuth, guestToken, guestExpiresAt, guestRefresh])

  // WS auth hatası (token reddedildi/expired) → yeni token al
  const handleAuthExpired = useCallback(() => {
    if (isAuth) void authRefresh()
    else void guestRefresh()
  }, [isAuth, authRefresh, guestRefresh])

  // Aktif kimlik — login'li ise gerçek kimlik, değilse guest
  const token = isAuth ? authToken : guestToken
  const displayName = isAuth ? loginUsername : guestDisplayName
  const mySessionId = isAuth ? null : guestSessionId
  const myUsername = isAuth ? loginUsername : null

  // Görüntülü destek — yalnız login'li TENANT kullanıcısı (auth token'ı olan). Ring-all: tüm
  // online panel kullanıcılarına gider, ilk cevaplayan görüşür. Anonim guest'te buton yok.
  const call = useTenantCall(authToken ?? '', isAuth)

  // Sohbetteyken geri = grup listesine dön; değilse paneli kapat
  const handleBack = group ? () => setGroup(null) : onClose
  const title = group ? group.name || 'Destek' : 'Destek'

  return (
    <div className="relative flex h-full flex-col">
      <header className="flex items-center justify-between border-b border-border px-3 py-3">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={handleBack}
            title={group ? 'Geri' : 'Kapat'}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            {group ? (
              <ArrowLeft className="h-5 w-5" />
            ) : (
              <X className="h-5 w-5" />
            )}
          </button>
          <div className="flex min-w-0 flex-col">
            <span className="truncate font-semibold">{title}</span>
            {displayName && (
              <span className="truncate text-xs text-muted-foreground">
                {displayName}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Görüntülü destek — yalnız login'li tenant kullanıcısı, çağrı yokken */}
          {isAuth && authToken && call.phase === 'idle' && (
            <button
              onClick={call.startCall}
              title="Görüntülü destek"
              className="flex h-8 w-8 items-center justify-center rounded-md text-emerald-600 transition-colors hover:bg-emerald-500/10"
            >
              <Video className="h-5 w-5" />
            </button>
          )}
          {/* Reset yalnızca anonim guest için — login'liyken kimlik oturuma bağlı */}
          {!isAuth && guestToken && (
            <button
              onClick={() => {
                setGroup(null)
                guestReset()
              }}
              title="Sohbeti sıfırla"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
          <button
            onClick={onClose}
            title="Kapat"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-hidden">
        {!token ? (
          isAuth ? (
            // Login'li: ad girme yok, token BFF'ten otomatik alınıyor
            <div className="flex h-full items-center justify-center p-4">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <GuestNameGate
              onSubmit={guestStart}
              loading={guestLoading}
              error={guestError}
            />
          )
        ) : !group ? (
          <GroupList onSelect={setGroup} />
        ) : (
          <ChatView
            token={token}
            mySessionId={mySessionId}
            myUsername={myUsername}
            group={group}
            onAuthExpired={handleAuthExpired}
          />
        )}
      </div>
      {/* Görüntülü destek görüşmesi — panel üstüne biner */}
      <CallView
        phase={call.phase}
        peerName={call.peerName}
        micOn={call.micOn}
        camOn={call.camOn}
        localStream={call.localStream}
        remoteStream={call.remoteStream}
        onHangup={call.hangup}
        onToggleMic={call.toggleMic}
        onToggleCam={call.toggleCam}
      />
    </div>
  )
}
