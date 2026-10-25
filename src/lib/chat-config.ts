/**
 * Elly tenant chat (anonim GUEST akışı) konfigürasyonu.
 *
 * NEXT_PUBLIC_* değerleri client bundle'a build-time inline edilir; bu yüzden
 * burada doğrudan `process.env` okunur (env.ts validasyon objesi server tarafıdır).
 *
 * Gerekli .env değişkenleri:
 *   NEXT_PUBLIC_ELLY_API_URL=https://api.huseyindol.com   (WebSocket host)
 *   NEXT_PUBLIC_DEFAULT_TENANT=tenant1                    (WS topic tenant'ı)
 *
 * Grup id'si runtime'da listelenir (GET /tenant-chat/groups) — sabit env gerekmez.
 */

/**
 * WS host: SockJS endpoint'i API KÖKÜNDEDIR (`/ws`) — REST prefix'i (`/api/v1/public`)
 * DAHIL OLMAMALI. Env yanlışlıkla REST base'iyle (`.../api/v1/public`) set edilse bile
 * burada origin'e (scheme+host) indirgenir. Aksi halde SockJS `/api/v1/public/ws/info`'ya
 * gider; PublicApiFilter bunu `{tenantId}=ws` sanıp "Unknown tenant: ws" (400) döner →
 * WS bağlanamaz → chat input pasif kalır.
 */
function deriveApiOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_ELLY_API_URL ??
    process.env.NEXT_PUBLIC_API ??
    'https://api.huseyindol.com'
  try {
    return new URL(raw).origin
  } catch {
    return raw.replace(/\/api\/.*$/, '').replace(/\/+$/, '')
  }
}

export const ELLY_API_URL = deriveApiOrigin()

export const CHAT_TENANT_ID =
  process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'tenant1'

/**
 * WebRTC ICE sunucuları. NEXT_PUBLIC_ICE_SERVERS (JSON) veya NEXT_PUBLIC_TURN_*
 * build-time inline edilir; yoksa public STUN.
 */
export const ICE_SERVERS: RTCIceServer[] = (() => {
  const raw = process.env.NEXT_PUBLIC_ICE_SERVERS
  if (raw) {
    try {
      return JSON.parse(raw) as RTCIceServer[]
    } catch {
      // düşer → default
    }
  }
  const servers: RTCIceServer[] = [{ urls: 'stun:stun.l.google.com:19302' }]
  const turnUrl = process.env.NEXT_PUBLIC_TURN_URL
  if (turnUrl) {
    servers.push({
      urls: turnUrl
        .split(',')
        .map(u => u.trim())
        .filter(Boolean),
      username: process.env.NEXT_PUBLIC_TURN_USERNAME || undefined,
      credential: process.env.NEXT_PUBLIC_TURN_CREDENTIAL || undefined,
    })
  }
  return servers
})()
