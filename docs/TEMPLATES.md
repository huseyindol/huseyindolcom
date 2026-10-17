# Dynamic Template Loading System

Bu döküman, admin panelinde kullanılan dinamik template yükleme sistemini açıklar.

## Genel Bakış

Template sistemi, `Page`, `Component`, `Widget` ve `Post` entity'leri için dinamik şablon seçimi sağlar. Template dosyaları `src/components/dynamic/` dizininden runtime'da okunur.

## Dizin Yapısı

```
src/
├── components/dynamic/           # Template dosyaları
│   ├── pages/
│   │   ├── APage.tsx
│   │   ├── BPage.tsx
│   │   └── CPage.tsx
│   ├── components/
│   │   ├── AComponent.tsx
│   │   └── BComponent.tsx
│   ├── widgets/
│   │   ├── AWidget.tsx
│   │   └── BWidget.tsx
│   └── posts/
│       ├── APost.tsx
│       └── BPost.tsx
│
├── pages/api/
│   └── templates.ts              # Pages Router API Route (GET /api/templates)
│
└── scripts/
    └── generate-templates.ts     # Alternatif: Statik dosya üretici
```

## Nasıl Çalışır?

### 1. API Route (`src/pages/api/templates.ts`)

Sunucu tarafında `src/components/dynamic/` dizinini okur ve template listesini HTTP üzerinden döndürür:

```typescript
// GET /api/templates?type=pages
// src/components/dynamic/pages/ dizinini okur
// .tsx/.ts dosyalarını listeler
// [{ value: '', label: 'Template Seçin' }, { value: 'APage', label: 'APage' }] formatında döndürür
```

### 2. Frontend'de Fetch ile Kullanım

React component'lerde veya admin panelinde kullanım:

```typescript
const response = await fetch('/api/templates?type=pages')
const pageTemplates = await response.json()
```

**Desteklenen tipler:** `'pages' | 'components' | 'widgets' | 'posts'`

### 3. Form'da Kullanım

```tsx
<select {...register('template')}>
  {pageTemplates.map(t => (
    <option key={t.value} value={t.value}>
      {t.label}
    </option>
  ))}
</select>
```

## Yeni Template Ekleme

1. İlgili dizine `.tsx` dosyası ekleyin:

   ```bash
   # Örnek: Yeni page template
   touch src/components/dynamic/pages/MyNewPage.tsx
   ```

2. Component'i oluşturun:

   ```tsx
   export default function MyNewPage() {
     return <div>My New Page Template</div>
   }
   ```

3. Form'u yenileyin - yeni template otomatik listede görünecek!

## Alternatif: Statik Script

Build-time statik liste oluşturmak için:

```bash
bun scripts/generate-templates.ts
```

Bu komut `src/constants/templates.ts` dosyasını oluşturur.

> **Not:** `/api/templates` endpoint'i dinamik olarak dosya sistemini okuduğu için bu script opsiyoneldir.

## Akış Diyagramı

```
┌──────────────────┐     ┌─────────────────────┐     ┌────────────────────────┐
│   Form Component │────▶│  fetch /api/...     │────▶│ src/pages/api/templates│
└──────────────────┘     └─────────────────────┘     └───────────┬────────────┘
                                                                 │
                                                                 ▼
                                                      ┌──────────────────┐
                                                      │  File System     │
                                                      │  /dynamic/pages  │
                                                      └──────────────────┘
```

## Backend Entegrasyonu

> ⚠️ **Önemli:** Backend API'ları `template` alanını desteklemelidir. Şu an sadece frontend'de select görüntüleniyor, API'ların bu alanı persist etmesi gerekir.
