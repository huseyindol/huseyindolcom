# Blog Yazı Oluşturma Agent

## Amaç

Verilen konu için derinlemesine araştırılmış, SEO optimize edilmiş, AI toollarında görünür bir blog makalesi oluşturur ve `main` branch'e push eder.

> ⚠️ **Karpathy Kuralları aktif.** `.agents/skills/karpathy-guidelines.md` uygula.
> Sadece istenen konuda makale yaz. Gereksiz bölüm, spekülatif içerik ekleme. Sadelik ve odak öncelikli.

## Tetikleme

```
Konu: <kategori> -> <başlık/konu>
```

Örnek: `Frontend -> JS'te Event Loop`

## Kullanılan Skill'ler

Bu agent aşağıdaki skill dosyalarını adım adım uygular:

| Skill            | Dosya                                | Adım |
| ---------------- | ------------------------------------ | ---- |
| Article Order    | `.agents/skills/article-order.md`    | 3    |
| LLMs Visibility  | `.agents/skills/llms-visibility.md`  | 4    |
| Sitemap Priority | `.agents/skills/sitemap-priority.md` | 5    |

Her skill'i çalıştırmadan önce ilgili dosyayı oku ve adımlarını uygula.

## Adımlar

### 1. Araştırma (Researcher)

- WebFetch ile resmi MDN/docs sayfası
- WebSearch ile güncel blog yazıları ve GitHub örnekleri
- Konuya özgü kod örnekleri, edge case'ler, performans notları topla
- Unsplash'tan konuya uygun `coverImage` URL belirle (format: `https://images.unsplash.com/photo-XXXXX?q=80&w=2000&auto=format&fit=crop`)

### 2. Makale Yazımı (Writer)

**Dosya:** `src/data/blog/{kategori-kebab}-{konu-kebab}.mdx`

**Frontmatter zorunlu alanlar:**

```yaml
title: Türkçe başlık — kısa, keyword içeren, dikkat çekici
description: 150-160 karakter, keyword yoğun, okuyucuya değer vaat eden
publishedAt: bugünün tarihi (YYYY-MM-DD)
category: Frontend | Backend | DevOps | AI | Mobile
author: Hüseyin DOL
coverImage: Unsplash URL (konuyla ilgili, yüksek kalite)
readingTime: tahmini okuma süresi (dakika olarak)
order: 1
```

> `order: 1` her zaman yazılır — sıralama adımı (Adım 3) mevcut makalelerin order'larını kaydırır.

**İçerik yapısı:**

- Giriş paragrafı: Neden bu konu önemli? Gerçek dünya problemi
- Minimum 6 bölüm (## H2 başlıkları)
- Her bölümde en az 1 kod bloğu (dil belirtilmiş: `js`, `ts`, `bash`, `yaml` vb.)
- Tablolar, listeler, callout (> blockquote) ile görsel çeşitlilik
- Gerçek örnek: `elly` projesi veya portfolio ile bağlantı (varsa)
- Sonuç bölümü + önerilen kaynaklar/sonraki adımlar

**Kalite kriterleri:**

- Minimum 1000 kelime
- Teknik doğruluk öncelikli
- Türkçe yazılır, teknik terimler İngilizce kalabilir
- `console.log` gibi basit örnekler yok — gerçek senaryolar

### 3. ⭐ Makale Sıralama — SKILL: article-order

> Skill dosyasını oku: `.agents/skills/article-order.md`

Yeni makale blog listesinde **1. sıraya** alınır. Mevcut makalelerin `order` değerleri kaydırılır.

**Özet adımlar:**

1. `grep -r "^order:" src/data/blog/*.mdx | sort -t: -k3 -n` ile mevcut sıraları listele
2. `order: 99` **olmayan** tüm makaleleri `order: N+1` olarak güncelle (büyükten küçüğe sırayla)
3. Yeni makalede `order: 1` zaten frontmatter'da var (Adım 2'de eklendi)
4. Sonucu doğrula: `grep -r "^order:" src/data/blog/*.mdx | sort -t: -k3 -n | head -3`

### 4. AI Görünürlük — SKILL: llms-visibility

> Skill dosyasını oku: `.agents/skills/llms-visibility.md`

**`public/llms.txt` güncelle:**

- İlgili kategori bölümüne yeni makale satırını **en üste** ekle

**`public/llms-full.txt` güncelle:**

- İlgili kategori bölümüne makale URL + açıklama satırını **en üste** ekle (format: `- [Başlık](URL): Kısa açıklama`)

### 5. Sitemap Kontrolü — SKILL: sitemap-priority

> Skill dosyasını oku: `.agents/skills/sitemap-priority.md`

`src/pages/sitemap.xml.tsx` içindeki `HIGH_PRIORITY_SLUGS` Set'ine ekle — eğer makale özellikle önemli/derin ise (kriter: 3+ puan).

### 6. SEO Optimizasyonu

Blog post sayfası `src/pages/blog/[slug].tsx` zaten category-aware keywords kullanıyor.
Frontmatter `description` alanı 150-160 karakter olmalı.

### 7. Validasyon

```bash
bun run type-check     # TypeScript hataları
bun run format         # Prettier ile otomatik format
bun run format:check   # Tüm dosyalar temiz mi?
```

### 8. Commit & Push

```bash
git add src/data/blog/{slug}.mdx src/data/blog/*.mdx public/llms.txt public/llms-full.txt src/pages/sitemap.xml.tsx
git commit -m "feat(blog): add '{başlık}' article

- {kategori} kategorisi
- {konu özeti}
- SEO keywords: {anahtar kelimeler}
- order: 1 atandı, mevcut sıralar kaydırıldı
- llms.txt + llms-full.txt güncellendi"

git push origin main
```

## Checklist

- [ ] MDX frontmatter eksiksiz (8 alan — order dahil)
- [ ] coverImage Unsplash URL çalışıyor
- [ ] Minimum 6 H2 bölüm
- [ ] Her bölümde kod örneği
- [ ] description 150-160 karakter
- [ ] `order: 1` yeni makalede, mevcut sıralar kaydırıldı ← **YENİ**
- [ ] llms.txt güncellendi (kategori en üstüne)
- [ ] llms-full.txt güncellendi (kategori en üstüne)
- [ ] sitemap highPrioritySlugs kontrol edildi
- [ ] type-check temiz
- [ ] format:check temiz
- [ ] main branch'e push edildi

## Notlar

- Blog slug formatı: `{kategori}-{konu-kebab-case}` (örn: `frontend-js-event-loop`)
- Mevcut makalelerle çakışmayı önle: `ls src/data/blog/` kontrol et
- readingTime hesabı: yaklaşık kelime sayısı ÷ 200 (dakika)
- coverImage: Unsplash arama — `https://unsplash.com/s/photos/{topic}` üzerinden uygun fotoğraf ID'si seç
- `order: 99` makaleler arşivdir — shift edilmez, dokunulmaz
