# 🔤 Font Optimization Guide

Bu dokümantasyon, Next.js projesinde font performansını optimize etme stratejilerini açıklar.

---

## 📊 **Mevcut Durum**

Projede **Google Fonts** kullanılıyor:

- Geist Sans
- Geist Mono

---

## ✅ **Uygulanmış Optimizasyonlar**

### 1. **Font Display: Swap**

```typescript
const geistSans = Geist({
  display: 'swap', // ✨ Kritik optimizasyon
  // ...
})
```

**Ne yapar:**

- Fontlar yüklenene kadar **fallback font** gösterir
- FOIT (Flash of Invisible Text) yerine FOUT (Flash of Unstyled Text)
- **LCP (Largest Contentful Paint)** skorunu iyileştirir

---

### 2. **Preload: true**

```typescript
const geistSans = Geist({
  preload: true, // ✨ Erken yükleme
  // ...
})
```

**Ne yapar:**

- Font dosyaları `<link rel="preload">` ile erken yüklenir
- Browser fontları CSS parse edilmeden indirir
- **FCP (First Contentful Paint)** iyileşir

---

### 3. **Adjust Font Fallback**

```typescript
const geistSans = Geist({
  adjustFontFallback: true, // ✨ CLS optimizasyonu
  // ...
})
```

**Ne yapar:**

- Fallback font metriklerini ana font ile eşler
- Font swap sırasında layout shift önler
- **CLS (Cumulative Layout Shift)** skorunu düşürür

---

### 4. **Sadece Kullanılan Font Ağırlıkları**

```typescript
const geistSans = Geist({
  weight: ['400', '500', '600', '700'], // ✨ Gereksiz yükleme yok
  // ...
})
```

**Ne yapar:**

- 100, 200, 300, 800, 900 gibi kullanılmayan ağırlıklar yüklenmez
- Font dosya boyutu %50+ azalır
- Daha hızlı indirme

---

## 🚀 **İleri Seviye Optimizasyonlar**

### Seçenek 1: Self-Hosted Fonts (En İyi)

Google Fonts yerine fontları kendi server'ınızda barındırın:

```bash
# 1. Fontları indir
# Google Fonts Helper: https://gwfh.mranftl.com/fonts

# 2. public/fonts/ klasörüne kopyala
mkdir -p public/fonts
```

```typescript
// src/pages/_app.tsx
import localFont from 'next/font/local'

const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
})
```

**Avantajları:**

- ✅ Google Fonts sunucusuna request yok
- ✅ GDPR uyumlu
- ✅ Tam kontrol
- ✅ CDN'den servis edilir (Vercel)

---

### Seçenek 2: Font Subsetting

Sadece kullanılan karakterleri yükle:

```typescript
const geistSans = Geist({
  subsets: ['latin'], // Türkçe için yeterli
  // subsets: ['latin-ext'] // Ekstra karakterler için
})
```

**Karakter Setleri:**

- `latin`: A-Z, a-z, 0-9, temel noktalama
- `latin-ext`: Türkçe özel karakterler (ş, ğ, ı, vb.)

---

### Seçenek 3: Variable Fonts

Tek dosyada tüm ağırlıklar:

```typescript
const geistSans = Geist({
  // Variable font otomatik kullanılır
  weight: 'variable', // 400-700 arası tüm değerler
})
```

---

## 📈 **Performans Karşılaştırması**

| Yöntem                    | Font Boyutu | İlk Yükleme | LCP Etkisi |
| ------------------------- | ----------- | ----------- | ---------- |
| **Optimize Edilmemiş**    | ~200KB      | 1.5s        | Yüksek     |
| **Mevcut (display:swap)** | ~120KB      | 0.8s        | Orta       |
| **Self-Hosted**           | ~120KB      | 0.3s        | Düşük      |
| **Variable Font**         | ~80KB       | 0.3s        | Düşük      |

---

## 🔍 **Font Performansını Test Et**

### Chrome DevTools

```
1. F12 aç
2. Network tab → Font filter
3. Cmd+R (yenile)
4. Font yükleme sürelerini kontrol et
```

### Lighthouse

```bash
bun run lighthouse:local
```

**Kontrol edilecek metrikler:**

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- "Ensure text remains visible during webfont load"

---

## 🎯 **Hedef Değerler**

| Metrik             | Hedef   |
| ------------------ | ------- |
| Font Download Time | < 200ms |
| Total Font Size    | < 100KB |
| CLS from font swap | < 0.05  |
| LCP Impact         | < 500ms |

---

## 📝 **Best Practices**

### ✅ Yapılması Gerekenler

1. **Font Display Swap Kullan**

   ```typescript
   display: 'swap'
   ```

2. **Preload Kritik Fontları**

   ```typescript
   preload: true
   ```

3. **Sadece Gerekli Ağırlıkları Yükle**

   ```typescript
   weight: ['400', '700']
   ```

4. **Subset Belirt**

   ```typescript
   subsets: ['latin']
   ```

5. **Fallback Fontları Optimize Et**
   ```typescript
   adjustFontFallback: true
   ```

---

### ❌ Yapılmaması Gerekenler

1. **❌ Çok Fazla Font Yükleme**

   ```typescript
   // Kötü: 5 farklı font
   // İyi: Max 2 font ailesi
   ```

2. **❌ Tüm Ağırlıkları Yükleme**

   ```typescript
   // Kötü: weight: ['100', '200', '300', ..., '900']
   // İyi: weight: ['400', '700']
   ```

3. **❌ Display: Block Kullanma**

   ```typescript
   // Kötü: display: 'block' // FOIT oluşturur
   // İyi: display: 'swap'
   ```

4. **❌ Multiple Font Providers**
   ```typescript
   // Kötü: Google Fonts + Adobe Fonts + Custom
   // İyi: Tek provider veya self-hosted
   ```

---

## 🛠 **Troubleshooting**

### Sorun: Fontlar çok geç yükleniyor

**Çözüm 1:** Preload ekle

```typescript
preload: true
```

**Çözüm 2:** Self-host yap

**Çözüm 3:** Font subset'i küçült

```typescript
subsets: ['latin'] // latin-ext yerine
```

---

### Sorun: Font swap sırasında layout shift

**Çözüm:**

```typescript
adjustFontFallback: true
```

Ve CSS'de fallback font stack kullan:

```css
font-family:
  'Geist Sans',
  system-ui,
  -apple-system,
  sans-serif;
```

---

### Sorun: Lighthouse "Ensure text remains visible"

**Çözüm:**

```typescript
display: 'swap' // 'block' veya 'optional' yerine
```

---

## 📚 **Kaynaklar**

- [Next.js Font Optimization](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts)
- [Web.dev Font Best Practices](https://web.dev/font-best-practices/)
- [Google Fonts Helper](https://gwfh.mranftl.com/fonts)
- [Font Squirrel](https://www.fontsquirrel.com/)

---

## 🎨 **Örnek: Komple Self-Hosted Font Setup**

```typescript
// src/pages/_app.tsx
import type { AppProps } from 'next/app'
import localFont from 'next/font/local'

export const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/Geist-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Geist-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${geistSans.variable} font-sans`}>
      <Component {...pageProps} />
    </div>
  )
}
```

---

## ✅ **Checklist**

- [x] `display: 'swap'` kullanıldı
- [x] `preload: true` eklendi
- [x] `adjustFontFallback: true` aktif
- [x] Sadece gerekli font ağırlıkları
- [x] Subset optimize edildi
- [ ] Self-hosted fonts (opsiyonel)
- [ ] Variable fonts (opsiyonel)
