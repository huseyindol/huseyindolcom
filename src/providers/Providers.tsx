import { CookieEnum } from '@/utils/constant/cookieConstant'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react'
import CookieContext, { initGlobalCookieStore } from '../context/CookieContext'
import { ThemeProvider } from './ThemeProvider'

const SS_GUEST_NAME = 'elly_guest_name'

// Stable no-op: document.cookie has no change event to subscribe to.
const subscribeToCookies = () => () => {}

// useSyncExternalStore getSnapshot'ı AYNI referansı döndürmeli; aksi halde React
// "store değişti" sanıp sonsuz render döngüsüne girer (Maximum update depth → kritik hata).
// Bu yüzden document.cookie string'i değişmedikçe önceki parse sonucunu döndürürüz.
let cachedCookieString: string | null = null
let cachedCookies: Record<string, string> = {}

function parseDocumentCookies(): Record<string, string> {
  if (typeof document === 'undefined') return cachedCookies
  if (document.cookie === cachedCookieString) return cachedCookies
  cachedCookieString = document.cookie
  cachedCookies = Object.fromEntries(
    document.cookie
      .split('; ')
      .filter(Boolean)
      .map(pair => {
        const idx = pair.indexOf('=')
        return [pair.slice(0, idx), decodeURIComponent(pair.slice(idx + 1))]
      }),
  )
  return cachedCookies
}

export default function Providers({
  children,
  cookiesData,
}: Readonly<{
  children: React.ReactNode
  cookiesData: Record<string, string>
}>) {
  // useSyncExternalStore avoids useEffect+setState (would trigger ESLint set-state-in-effect).
  // Server snapshot = cookiesData (empty {}, root layout no longer calls cookies()).
  // Client snapshot = live document.cookie (non-httpOnly cookies only).
  // React handles the SSR→client transition without hydration mismatch.
  const baseCookies = useSyncExternalStore(
    subscribeToCookies,
    parseDocumentCookies,
    () => cookiesData,
  )

  // overrides: in-memory mutations from updateCookie — bugün yalnızca logout'ta
  // removeGlobalCookie ile cookie'leri anında boşaltmak için (router.refresh
  // document.cookie'yi yeniden okuyana kadarki UI flash'ını önler).
  const [overrides, setOverrides] = useState<Record<string, string>>({})
  const [queryClient] = useState(() => new QueryClient())

  const updateCookie = useCallback((name: string, value: string) => {
    setOverrides(prev => ({ ...prev, [name]: value }))
  }, [])

  const cookies = useMemo(
    () => ({ ...baseCookies, ...overrides }),
    [baseCookies, overrides],
  )

  // Chat guest token refresh için login adını sessionStorage'a yaz
  useEffect(() => {
    const username = cookies[CookieEnum.USERNAME]?.trim()
    if (!username) return
    if (sessionStorage.getItem(SS_GUEST_NAME) !== username) {
      sessionStorage.setItem(SS_GUEST_NAME, username)
    }
  }, [cookies])

  // Senkron init: child effect'ler çalışmadan önce globalCookieStore hazır olsun
  // (React'te useEffect child→parent sırası ile çalışır; TanStack Query fetch'leri
  // Providers'ın useEffect'inden önce tetiklenebilir)
  initGlobalCookieStore({ cookies, updateCookie })

  // cookies değiştiğinde singleton'ı güncelle
  useEffect(() => {
    initGlobalCookieStore({ cookies, updateCookie })
  }, [cookies, updateCookie])

  const contextValue = useMemo(
    () => ({ cookies, updateCookie }),
    [cookies, updateCookie],
  )

  return (
    <CookieContext.Provider value={contextValue}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </QueryClientProvider>
    </CookieContext.Provider>
  )
}
