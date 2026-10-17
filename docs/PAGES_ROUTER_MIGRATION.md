# App Router → Pages Router Taşıma Takibi

**Amaç:** Tavan RPS'i yükseltmek. Karar: tam geçiş (App Router kaldırılacak).

**Strateji:** İki router Next.js'te yan yana çalışabildiği için taşıma **rota rota** yapılır;
her adımda App Router karşılığı aynı commit'te silinir → build her zaman yeşil, site hep ayakta.

**RPS ilkesi:** Varsayılan `getStaticProps` + ISR. `getServerSideProps` yalnız gerçekten
kişiye özel/istek-anına bağlı sayfalarda. (Ölçümde ~33 rps tavan + p95 10sn kuyruklanma
görülmüştü; en büyük kazanç sayfayı istek başına render etmemekten gelir.)

## Faz Durumu

| Faz | Kapsam                                                                         | Durum |
| --- | ------------------------------------------------------------------------------ | ----- |
| 1   | İskelet: `_app`, `_document`, `SiteLayout`, `Seo`, fonts, globals.css taşındı  | ✅    |
| 2   | Statik içerik sayfaları (`/`, `/about`, `/skills`, `/experience`, `/projects`) | ✅    |
| 3   | Blog + MDX (`/blog`, `/blog/[slug]`) + `/makaleler`                            | ✅    |
| 4   | Auth/BFF: server action'lar → `pages/api` + cookie adaptörü                    | ✅    |
| 5   | Dinamik: `/[pages]`, `/projects/[slug]`, `/forms/[id]`, `/arcade`              | ✅    |
| 6   | Özel dosyalar: `robots`, `sitemap`, `manifest`, `404`, `500`                   | ✅    |
| 7   | Chat / WebRTC / sosyal giriş route'ları                                        | ✅    |
| 8   | `src/app` tamamen kaldırılır + kural/dokümantasyon doğrulaması                 | ✅    |

## Taşıma Karşılıkları

| App Router                                   | Pages Router                                                                         |
| -------------------------------------------- | ------------------------------------------------------------------------------------ |
| `layout.tsx` (root)                          | `_document.tsx` (html/head/body) + `_app.tsx` (provider'lar)                         |
| `(site)/layout.tsx`                          | `components/SiteLayout.tsx` (`_app` sarar, `getLayout` ile devre dışı bırakılabilir) |
| `export const metadata` / `generateMetadata` | `<Seo />` (`src/lib/seo.tsx`, next/head + key dedup)                                 |
| async Server Component'te veri çekme         | `getStaticProps` (+ `revalidate`)                                                    |
| `generateStaticParams`                       | `getStaticPaths`                                                                     |
| `export const revalidate = N`                | `getStaticProps → revalidate: N`                                                     |
| `app/api/*/route.ts`                         | `pages/api/*.ts` (`req`/`res`)                                                       |
| Server Action (`'use server'`)               | `pages/api/*` + client `fetch` (BFF aynen korunur)                                   |
| `not-found.tsx`                              | `404.tsx`                                                                            |
| `error.tsx` / `global-error.tsx`             | `_error.tsx` / `500.tsx`                                                             |

## Yol Boyunca Çıkan Tuzaklar

1. **`useSearchParams()` / `usePathname()` artık `| null`.** `pages/` var olunca tipleri
   nullable oluyor. Tüm kullanımlar null-safe hale getirildi (`?? ''`, `?.get()`).
2. **`experimental.optimizeCss` (critters) Pages Router'ı kırıyor** — `/404` ve `/500`
   prerender'ında `document.documentElement.setAttribute is not a function`. critters
   deprecated; `optimizeCss: false` yapıldı. Kritik CSS inline'i istenirse halefi
   `beasties` ile yeniden değerlendirilecek. **(Kullanıcı onayı bekleyen tek ödün.)**
3. **`SkillType` üç yerde kopyalanmıştı** — kanonik zod tanımında (`schemas/dynamic`)
   tekilleştirildi.
4. `next/font` `_app`'te yüklenip CSS değişkenleri `:root`'a enjekte ediliyor
   (globals.css'teki `body { @apply font-sans }` bunu okuyor).

## Faz 2 Notları

- **Veri yükleyicileri ayrıştırıldı:** async server component'ler (`Skills`, `Experience`)
  `src/lib/section-data.ts` içindeki `loadSkillsSection()` / `loadExperienceSection()`
  fonksiyonlarına dönüştü. Sayfalar bunları `getStaticProps`'tan çağırıyor.
- **`APage` şablonu sync + props'lu oldu** — bölüm verisini artık kendi içinde çekmiyor,
  props olarak alıyor (`PageTemplateProps`). CMS şablon seçimi (`dynamic()` + module cache)
  aynen korundu.
- Taşınan 8 rotanın tamamı **statik (○) veya SSG+ISR (●)** — istek başına render eden
  sayfa yok.

## Faz 3 Notları

- **MDX derlemesi build zamanına alındı.** App Router `next-mdx-remote/rsc` ile render
  anında derliyordu; Pages Router'da `getStaticProps` içinde `serializeMdx()` (yeni:
  `src/lib/mdx-serialize.ts`) derler, `MdxContent` yalnız hazır çıktıyı render eder.
- **Liste sayfasından MDX gövdeleri ayıklandı.** Pages Router'da getStaticProps çıktısı
  `__NEXT_DATA__` ile HTML'e gömülür; 27 makalenin tam metnini göndermek sayfayı
  yüzlerce KB şişirirdi. `/blog` yalnız `slug` + `frontmatter` alıyor.
- **Detay sayfasında da `content` props'tan çıkarıldı** (derlenmiş hali `mdxSource`'ta
  zaten var); `wordCount` sunucuda hesaplanıp prop olarak geçiyor.
- **Bilinen ödün:** uzun makalelerde `mdxSource` props'u 128 kB eşiğini aşıyor (Next
  uyarısı). Sebep yapısal: RSC'de derlenmiş MDX sunucuda kalırken Pages Router'da
  hidrasyon için istemciye gitmek zorunda. **Sunucu RPS'ini etkilemez** (statik dosya
  servisi), okuyucunun indirme boyutunu etkiler. Taşıma sonrası seçenek: MDX'i build'de
  HTML'e render edip `HtmlContent` gibi basmak (etkileşimli MDX bileşeni yoksa mümkün).

## Doğrulama Notu (ÖNEMLİ)

Claude içi tarayıcı Pages Router sayfalarını **hidrate etmiyor** → istemci etkileşimi
orada test edilirse yanlış biçimde "hidrasyon kırık" görünür. Sunucu çıktısı (HTML, meta,
route tablosu) orada doğrulanır; tıklama/state testi kullanıcının kendi tarayıcısında
yapılır. (Tem 2026'da kullanıcı doğruladı: tema düğmesi + kategori filtresi çalışıyor.)

## Faz 3b Notu — dinamik → statik kazanımı

`/makaleler` App Router'da `searchParams.category`'yi SUNUCUDA okuduğu için **dinamikti (ƒ)**.
Kategori filtresi `MakalelerContent` içine (client state + `router.replace`) alınarak sayfa
**SSG'ye (●)** çevrildi — blog'da zaten uygulanan desen. Bu, taşımanın RPS hedefine doğrudan
katkısı olan ilk yapısal kazanç: sayfa artık istek başına render edilmiyor.

`/makaleler/[slug]` için `fallback: 'blocking'` seçildi (CMS'e yeni makale eklendiğinde
build gerekmeden ilk istekte üretilsin); blog MDX'inde ise `fallback: false` (dosyalar
repo'da, yeni makale zaten deploy ile gelir).

## Router Bağımlılığı — Taşımanın En Sinsi Tuzağı

`next/navigation`'ın **`useRouter`**'ı Pages Router'da mount DEĞİLDİR; çağrısı event
handler içinde patlar ve React aynı handler'daki `setState`'i de düşürür → "tıklama
hiçbir şey yapmıyor, hata da yok". Ayrım önemli:

| API                                                  | App Router                      | Pages Router  |
| ---------------------------------------------------- | ------------------------------- | ------------- |
| `useRouter` (`next/navigation`)                      | ✅                              | ❌ patlar     |
| `useRouter` (`next/router`)                          | ❌ "NextRouter was not mounted" | ✅            |
| `usePathname`, `useSearchParams` (`next/navigation`) | ✅                              | ✅ (nullable) |

**Uygulanan kural:** iki router'da da render edilen ortak bileşenler (`Header`,
`Datalayer`, `SessionRefresher`, `SocialLoginButtons`) router'a HİÇ bağlanmaz —
`usePathname` veya doğrudan `window.location` kullanır. Yalnız Pages Router'a ait
bileşenler `next/router` kullanabilir.

Filtre bileşenlerinde router tamamen kaldırıldı: URL senkronu `history.replaceState`
(try/catch'li) ile yapılıyor, böylece URL güncellenemese bile filtre çalışır.

## Statik Sayfada Query Parametresi

App Router `searchParams`'ı SUNUCUDA okuyup listeyi süzüyordu. Sayfa statiğe çevrilince
bu kayboldu → tıklayınca filtre çalışıyor ama `?category=X` linkiyle girince
uygulanmıyordu. Çözüm: `useUrlQueryParam` (`src/hooks/useUrlQueryParam.ts`) —
`useSyncExternalStore` ile sunucu anlık görüntüsü `undefined`, istemcininki gerçek değer.
Hydration uyuşmazlığı üretmez, `set-state-in-effect` lint kuralına takılmaz, sayfa
statik kalır. Kullanıcı seçimi sonradan URL'i ezer.

## Faz 4 Notları — Auth/BFF

**BFF modeli AYNEN korundu.** Server action yalnız bir sözdizimi kolaylığıydı; güvenlik
onun değil, işin sunucuda yapılmasının sonucu:

| Eski (server action)                        | Yeni (Pages Router)                           |
| ------------------------------------------- | --------------------------------------------- |
| `login()`                                   | `POST /api/auth/login`                        |
| `siteLogout()`                              | `POST /api/auth/logout`                       |
| `refreshSession()`                          | `POST /api/auth/refresh`                      |
| `saveTokens()`                              | login route'unun içinde (ayrı dosya gereksiz) |
| `logout()` (panelden kalma, `/admin/login`) | **silindi** — kullanan yoktu                  |

- `src/lib/api-cookies.ts`: `resCookieStore(res)` — `writeAuthCookies`/`clearAuthCookies`'in
  beklediği store arayüzünü `NextApiResponse` üzerinde uygular. Cookie kuralları
  (isimler, httpOnly/sameSite/secure, JWT süresinden türetilen max-age) TEK yerde
  (`lib/auth-cookies.ts`) kalmaya devam ediyor. Serializer elle yazıldı — `cookie`
  paketi yalnız transitive bağımlılık, ona yaslanmadık.
- `src/actions/auth/*` dosyaları **aynı isim ve imzayla** istemci `fetch` sarmalayıcısına
  dönüştü → `Header` ve `SessionRefresher` hiç değişmedi, iki router'da da çalışıyor.
- Sosyal giriş route handler'ları `pages/api/auth/social/{start,callback}/[provider].ts`
  oldu; `origin` `x-forwarded-proto` + `host` başlıklarından kuruluyor.
- `/login` `router.refresh()` yerine `window.location.assign('/')` kullanıyor (Pages
  Router'da refresh yok; girişten sonra tam gezinme zaten istenen davranış).
- `/verify-email`: `router.query` `isReady` öncesi boş olduğu için "geçersiz bağlantı"
  hatası erken verilmiyor; durum türetilerek `set-state-in-effect` kuralı da korunuyor.

## Faz 5 Notları — Kalan Sayfalar

**TÜM sayfalar Pages Router'da.** App Router'da yalnız API route'ları ve özel dosyalar
(`robots`/`sitemap`/`manifest`/`not-found`/`layout`) kaldı.

- `/[pages]` (CMS wildcard) ve `/arcade`: slug/query önceden bilinemediği için
  **getServerSideProps** (App Router'daki ƒ davranışının aynısı). `revalidate=3600`
  karşılığı olarak `Cache-Control: s-maxage=3600, stale-while-revalidate` header'ı elle
  yazıldı — kullanıcı SSG'ye çevirmeyi zorunlu tutmadı, yapı dönüşümü öncelik.
- `/forms/[id]`: getServerSideProps (form aktif değilse `notFound`).
- `/projects/[slug]`: sabit doküman haritası → **getStaticPaths fallback:false** (4 sayfa
  build'de üretiliyor).
- `FormSubmitWrapper` App Router klasöründen `src/components/forms/`'a taşındı (git mv).
- `example/*` (5 demo sayfa ~1150 satır) + `actions/posts.ts` + `PostsFetcher.tsx`
  **silindi** (kullanıcı kararı): App Router öğretici demolarıydı, hiçbir menüden
  linklenmiyordu, Pages Router'da anlamları kalmıyordu.
- CMS şablon sistemi (`dynamicImport` + module cache) `[pages]` ve `arcade`'de korundu;
  `dynamicImport` her iki router'da çalışır.

## Faz 6 Notları — API route'ları + Özel Dosyalar + src/app KALDIRILDI

**src/app dizini artık YOK. Proje %100 Pages Router.**

API route'ları (App Router route handler → pages/api handler):

- chat/token, contact, templates, rate-limit/reset → düz port (req/res imzası).
  `getClientIp(Headers)` için `req.headers` (düz obje) → `Headers`'a çeviren küçük adaptör.
- **revalidate**: App Router'ın `revalidateTag`/`revalidatePath` ikilisinin Pages
  karşılığı yalnız `res.revalidate(path)`. Yeni davranış: POST-only, path bazlı;
  `tag` verilirse path'e EŞLENİR (`cms-page-<slug>` → `/` + `/<slug>`). Tag bazlı
  cache invalidation Pages Router'da olmadığı için semantik bilinçli değişti.
- `lib/api-cookies.ts` adaptörü chat/token dışındaki cookie işlerinde de kullanıldı.

Özel dosyalar:

- `robots.ts` → `pages/robots.txt.tsx` (getServerSideProps, text/plain)
- `sitemap.ts` → `pages/sitemap.xml.tsx` (getServerSideProps, XML üretir)
- `manifest.ts` → statik `public/site.webmanifest` (+ \_document link güncellendi)
- `not-found.tsx` → `pages/404.tsx` (hatalı /admin/dashboard + /api/contact linkleri
  /blog ile düzeltildi)
- `error.tsx` + `global-error.tsx` → `pages/500.tsx` (statik hata sayfası)
- `layout.tsx` → zaten \_document + \_app'e (Faz 1) taşınmıştı; `favicon.ico` public/'e alındı

Testler: 3 API testi (contact/templates/revalidate) Pages handler imzasına uyarlandı;
`tests/utils/test-utils.tsx`'e `createApiMocks` (req/res mock) eklendi. revalidate testi
yeni semantiğe göre yazıldı. **17 test geçiyor.**

Doğrulama: build'de "Route (app)" tablosu YOK; robots.txt/sitemap.xml/site.webmanifest/404
canlı sunucuda doğru çıktı veriyor.

## Faz 8 — beasties ile Kritik CSS Inline Geri Kazanıldı

Faz 1'de `optimizeCss` (critters) Pages Router'ın /404-/500 prerender'ını kırdığı için
kapatılmıştı. Taşıma bitince halef paket `beasties` ile çözüldü:

- `beasties` (critters'ın bakımlı fork'u) kuruldu; Next 16 hâlâ `require('critters')`
  dediği için `critters` adı beasties'e alias'landı: `"critters": "npm:beasties@^0.5.4"`.
- `optimizeCss: true` geri açıldı. beasties eski `setAttribute` çökmesini düzeltmiş —
  /404, /500, /projects/elly dahil tüm sayfalar prerender oluyor.
- Doğrulama: ~45 KB kritik CSS `<style>` olarak inline + kalan CSS preload; build-time
  çalışır (standalone runtime'a bağımlılık girmez). tsc+eslint temiz, 69 test geçiyor.

**Taşıma TAMAMLANDI.** Proje %100 Pages Router, açık ödün kalmadı.
