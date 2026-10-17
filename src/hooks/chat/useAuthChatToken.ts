import { refreshSession } from '@/actions/auth/refreshSession'
import { useCallback, useEffect, useState } from 'react'

async function fetchChatToken(): Promise<string | null> {
  try {
    const res = await fetch('/api/chat/token', { cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as { token: string | null }
    return data.token ?? null
  } catch {
    return null
  }
}

/**
 * Login'li tenant kullanıcısı için chat WS token'ı = kullanıcının kendi accessToken'ı,
 * same-origin BFF route'tan (/api/chat/token) alınır. Böylece chat guest yerine
 * GERÇEK kimlikle bağlanır. httpOnly token cookie olarak JS'e açılmaz; yalnız WS
 * CONNECT için bellekte tutulur.
 */
export function useAuthChatToken(enabled: boolean) {
  // enabled=false (anonim) → token null, loading false (başlangıç state'i zaten doğru).
  const [token, setToken] = useState<string | null>(null)
  const [loading, setLoading] = useState(enabled)

  useEffect(() => {
    if (!enabled) return
    let alive = true
    fetchChatToken().then(t => {
      if (!alive) return
      setToken(t)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [enabled])

  // WS auth süresi dolunca: session'ı tazele (httpOnly refreshToken ile), yeni token al.
  const refresh = useCallback(async () => {
    await refreshSession().catch(() => {})
    const t = await fetchChatToken()
    setToken(t)
  }, [])

  return { token, loading, refresh }
}
