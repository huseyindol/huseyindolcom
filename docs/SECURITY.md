# Security Implementation

Bu projede uygulanan güvenlik önlemleri ve best practices.

## 🔒 Uygulanan Güvenlik Önlemleri

### 1. Error Boundaries

**Dosyalar:**

- `src/components/ErrorBoundary.tsx` - React Error Boundary component
- `src/pages/404.tsx` - 404 sayfası
- `src/pages/500.tsx` - 500 sunucu hata sayfası

**Özellikler:**

- ✅ React component hatalarını yakalama
- ✅ Kullanıcı dostu error UI
- ✅ Development ortamında detaylı hata mesajları
- ✅ Production'da basitleştirilmiş hata gösterimi
- ✅ Error logging için hazır yapı (Sentry entegrasyonu için)

### 2. Rate Limiting

**Dosya:** `src/lib/rate-limiter.ts`

**Özellikler:**

- ✅ In-memory rate limiting (production için Redis önerilir)
- ✅ IP bazlı istek limitlemesi
- ✅ Farklı route'lar için farklı limitler
- ✅ Rate limit headers (X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset)
- ✅ 429 Too Many Requests response

**Preset Konfigürasyonlar:**

```typescript
- strict: 50 requests / 15 minutes
- moderate: 100 requests / 15 minutes
- relaxed: 200 requests / 15 minutes
- api: 60 requests / minute
```

### 3. Security Headers

**Dosya:** `src/proxy.ts`

**Uygulanan Headers:**

- ✅ `Strict-Transport-Security` - HTTPS zorunluluğu
- ✅ `X-Frame-Options` - Clickjacking koruması
- ✅ `X-Content-Type-Options` - MIME sniffing koruması
- ✅ `X-XSS-Protection` - XSS saldırı koruması
- ✅ `Referrer-Policy` - Referrer bilgisi kontrolü
- ✅ `Permissions-Policy` - Tarayıcı özelliklerinin kontrolü
- ✅ `Content-Security-Policy` - İçerik güvenlik politikası
- ✅ `X-DNS-Prefetch-Control` - DNS prefetching kontrolü

### 4. Environment Validation

**Dosya:** `src/lib/env.ts`

**Özellikler:**

- ✅ Zod ile environment variable validasyonu
- ✅ Build-time validation
- ✅ TypeScript type safety
- ✅ Eksik veya hatalı env variables için açıklayıcı hatalar
- ✅ Development ortamında detaylı env info

**Kullanım:**

```typescript
import { env, requireEnv, getEnv } from '@/lib/env'

// Type-safe environment variables
const apiKey = env.NEXT_PUBLIC_RESEND_API_KEY

// Zorunlu variable kontrolü
const secret = requireEnv('NEXTAUTH_SECRET')

// Fallback ile kullanım
const host = getEnv('NEXT_PUBLIC_HOST', 'http://localhost:3000')
```

### 5. Security Utilities

**Dosya:** `src/lib/security.ts`

**Fonksiyonlar:**

- ✅ `sanitizeInput()` - XSS koruması için input temizleme
- ✅ `generateSecureToken()` - Güvenli token üretimi
- ✅ `isValidEmail()` - Email validasyonu
- ✅ `isValidUrl()` - URL validasyonu
- ✅ `getClientIp()` - Client IP adresi alma
- ✅ `isBot()` - Bot detection
- ✅ `generateCSP()` - Content Security Policy üretimi
- ✅ `hashString()` - SHA-256 hashing

## 🚀 Kurulum

### 1. Environment Variables

`.env.example` dosyasını `.env.local` olarak kopyalayın:

```bash
cp .env.example .env.local
```

### 2. Gerekli Environment Variables

**Zorunlu:**

- `NEXT_PUBLIC_HOST` - Uygulama URL'i

**Opsiyonel ama Önerilen:**

- `NEXT_PUBLIC_RESEND_API_KEY` - Email servisi
- `NEXT_PUBLIC_REVALIDATE_SECRET` - Revalidation endpoint güvenliği
- `SENTRY_DSN` - Error monitoring (üretim için önemli)

### 3. Build & Run

```bash
# Dependencies
bun install

# Development
bun dev

# Production build
bun build
bun start
```

## 🔍 Testing Security

### Rate Limiting Test

```bash
# Test API rate limit
for i in {1..65}; do
  curl http://localhost:3000/api/contact
  echo "Request $i"
done

# 60. istekten sonra 429 görmeli
```

### Error Boundary Test

```typescript
// Bir component içinde hata fırlat
throw new Error('Test error')
```

### Environment Validation Test

```bash
# Geçersiz env variable ile build
NEXT_PUBLIC_RESEND_FROM_EMAIL=invalid-email bun build
# Validasyon hatası görmeli
```

## 📊 Production Önerileri

### 1. Rate Limiting

**Öneriler:**

- Redis kullanarak distributed rate limiting
- IP whitelist/blacklist sistemi
- API key bazlı rate limiting

```typescript
// Redis ile rate limiting örneği
import Redis from 'ioredis'
const redis = new Redis(process.env.REDIS_URL)

// Rate limiter'da Redis kullanımı
```

### 2. Error Monitoring

**Sentry Entegrasyonu:**

```bash
bun add @sentry/nextjs
```

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const Sentry = await import('@sentry/nextjs')

    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      tracesSampleRate: 1.0,
    })
  }
}
```

### 3. Additional Security Headers

```typescript
// src/proxy.ts'e eklenebilir
response.headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
response.headers.set('Cross-Origin-Opener-Policy', 'same-origin')
response.headers.set('Cross-Origin-Resource-Policy', 'same-origin')
```

### 4. CSRF Protection

```typescript
// API route'larında (src/pages/api/*) CSRF token kontrolü
import type { NextApiRequest, NextApiResponse } from 'next'
import { validateCSRFToken } from '@/lib/security'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const token = req.headers['x-csrf-token'] as string | undefined

  if (!validateCSRFToken(token ?? '', expectedToken)) {
    return res.status(403).json({ error: 'Forbidden' })
  }

  // ... rest of the logic
}
```

## 🔐 Security Checklist

- [x] Error Boundaries
- [x] Rate Limiting
- [x] Security Headers
- [x] Environment Validation
- [x] Input Sanitization utilities
- [ ] HTTPS zorunluluğu (production)
- [ ] CSRF Protection (API'lar için)
- [ ] SQL Injection koruması (database kullanımında)
- [ ] XSS koruması (tüm user input'larda)
- [ ] Authentication & Authorization
- [ ] API key management
- [ ] Secrets rotation
- [ ] Security testing (OWASP ZAP)
- [ ] Penetration testing
- [ ] Security audit

## 📚 Kaynaklar

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/pages/building-your-application/configuring)
- [MDN Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [Content Security Policy](https://content-security-policy.com/)

## 🆘 Sorun Giderme

### Rate Limit 429 Hatası

```bash
# Rate limit cache'i temizle (development)
# Sunucuyu yeniden başlat veya rate limiter'ı reset et
```

### Environment Validation Hatası

```bash
# Tüm environment variables'ları kontrol et
bun run type-check

# .env.example ile karşılaştır
diff .env.local .env.example
```

### CSP Violations

```bash
# Browser console'da CSP hatalarını kontrol et
# src/lib/security.ts'de generateCSP() fonksiyonunu güncelle
```

## 🔄 Güncelleme Notları

### v1.0.0 (Current)

- ✅ Error Boundaries eklendi
- ✅ Rate Limiting implementasyonu
- ✅ Security Headers
- ✅ Environment Validation

### Gelecek Güncellemeler

- [ ] Sentry integration
- [ ] Redis-based rate limiting
- [ ] Advanced CSRF protection
- [ ] API key management system
