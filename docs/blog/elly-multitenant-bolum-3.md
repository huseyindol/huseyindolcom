---
title: "Frontend'de Tenant Context — Provider'sız Yaklaşım"
date: 2026-06-16
series: "Elly Multi-Tenant Mimarisi"
seriesPart: 3
tags: ["multitenant", "nextjs", "react", "frontend", "saas"]
description: "Next.js'te multi-tenant frontend yazarken React Context API ile bir TenantProvider yazmak ilk içgüdü. Ama tenant bilgisi gibi cookie'de yaşayan bir veri için provider gerçekten gerekli mi?"
---

# Frontend'de Tenant Context — Provider'sız Yaklaşım

> **Bu yazı 3 bölümlük bir serinin üçüncü ve son bölümü.**
> **Bölüm 1:** [Tenant Routing'i Nereye Koyacağıma 3 Kez Karar Verdim](/blog/elly-multitenant-bolum-1)
> **Bölüm 2:** [Database-per-Tenant ve Connection Pool Patlaması](/blog/elly-multitenant-bolum-2)
> **Bölüm 3:** Frontend'de Tenant Context *(buradasınız)*

Önceki iki bölümde backend tarafını anlattım. [Bölüm 1'de](/blog/elly-multitenant-bolum-1) gelen HTTP isteğinden tenant ID'yi nasıl çıkardığımı, [Bölüm 2'de](/blog/elly-multitenant-bolum-2) o tenant ID ile doğru veritabanına nasıl bağlandığımı.

Ama Elly'nin Panel ve Tenant Website projeleri Next.js — yani backend'in tenant context'i frontend tarafında da bir şekilde temsil edilmeli. Component'ler "ben hangi tenant'tayım?" sorusunu sorabilmeli, API çağrıları doğru tenant'a gitmeli, SSR ve CSR aynı tenant'ı görmeli.

Bu bölümde frontend tarafındaki kararları anlatacağım. Özellikle ilk içgüdümü — React Context API ile bir `TenantProvider` yazmak — neden terk ettiğimi ve onun yerine ne kullandığımı.

## İlk İçgüdü: `TenantProvider` Yazmak

Frontend tarafına başlarken ilk düşündüğüm yapı klasik React Context örüntüsüydü:

```typescript
// Olmayan kod — yazmadım, ama düşündüm
const TenantContext = createContext<string | null>(null)

export function TenantProvider({ children, tenantId }) {
    return (
        <TenantContext.Provider value={tenantId}>
            {children}
        </TenantContext.Provider>
    )
}

export function useTenant() {
    return useContext(TenantContext)
}
```

Tanıdık bir desen. Backend'deki `TenantContext` ThreadLocal'ın frontend versiyonu gibi.

Sonra şunu fark ettim: bu yapıyı yazmak için bir provider'ın **tenant bilgisini bir yerden okuması** gerekiyor — büyük ihtimalle cookie'den. Yani:

1. Cookie'den tenant'ı oku
2. Provider'a aktar
3. `useTenant()` ile component'lere yay
4. Component'ler tenant'ı kullanır

Cookie zaten her component'in ulaşabileceği bir yer. Provider katmanı aslında **gereksiz bir indirection** yaratıyordu. Üstüne SSR ve CSR'ın provider'ı farklı şekillerde initialize etmesi gerekiyordu, bu da hydration mismatch riski demek.

Sade çözüme döndüm: **provider yok, helper fonksiyon var.**

## `getTenantId` + `buildApiUrl` Deseni

Tüm frontend mekanizması iki helper'a indirgendi:

```typescript
import { getGlobalCookies } from '@/context/CookieContext'
import { CookieEnum } from '@/utils/constant/cookieConstant'

/**
 * Tenant ID değerini döndürür.
 * SSR/ISR (getStaticProps / getServerSideProps): yalnızca env okunur.
 * CSR (Client): global cookie context'ten okur, yoksa NEXT_PUBLIC_DEFAULT_TENANT döndürür.
 */
export async function getTenantId(): Promise<string> {
    const defaultTenant = process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'default'

    // SSR/ISR: yalnızca env okunur (sayfaların statik/ISR kalmasını sağlar)
    if (globalThis.window === undefined) {
        return defaultTenant
    }

    // CSR: global cookie context'ten oku
    const cookieValues = getGlobalCookies()
    return cookieValues[CookieEnum.TENANT_ID] ?? defaultTenant
}

export async function buildApiUrl(path: string): Promise<string> {
    const baseUrl = process.env.NEXT_PUBLIC_API ?? ''
    const tenantId = await getTenantId()
    return `${baseUrl}/${tenantId}${path}`
}
```

İki fonksiyon aslında tek bir şey yapıyor: **tenant bilgisini doğru runtime için doğru kaynaktan oku, sonra API URL'ine göm.**

`getTenantId`'in dikkat çeken yanı `globalThis.window === undefined` kontrolü. Bu Next.js Pages Router'da server-side (`getStaticProps` / `getServerSideProps`) mı yoksa client-side mı çalıştığımızı anlamanın güvenilir yolu. Server tarafında doğrudan `defaultTenant` döndürüyoruz — böylece `getStaticProps` ve ISR önbelleklemesi bozulmuyor.

CSR tarafında ise `getGlobalCookies()` adında module-level bir singleton var. Bu singleton uygulama mount olduğunda cookie'leri okuyup tutuyor, sonraki her okuma O(1) erişim sağlıyor.

`buildApiUrl('/pages/home')` çağrısı şöyle bir sonuç üretiyor:

```
http://localhost:8080/api/v1/public/tenant1/pages/home
```

Yani public tenant site'tan gelen istekler `/api/v1/public/{tenantId}/...` formatına uyuyor. Backend tarafında `PublicApiFilter` bu prefix'i yakalayıp tenant'ı rewrite ediyor.

## Üç Senaryo, Tek Kural

Elly'nin tenant routing'i üç ayrı senaryoda farklı görünüyor ama altında tek bir prensip var:

| Senaryo | URL formatı | Tenant kaynağı |
|---------|-------------|----------------|
| Public tenant site (anonim ziyaretçi) | `/api/v1/public/{tid}/...` | URL path (PublicApiFilter) |
| Tenant kullanıcısı (kendi sitesinde) | `/api/v1/...` | JWT claim |
| Admin (cross-tenant) | `/api/v1/chat/tenant/{tid}/...` | URL path (JwtTenantFilter + loginSource=admin) |

Üç farklı yol, ama **tek bir kural**: kimlik kim olduğunu söyler (JWT veya anonim), URL veya cookie ise nereye gittiğini söyler. İkisi hiçbir zaman karışmaz.

Bu tabloyu kafanda canlı tut, çünkü Bölüm 1'deki "Kim?/Nereye?" dersinin frontend tarafındaki yansıması bu.

## Provider Olmaması Ne Kazandırdı

Provider yazmadığım için kazandığım üç şey var:

**1. Hydration mismatch riski yok.** Provider yazsaydım SSR'de cookie'den tenant okuyup provider'a inject etmem, CSR'de aynı şeyi yeniden yapmam gerekirdi. Bu iki initialization arasında bir tutarsızlık olursa React hydration mismatch fırlatıyor — özellikle tenant bilgisi DOM'a yansıyan bir şeyse (örn. tenant logosu). Helper fonksiyon yaklaşımında cookie zaten request başında sabitlenmiş, SSR ve CSR ikisi de aynı değeri görüyor.

**2. React dışı dosyalar da tenant'a erişebiliyor.** `fetcher.ts`, `chat-config.ts` gibi component olmayan dosyalar `useTenant()` hook'unu çağıramaz — hook'lar sadece component içinde çalışır. Helper fonksiyon her yerden çağrılabiliyor. Bu sayede API katmanım React'tan bağımsız kalıyor.

**3. Daha az boilerplate.** Provider component'i yazmak, layout'ta wrap etmek, hook tanımlamak, bunların hepsi en az 30-40 satır. Helper fonksiyon 20 satır. Daha az kod, daha az bakım yükü.

Şunu net söyleyeyim: Provider deseni *yanlış* değil. Sadece bu problem için aşırı katman. Eğer tenant bilgisi sık değişen, yan etkileri olan, birden fazla yerden subscribe edilmesi gereken bir veri olsaydı provider mantıklı olurdu. Ama Elly'de tenant bilgisi oturum boyunca değişmiyor ve cookie'de zaten kalıcı.

## Bir İstisna: WebSocket Sync Problemi

Bu yaklaşımın hayatta her zaman çalışmadığı bir yer var. Chat widget'ının WebSocket bağlantısını **modül yüklenirken senkron** kurması gerekiyor. Ama `getTenantId()` async — çünkü SSR'de `cookies()` Promise döndürüyor.

Modül-level kodda `await` kullanamıyorum (TLA olmadan), Promise'i de bekleyemem. Sonuçta `chat-config.ts` içinde ayrı bir senkron tanım koymak zorunda kaldım:

```typescript
const CHAT_TENANT_ID = process.env.NEXT_PUBLIC_DEFAULT_TENANT ?? 'tenant1'
```

Yani **aynı bilgi (tenant ID) iki farklı yoldan okunuyor**: bir async cookie-aware yol (`getTenantId`), bir senkron env-only yol (`CHAT_TENANT_ID`).

Tenant Website tek-tenant olduğu için bu sorun değil — her deployment bir tenant'a hizmet ediyor, env var ile gelen değer cookie ile gelen değerle aynı oluyor. Ama bu, multitenant sistemin "her durumda her yerden okunabilir" güzelliğinin bir istisnası.

Bu küçük tutarsızlık bana şunu öğretti: **Cross-cutting bir veriyi (tenant gibi) tasarlarken farklı runtime'ların farklı kısıtları olabileceğini hesaba kat.** SSR farklı, CSR farklı, modül init farklı, WebSocket bağlantı kurma farklı. Tek bir API her yere uymayabilir; bunu önceden bilirsen tasarımını ona göre yaparsın.

---

## Üç Bölümün Sentezi

Bu seride üç katmanda aynı kararı verdiğimi fark ettim. Multi-tenant Elly'nin her katmanında "kim?" ve "nereye?" sorularını ayrı yerlerde tuttum:

| Katman | "Kim?" | "Nereye?" |
|--------|--------|-----------|
| **Backend filter** | JWT'deki kullanıcı + loginSource | URL path veya JWT'deki tenantId claim |
| **Database** | (kimlik DB'ye dokunmuyor) | `TenantContext` → `AbstractRoutingDataSource` |
| **Frontend** | Cookie'deki authToken | Cookie'deki tenantId + `buildApiUrl` |

Üç katman, aynı prensibi farklı tonlarda söylüyor:

> **Kimlik bilgisi ve scope bilgisi birbirine karışmamalı.**

Bu prensibi ilk gün bilseydim çok zaman kazanırdım. Ama büyük ihtimalle de gerçekten **anlamazdım** — çünkü prensibin değerini görmek için iki kez duvara çarpmam gerekti. Mimarinin böyle bir yanı var: bazı dersleri okumak değil, yaşamak gerekiyor.

Elly hâlâ canlıda, hâlâ büyüyor. Mimari kararlar zaman içinde test ediliyor, bazıları kırılabilir. Ama bu üç bölümde anlattığım "kim?/nereye?" ayrımı şu ana kadar her testten geçti — ve yeni feature'lar geldikçe işimi kolaylaştırmaya devam ediyor.

---

## Bu Seri Burada Bitiyor, Ama Yazılar Devam Ediyor

Elly üzerinde önümüzdeki haftalarda yazmayı düşündüğüm konular var:

- **WebSocket/STOMP ile real-time chat mimarisi** — Tenant chat ile admin chat'in nasıl ayrıldığı, presence yönetimi, typing indicators
- **Form-to-email pipeline** — Form gönderiminin Next.js'ten Spring Boot'a, oradan RabbitMQ'ya ve mail sender'a uzanan yolculuğu
- **K3s üzerinde Elly'nin deployment stratejisi** — Manifest yapısı, secret yönetimi, multi-tenant DB'lerin StatefulSet ile ayağa kalkması

Eğer bu seriyi faydalı bulduysanız, sıradaki yazılar için [huseyindol.com/blog](https://huseyindol.com/blog) sayfasını arada kontrol edebilirsiniz.

---

*Elly hakkında daha fazla yazı için: [huseyindol.com/blog](https://huseyindol.com/blog)*
