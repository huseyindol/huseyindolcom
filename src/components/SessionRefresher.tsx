import { refreshSession } from '@/actions/auth/refreshSession'
import { useCookie } from '@/context/CookieContext'
import { CookieEnum } from '@/utils/constant/cookieConstant'

import { useEffect, useRef } from 'react'

// Token bitmeden bu kadar önce sessizce yenile (saat kayması için tampon)
const LEAD_MS = 30_000

/**
 * Login'li kullanıcının access token'ı süresi dolmadan (expiredDate) önce
 * sessizce yeniler. expiredDate cookie'si client'tan okunabilir; süresi geçmişse
 * hemen, değilse zamanında refreshSession() çağrılır. Başarılıysa sayfa tazelenir
 * ile yeni cookie'ler context'e yansır ve sonraki süre yeniden zamanlanır.
 */
export function SessionRefresher() {
  const { cookies } = useCookie()
  // accessToken httpOnly olduğu için client'tan okunamaz; login durumunu
  // client-readable username cookie'si ile, zamanlamayı expiredDate ile çözeriz.
  // Asıl yenileme refreshSession() server action'ında httpOnly refreshToken ile yapılır.
  const isLoggedIn = !!cookies[CookieEnum.USERNAME]
  const expiredRaw = cookies[CookieEnum.EXPIRED_DATE]
  const expiredDate = expiredRaw ? Number(expiredRaw) : null
  // Aynı expiredDate için tek sefer tetikle (loop önleme)
  const handledRef = useRef<number | null>(null)

  useEffect(() => {
    if (!isLoggedIn || !expiredDate || Number.isNaN(expiredDate)) return
    if (handledRef.current === expiredDate) return

    const run = async () => {
      handledRef.current = expiredDate
      await refreshSession()
      // Başarı: yeni cookie'ler → context güncellenir, yeni süre zamanlanır.
      // Başarısızlık: cookie'ler server'da temizlendi → isLoggedIn=false olur.
      // Router'dan bağımsız tazeleme: yeni cookie'ler okunsun. (router.refresh()
      // App Router'a özgü; bu bileşen iki router'ın da kökünde render ediliyor.)
      window.location.reload()
    }

    const delay = expiredDate - Date.now() - LEAD_MS
    if (delay <= 0) {
      void run()
      return
    }
    const t = setTimeout(() => void run(), delay)
    return () => clearTimeout(t)
  }, [isLoggedIn, expiredDate])

  return null
}
