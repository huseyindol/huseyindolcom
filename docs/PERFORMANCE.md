# 🚀 Next.js Performance Testing & Scaling Guide

Bu dokümantasyon, Next.js uygulamasının performans testi, ölçekleme ve optimizasyon süreçlerini kapsar.

## 📊 İçindekiler

1. [Core Web Vitals](#core-web-vitals)
2. [Bundle Analysis](#bundle-analysis)
3. [Lighthouse Testing](#lighthouse-testing)
4. [Load Testing](#load-testing)
5. [Real User Monitoring (RUM)](#real-user-monitoring)
6. [Scaling Strategies](#scaling-strategies)
7. [Performance Checklist](#performance-checklist)

---

## 🎯 Core Web Vitals

### Metrikler ve Hedefler

| Metrik   | Açıklama                  | İyi     | Orta       | Kötü     |
| -------- | ------------------------- | ------- | ---------- | -------- |
| **LCP**  | Largest Contentful Paint  | < 2.5s  | 2.5-4s     | > 4s     |
| **FID**  | First Input Delay         | < 100ms | 100-300ms  | > 300ms  |
| **CLS**  | Cumulative Layout Shift   | < 0.1   | 0.1-0.25   | > 0.25   |
| **INP**  | Interaction to Next Paint | < 200ms | 200-500ms  | > 500ms  |
| **FCP**  | First Contentful Paint    | < 1.8s  | 1.8-3s     | > 3s     |
| **TTFB** | Time to First Byte        | < 800ms | 800-1800ms | > 1800ms |

### Web Vitals Tracking

Projede `WebVitals` component'i otomatik olarak metrikleri takip eder:

```tsx
// src/components/WebVitals.tsx
import { useReportWebVitals } from 'next/web-vitals'

export function WebVitals() {
  useReportWebVitals(metric => {
    console.log(metric)
    // Analytics'e gönder
  })
  return null
}
```

### Console'da Görüntüleme

Development modunda tarayıcı console'unda göreceksiniz:

```
[Web Vitals] LCP: 1234.56ms (good)
[Web Vitals] FID: 12.34ms (good)
[Web Vitals] CLS: 0.05 (good)
```

---

## 📦 Bundle Analysis

### Kullanım

```bash
# Bundle analizi ile build
bun run analyze

# veya manuel
ANALYZE=true bun run build
```

### Ne Kontrol Etmeli?

1. **Large Dependencies**: 100KB+ olan paketler
2. **Duplicate Packages**: Aynı paketin farklı versiyonları
3. **Unused Exports**: Tree-shaking'e uygun olmayan importlar
4. **Dynamic Imports**: Lazy loading fırsatları

### Optimizasyon Önerileri

```tsx
// ❌ Kötü: Tüm paket import
import { format, parse, add } from 'date-fns'

// ✅ İyi: Sadece kullanılan fonksiyon
import format from 'date-fns/format'

// ❌ Kötü: Static import
import HeavyComponent from './HeavyComponent'

// ✅ İyi: Dynamic import
import dynamic from 'next/dynamic'
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false, // Client-only component için
})
```

---

## 🔦 Lighthouse Testing

### Manuel Test

```bash
# Local Lighthouse
bun run lighthouse:local

# Lighthouse CI
bun run lighthouse
```

### CI/CD Integration

```yaml
# .github/workflows/lighthouse.yml
name: Lighthouse CI
on: [push]
jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - run: bun run lighthouse
```

### Lighthouse CI Thresholds (lighthouserc.js)

```js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.9 }],
      },
    },
  },
}
```

---

## 🏋️ Load Testing

### k6 ile Load Test

```bash
# k6 kurulumu (macOS)
brew install k6

# Basit test
bun run load-test:quick

# Tam test
bun run load-test

# Özel ayarlarla
k6 run --vus 100 --duration 5m scripts/load-test.k6.js
```

### Test Senaryoları

| Senaryo | VUs     | Duration | Amaç                   |
| ------- | ------- | -------- | ---------------------- |
| Smoke   | 1-5     | 30s      | Temel çalışma kontrolü |
| Load    | 10-50   | 5m       | Normal yük             |
| Stress  | 100-200 | 10m      | Yüksek yük             |
| Spike   | 0→200→0 | 2m       | Ani trafik artışı      |
| Soak    | 50      | 1h       | Uzun süreli stabilite  |

### Başarı Kriterleri

```js
// scripts/load-test.k6.js
export const options = {
  thresholds: {
    http_req_duration: ['p(95)<500'], // %95 < 500ms
    http_req_failed: ['rate<0.01'], // Hata < %1
  },
}
```

---

## 📈 Real User Monitoring (RUM)

### Mevcut Entegrasyonlar

1. **Vercel Analytics** (`@vercel/analytics`)
   - Otomatik sayfa görüntüleme
   - Web Vitals tracking
   - Custom events

2. **Vercel Speed Insights** (`@vercel/speed-insights`)
   - Real-time performans verileri
   - Coğrafi dağılım

### Custom Analytics

```tsx
// Google Analytics event
gtag('event', 'page_load', {
  page_title: document.title,
  page_location: window.location.href,
  lcp: lcpValue,
  fid: fidValue,
  cls: clsValue,
})

// Custom endpoint
fetch('/api/analytics/vitals', {
  method: 'POST',
  body: JSON.stringify({
    metric: 'LCP',
    value: 1234,
    page: '/home',
  }),
})
```

---

## 📐 Scaling Strategies

### 1. Static Generation (SSG)

```tsx
// src/pages/about.tsx — Sayfa build time'da oluşturulur
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchData()
  return { props: { data } }
}

export default function Page({ data }: { data: DataType }) {
  return <Component data={data} />
}
```

### 2. Incremental Static Regeneration (ISR)

```tsx
// src/pages/index.tsx — Her 3600 saniyede arka planda yeniden oluşturulur
import type { GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchData()
  return {
    props: { data },
    revalidate: 3600,
  }
}
```

### 3. Edge Proxy

```tsx
// src/proxy.ts - Next.js 16 proxy
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### 4. Caching Strategies

```tsx
// next.config.ts
async headers() {
  return [
    {
      source: '/assets/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable',
        },
      ],
    },
  ]
}
```

### 5. Database Connection Pooling

```tsx
// Prisma ile connection pooling
// prisma/schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection pool boyutu
  // connectionLimit = 10
}
```

### 6. CDN & Edge Caching

```
User Request
    ↓
CDN Edge (Vercel/Cloudflare)
    ↓ (cache miss)
Origin Server
    ↓
Response (+ cache headers)
    ↓
CDN Cache (for future requests)
```

---

## ✅ Performance Checklist

### Build & Bundle

- [ ] Bundle analizi yapıldı
- [ ] Unused dependencies temizlendi
- [ ] Dynamic imports kullanıldı
- [ ] Tree shaking çalışıyor

### Images

- [ ] `next/image` kullanılıyor
- [ ] Lazy loading aktif
- [ ] WebP/AVIF formatları
- [ ] Responsive images

### JavaScript

- [ ] Code splitting yapıldı
- [ ] Third-party scripts optimize
- [ ] Unused code temizlendi
- [ ] React.memo kullanıldı

### CSS

- [ ] Tailwind purge aktif
- [ ] Critical CSS extracted
- [ ] Unused CSS temizlendi

### Caching

- [ ] Static assets cache headers
- [ ] ISR yapılandırıldı
- [ ] API response caching
- [ ] CDN kullanılıyor

### Monitoring

- [ ] Web Vitals tracking
- [ ] Error tracking (Sentry)
- [ ] Performance alerts
- [ ] User analytics

### Testing

- [ ] Lighthouse CI entegre
- [ ] Load testing yapıldı
- [ ] Performance regression testleri

---

## 🛠 Kullanılabilir Scriptler

```bash
# Bundle analizi
bun run analyze

# Lighthouse testi
bun run lighthouse
bun run lighthouse:local

# Performance audit
bun run perf:audit
bun run perf:build

# Load testing
bun run load-test
bun run load-test:quick
```

---

## 📚 Kaynaklar

- [Next.js Performance Docs](https://nextjs.org/docs/pages/building-your-application/optimizing)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developer.chrome.com/docs/lighthouse/)
- [k6 Load Testing](https://k6.io/docs/)
- [Vercel Analytics](https://vercel.com/docs/analytics)

---

## 🎯 Hedef Değerler

| Metrik                 | Hedef             |
| ---------------------- | ----------------- |
| Lighthouse Performance | > 90              |
| LCP                    | < 2.5s            |
| FID/INP                | < 100ms           |
| CLS                    | < 0.1             |
| TTFB                   | < 600ms           |
| Bundle Size            | < 200KB (gzipped) |
| API Response           | < 200ms           |
| p95 Response Time      | < 500ms           |
