import { publicChatApi } from '@/services/chat/publicChatApi'
import { GuestTokenResponse } from '@/types/chat'
import { useCallback, useState } from 'react'

const SS_TOKEN = 'elly_guest_token'
const SS_NAME = 'elly_guest_name'
const SS_SID = 'elly_guest_session_id'
const SS_EXP = 'elly_guest_exp' // token son geçerlilik anı (epoch ms)
const LS_GUEST_ID = 'elly_guest_id' // cihaz bazlı KALICI kimlik (localStorage)

function uuidV4Fallback(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/** Cihaz bazlı kalıcı guest kimliği: localStorage'da bir kez üretilir, kalır (geçerli UUID). */
function getOrCreateGuestClientId(): string {
  if (typeof window === 'undefined') return ''
  let id = localStorage.getItem(LS_GUEST_ID)
  if (!id) {
    id =
      typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
        ? crypto.randomUUID()
        : uuidV4Fallback()
    localStorage.setItem(LS_GUEST_ID, id)
  }
  return id
}

const readSession = (k: string): string | null =>
  typeof window !== 'undefined' ? sessionStorage.getItem(k) : null

/**
 * Chat guest kimliğini tamamen temizler (logout'ta çağrılır):
 * aktif oturum (sessionStorage) + cihaz bazlı kalıcı kimlik (localStorage).
 * Hook değil — event handler'larda doğrudan çağrılabilir.
 */
export function clearGuestStorage(): void {
  if (typeof window === 'undefined') return
  sessionStorage.removeItem(SS_TOKEN)
  sessionStorage.removeItem(SS_NAME)
  sessionStorage.removeItem(SS_SID)
  sessionStorage.removeItem(SS_EXP)
  localStorage.removeItem(LS_GUEST_ID)
}

export function useGuestToken() {
  const [token, setToken] = useState<string | null>(() => readSession(SS_TOKEN))
  const [displayName, setDisplayName] = useState<string | null>(() =>
    readSession(SS_NAME),
  )
  // "Kendi mesajım" eşleşmesi için kimlik. Aktif oturumda sessionStorage'dan,
  // yoksa kalıcı localStorage kimliğinden başlar.
  const [sessionId, setSessionId] = useState<string | null>(
    () =>
      readSession(SS_SID) ??
      (typeof window !== 'undefined'
        ? localStorage.getItem(LS_GUEST_ID)
        : null),
  )
  const [expiresAt, setExpiresAt] = useState<number | null>(() => {
    const v = readSession(SS_EXP)
    return v ? Number(v) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const start = useCallback(
    async (name: string): Promise<GuestTokenResponse> => {
      setLoading(true)
      setError(null)
      try {
        const clientId = getOrCreateGuestClientId()
        const res = await publicChatApi.guestToken(name.trim(), clientId)
        const expAt = Date.now() + res.expiresIn * 1000
        sessionStorage.setItem(SS_TOKEN, res.token)
        sessionStorage.setItem(SS_NAME, res.displayName)
        sessionStorage.setItem(SS_SID, res.sessionId)
        sessionStorage.setItem(SS_EXP, String(expAt))
        // localStorage'ı backend'in yetkili sessionId'sine senkronla → gelecek ziyaretlerde aynı kimlik
        localStorage.setItem(LS_GUEST_ID, res.sessionId)
        setToken(res.token)
        setDisplayName(res.displayName)
        setSessionId(res.sessionId)
        setExpiresAt(expAt)
        return res
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Bağlanılamadı')
        throw e
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  /**
   * Mevcut görünen ad + aynı clientId ile yeni token alır (sessionId korunur).
   * Token süresi dolduğunda sessizce yenilemek için kullanılır.
   */
  const refresh = useCallback(async (): Promise<boolean> => {
    const name = readSession(SS_NAME)
    if (!name) return false
    try {
      await start(name)
      return true
    } catch {
      return false
    }
  }, [start])

  const reset = useCallback(() => {
    // Aktif oturumu temizle; cihaz kimliğini (LS_GUEST_ID) KORU → tekrar girince aynı kimlik,
    // eski mesajlar yine "kendi" olarak eşleşir.
    sessionStorage.removeItem(SS_TOKEN)
    sessionStorage.removeItem(SS_NAME)
    sessionStorage.removeItem(SS_SID)
    sessionStorage.removeItem(SS_EXP)
    setToken(null)
    setDisplayName(null)
    setExpiresAt(null)
  }, [])

  return {
    token,
    displayName,
    sessionId,
    expiresAt,
    loading,
    error,
    start,
    refresh,
    reset,
  }
}
