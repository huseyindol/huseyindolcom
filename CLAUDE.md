# elly-tenant — Claude Rehberi

## Proje

Huseyin DOL'un modern portföy ve CMS sitesi. Next.js 16 Pages Router, React 19, TypeScript strict mode.

## Tech Stack

- Framework: Next.js 16 (Pages Router)
- UI: Tailwind CSS 4, Shadcn UI, Framer Motion
- Form: React Hook Form + Zod 4
- Data: TanStack Query 5
- Test: Vitest 4 + Testing Library (jsdom)
- Email: Resend
- Package Manager: Bun (npm değil, `bun run`, `bun install`, `bunx` kullanılmalı)
- Deployment: Vercel

## Dizin Yapısı

- `src/pages/` — Sayfalar (`_app.tsx`, `_document.tsx`, `404.tsx`, `500.tsx`) ve `api/` BFF route handler'ları (`NextApiRequest`, `NextApiResponse`)
- `src/components/` — React componentleri. `ui/` shadcn, `forms/` formlar, `dynamic/` dinamik içerik, `layouts/` (`SiteLayout.tsx`)
- `src/lib/` — Yardımcı araçlar (`env.ts`, `rate-limiter.ts`, `security.ts`, `seo.tsx`, `api-cookies.ts`, `mdx.ts`, `utils.ts`)
- `src/services/` — API servisleri (auth, site, typicode)
- `src/schemas/` — Zod validation şemaları
- `src/actions/` — Client-side BFF API (`fetch('/api/auth/...')`) sarmalayıcıları
- `src/styles/` — Global stiller (`globals.css`)
- `src/types/` — TypeScript tip tanımları
- `src/context/` — React Context (`CookieContext`)
- `src/providers/` — React Provider'lar (`Providers`, `ThemeProvider`, `HydrationProvider`)
- `tests/` — Vitest test dosyaları (`components/`, `lib/`, `api/`, `pages/`)

## Kodlama Kuralları

- TypeScript strict mode — `any` kullanma
- Component isimleri: PascalCase
- Dosya isimleri: PascalCase (componentler), kebab-case (utils/lib)
- `console.log` production kodunda yasak
- Tüm API rotaları rate limiting (`src/lib/rate-limiter.ts`) ve input sanitization içermeli
- Validation: Zod ile, şemalar `src/schemas/` altında
- Pages Router mimarisi: veri çekme `getStaticProps` / `getServerSideProps` ile, SEO `<Seo />` (`src/lib/seo.tsx`, `next/head`) ile yapılır; proje bileşenlerinde `'use client'` direktifi kullanılmaz
- Pre-commit hook `tsc --noEmit` çalıştırır — type error varsa commit engellenir
- Cookie'ye yazılan `number` değerler `String()` ile dönüştürülmeli (`resCookieStore(res).set` sadece `string` kabul eder)

## Test Kuralları

- Test framework: Vitest + @testing-library/react
- Test dosyaları: `tests/` altında, source dizin yapısını yansıtır
  - `tests/components/` → `src/components/` için
  - `tests/lib/` → `src/lib/` için
  - `tests/api/` → `src/pages/api/` için (`createApiMocks` ile test edilir)
  - `tests/pages/` → `src/pages/` için (`getStaticProps` / `getServerSideProps` ve sayfa render testleri)
- Import path: `@/components/...` (path alias)
- Mock pattern: `vi.mock(...)` dosya başında (`next/router` mock'u `tests/setup.ts` içinde tanımlıdır)
- Coverage threshold: %50 branch, %30 function, %10 line
- Test çalıştırma: `bun run test:ci`

## Blog İçeriği (`/blog`)

- Yazılar `src/data/blog/*.mdx` (frontmatter + MDX). Slug = dosya adı (`.mdx`siz).
- Frontmatter: `title`, `description`, `publishedAt` (`'YYYY-MM-DD'`), `category`
  (Frontend/Backend/DevOps/AI/Mobile — renkleri tanımlı), `author`, `coverImage`,
  `readingTime`, `order`.
- Body'de `# Başlık` KOYMA — detay sayfası başlığı frontmatter'dan basar.
- **Sıralama kuralı (`src/lib/mdx.ts`):** en yeni `publishedAt` her zaman en üstte
  (son eklenen başta). Aynı gün yayınlananlar `order` (asc) ile sıralanır →
  çok bölümlü seriler doğru sırada. Bir seriyi başta tutmak için bölümlere
  **aynı (en yeni) `publishedAt` + sıralı `order` (1,2,3)** ver.

## API Güvenliği

- Rate limiting: `src/lib/rate-limiter.ts` — IP bazlı, 60 istek/dk
- Security headers: `src/lib/security.ts` — HSTS, CSP, X-Frame-Options
- Input sanitization tüm API rotalarında zorunlu
- `.env` dosyalarına dokunma

## Önemli Dosyalar

- `src/lib/env.ts` — Zod ile environment variable validasyonu
- `src/lib/rate-limiter.ts` — IP bazlı rate limiting
- `src/lib/security.ts` — Security header'ları ve yardımcı araçlar
- `src/lib/seo.tsx` — Pages Router `<Seo />` (`next/head`) bileşeni
- `src/lib/api-cookies.ts` — `NextApiResponse` üzerinde `Set-Cookie` yöneticisi
- `src/proxy.ts` — Next.js 16 proxy (eski middleware)
- `next.config.ts` — Next.js konfigürasyonu
- `vitest.config.ts` — Test konfigürasyonu

## CI/CD Kuralları (ÖNEMLİ)

Her `git push` sonrası CI pipeline kontrol edilmeli. Görev tamamlanmış sayılmaz:

- `bun run lint` — ESLint hata vermemeli (react-hooks v7: `set-state-in-effect` dahil)
- `bun run type-check` — TypeScript hata vermemeli
- `bun run format:check` — Prettier hata vermemeli
- GitHub Actions "Lint & Type Check" ve "Generate Report" yeşil olmalı

Bilinen tuzak: `useEffect` içinde doğrudan `setState()` çağırmak `react-hooks/set-state-in-effect` hatasına neden olur. Çözüm: state'i onClick handler'larına taşı.

Detay: `.agents/skills/ci-pipeline.md`

## Agent Teams Koordinasyonu

Bu proje `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` ile çalışır. Takım yapısı:

### Takım Yapısı

| Agent                  | Rol                             | Model  | Yetki           |
| ---------------------- | ------------------------------- | ------ | --------------- |
| **team-lead**          | Koordinatör, task decomposition | opus   | Read/Write/Bash |
| **test-writer**        | Test yazımı                     | sonnet | Read/Write      |
| **security-reviewer**  | Güvenlik review                 | sonnet | Read-only       |
| **ui-reviewer**        | UI/a11y review                  | sonnet | Read-only       |
| **nextjs-performance** | Performance review              | sonnet | Read-only       |

### Koordinasyon Kuralları

- Team Lead tüm büyük görevleri alt task'lara ayırır
- Her teammate yalnızca kendine atanan dosya/dizinlerde çalışır
- **Aynı dosyaya birden fazla agent yazmamalı** (file conflict önleme)
- Bulguları yapılandırılmış formatta raporla (impact, location, issue, fix)
- Kritik sorunları hemen team lead'e bildir
- Teammate'ler arası doğrudan iletişim mümkün (mesaj sistemi)

### İş Akışı

1. Team Lead görevi analiz eder ve alt görevlere böler
2. Her alt görev uygun teammate'e atanır
3. Teammate'ler paralel çalışır, dosya ownership'e uyar
4. Sonuçlar team lead'de birleştirilir, kalite kontrolü yapılır
5. Final rapor kullanıcıya sunulur

## Ponytail (Lazy Senior Dev Modu)

İşi tam çözen **en küçük değişiklik**; istenmeyen soyutlama, seçenek ve bağımlılık yok. Kaynak: [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (MIT).
Antigravity: `.agents/rules/ponytail.md` · Cursor: `.cursor/rules/ponytail.mdc` · Claude Code: `.claude/skills/ponytail*/` (yerel, `.claude/` git'te yok sayılıyor).

## Karpathy Davranış Kuralları

> Kaynak: [andrej-karpathy-skills](https://github.com/forrestchang/andrej-karpathy-skills)
> Bu kurallar tüm agent'lar ve teammate'ler için geçerlidir.

**Tradeoff:** Bu kurallar hız yerine dikkat ve doğruluğu önceliklendirir. Basit görevlerde sağduyu kullan.

### 1. Kodlamadan Önce Düşün

**Varsayma. Belirsizliği gizleme. Trade-off'ları yüzeye çıkar.**

- Varsayımlarını açıkça belirt. Emin değilsen sor.
- Birden fazla yorum varsa hepsini sun — sessizce seçme.
- Daha basit bir yaklaşım varsa söyle. Gerektiğinde itiraz et.
- Bir şey belirsizse dur. Neyin belirsiz olduğunu adlandır. Sor.

### 2. Sadelik Önce

**Problemi çözen minimum kod. Spekülatif hiçbir şey yok.**

- İstenmeyen özellik ekleme.
- Tek kullanımlık kod için soyutlama yapma.
- İstenmemiş "esneklik" veya "yapılandırılabilirlik" ekleme.
- İmkansız senaryolar için hata yönetimi yazma.
- 200 satırda yazılıp 50 satırda olabilecekse, yeniden yaz.

Test: "Kıdemli bir mühendis bunu aşırı karmaşık der mi?" Evetse, sadeleştir.

### 3. Cerrahi Değişiklikler

**Sadece gerekeni değiştir. Sadece kendi karmaşanı temizle.**

Mevcut kodu düzenlerken:

- Komşu kodu, yorumları veya biçimlendirmeyi "iyileştirme".
- Bozulmamış şeyleri refactor etme.
- Mevcut stile uy, farklı yapardım desen bile.
- İlgisiz ölü kod fark edersen, bahset — silme.

Değişikliklerin yetim bıraktığında:

- SENİN değişikliklerinin kullanılmaz kıldığı import/değişken/fonksiyonları kaldır.
- Önceden var olan ölü kodu istenmedikçe kaldırma.

Test: Her değişen satır doğrudan kullanıcının isteğine bağlanmalı.

### 4. Hedef Odaklı Yürütme

**Başarı kriterlerini tanımla. Doğrulanana kadar döngü yap.**

Görevleri doğrulanabilir hedeflere dönüştür:

- "Validasyon ekle" → "Geçersiz girişler için test yaz, sonra geçir"
- "Bug'ı düzelt" → "Onu tekrarlayan test yaz, sonra geçir"
- "X'i refactor et" → "Önce ve sonra testlerin geçtiğinden emin ol"

Çok adımlı görevlerde kısa plan belirt:

```
1. [Adım] → doğrula: [kontrol]
2. [Adım] → doğrula: [kontrol]
3. [Adım] → doğrula: [kontrol]
```

Güçlü başarı kriterleri bağımsız çalışmanı sağlar. Zayıf kriterler ("çalışır hale getir") sürekli netleştirme gerektirir.
