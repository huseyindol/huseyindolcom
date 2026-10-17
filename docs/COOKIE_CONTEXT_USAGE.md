# Cookie Context Kullanım Kılavuzu

## Genel Bakış

Bu proje, Next.js Pages Router mimarisinde client-side (non-`httpOnly`) cookie'leri (`USERNAME`, `USER_CODE`, `EXPIRES_AT` vb.) React bileşenlerinde reaktif ve hydration-safe olarak okumak için `CookieContext` (`src/context/CookieContext.tsx`) ve `useSyncExternalStore` tabanlı `Providers` (`src/providers/Providers.tsx`) yapısını kullanır. Hassas oturum token'ları (`ACCESS_TOKEN`, `REFRESH_TOKEN`) ise `httpOnly` olarak yalnızca `src/pages/api/auth/*` BFF route'larında (`src/lib/api-cookies.ts` üzerinden) işlenir.

## Nasıl Çalışır?

### 1. Root App (`src/pages/_app.tsx`)

`_app.tsx`, tüm uygulamayı `Providers` ile sarar ve SSR anında boş `cookiesData={{}}` snapshot'ı geçirir (böylece statik/ISR sayfalar request-time cookie okumasına zorlanmaz):

```tsx
import Providers from '@/providers/Providers'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers cookiesData={{}}>
      <Component {...pageProps} />
    </Providers>
  )
}
```

### 2. Provider (`src/providers/Providers.tsx`)

`Providers.tsx`, `useSyncExternalStore` kullanarak sunucuda `cookiesData`, tarayıcıda ise `document.cookie` snapshot'ını hydration mismatch olmadan okur:

```tsx
import { useSyncExternalStore } from 'react'
import CookieContext, { initGlobalCookieStore } from '../context/CookieContext'

export default function Providers({
  children,
  cookiesData,
}: Readonly<{
  children: React.ReactNode
  cookiesData: Record<string, string>
}>) {
  const baseCookies = useSyncExternalStore(
    subscribeToCookies,
    parseDocumentCookies,
    () => cookiesData,
  )
  // ...
  return (
    <CookieContext.Provider value={{ cookies, updateCookie }}>
      {children}
    </CookieContext.Provider>
  )
}
```

### 3. Context (`src/context/CookieContext.tsx`)

Context tanımı, custom hook ve global yardımcılar:

```tsx
import { createContext, useContext } from 'react'

export interface CookieContextType {
  cookies: Record<string, string>
  updateCookie: (name: string, value: string) => void
}

const CookieContext = createContext<CookieContextType | undefined>(undefined)

export const useCookie = () => {
  const context = useContext(CookieContext)
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider')
  }
  return context
}

export default CookieContext
```

## Kullanım Örnekleri

### Bileşende Cookie Okuma

```tsx
import { useCookie } from '@/context/CookieContext'
import { CookieEnum } from '@/utils/constant/cookieConstant'

export default function UserBadge() {
  const { cookies } = useCookie()

  const username = cookies[CookieEnum.USERNAME]
  const userCode = cookies[CookieEnum.USER_CODE]

  if (!username) return null

  return (
    <div>
      <span>Kullanıcı: {username}</span>
      <span>Kod: {userCode}</span>
    </div>
  )
}
```

### Sunucu Tarafında (`pages/api/*`) `httpOnly` Cookie Yazma / Silme

Pages Router BFF route'larında (`src/pages/api/auth/*`) cookie işlemleri `src/lib/api-cookies.ts` içindeki `resCookieStore(res)` adaptörü ile yapılır:

```typescript
// src/pages/api/auth/login.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { resCookieStore } from '@/lib/api-cookies'
import { setAuthCookies } from '@/services/auth/cookies'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const cookieStore = resCookieStore(res)
  setAuthCookies(cookieStore, authData)
  return res.status(200).json({ result: true })
}
```

### Logout Anında In-Memory Cookie Temizliği

Çıkış yapıldığında `router.replace` / `reload` tamamlanana kadar UI flash'ını önlemek için `removeGlobalCookie` kullanılır:

```tsx
import { removeGlobalCookie } from '@/context/CookieContext'
import { CookieEnum } from '@/utils/constant/cookieConstant'

removeGlobalCookie(CookieEnum.USERNAME)
removeGlobalCookie(CookieEnum.USER_CODE)
```
