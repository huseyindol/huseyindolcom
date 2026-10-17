# Skill: Sitemap Öncelik Yönetimi

## Amaç

Derin teknik makaleleri `src/pages/sitemap.xml.tsx` içindeki `HIGH_PRIORITY_SLUGS` Set'ine ekleyerek
Google'a `priority: 0.9` sinyali gönder (normal makaleler: `0.8`).

## Karar Kriterleri

Makale aşağıdaki kriterleri karşılıyorsa `HIGH_PRIORITY_SLUGS`'a ekle:

| Kriter          | Açıklama                                 |
| --------------- | ---------------------------------------- |
| Derinlik        | 1500+ kelime, 6+ H2 bölüm                |
| Kod yoğunluğu   | 5+ kod bloğu                             |
| Özgün içerik    | Gerçek proje (elly, portfolio) deneyimi  |
| Teknik doğruluk | Resmi dokümana dayanan içerik            |
| Bağlantı değeri | Diğer makaleler veya projelerle bağlantı |

Herhangi **3+** kriter sağlanıyorsa → `HIGH_PRIORITY_SLUGS`'a ekle.

## Adımlar

### 1. Makaleyi değerlendir

Yazan makaleyi yukarıdaki kriterlere göre puanla.

### 2. Gerekiyorsa sitemap.xml.tsx güncelle

`src/pages/sitemap.xml.tsx` içindeki `HIGH_PRIORITY_SLUGS` Set'ine slug ekle:

```typescript
export const HIGH_PRIORITY_SLUGS = new Set([
  'backend-java-elly',
  'devops-kubernetes-master',
  'devops-docker-postgresql',
  'devops-postgresql',
  'frontend-js-event-loop',
  '{yeni-slug}', // ← YENİ MAKALE
])
```

### 3. Doğrulama

```bash
grep "yeni-slug" src/pages/sitemap.xml.tsx
```

## Kural

- Basit/kısa makaleler (< 1000 kelime) `HIGH_PRIORITY_SLUGS`'a eklenmez
- Her kategori için 2-4 makale ideal sayıdır
- `HIGH_PRIORITY_SLUGS` büyümesi: +1 makale / commit
