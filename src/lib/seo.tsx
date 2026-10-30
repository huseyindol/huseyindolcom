import Head from 'next/head'

/**
 * App Router'daki Metadata API'nin Pages Router karşılığı.
 *
 * `next/head` aynı `key`'e sahip etiketleri tekilleştirir — bu yüzden her etikete
 * sabit bir `key` verilir; sayfa `<Seo>`'su `_app`'teki varsayılanı EZER.
 * Kullanım: her sayfa kendi `<Seo title=... description=... canonical=... />`'unu render eder.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export const SITE_NAME = 'Hüseyin DOL | Portfolio'
export const DEFAULT_TITLE = 'Hüseyin DOL | Software Developer'
export const TITLE_TEMPLATE = (t: string) => `${t} | Hüseyin DOL`

export const DEFAULT_DESCRIPTION =
  '10+ yıllık deneyimimle React, Next.js ve TypeScript ile modern frontend, Java ve Spring Boot ile ölçeklenebilir backend çözümleri geliştiren bir Software Developer. Uçtan uca performanslı web uygulamaları, ekip liderliği ve mentorluk konularında deneyimliyim.'

const OG_DESCRIPTION =
  '10+ yıllık deneyimle React, Next.js, TypeScript (frontend) ve Java, Spring Boot (backend) ile uçtan uca, ölçeklenebilir ve performanslı web uygulamaları geliştiriyorum.'

export const DEFAULT_KEYWORDS = [
  'Hüseyin DOL',
  'huseyindol',
  'huseyin dol',
  'Software Developer',
  'Full Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'React Developer',
  'Next.js Developer',
  'Java Developer',
  'Spring Boot',
  'TypeScript',
  'JavaScript',
  'Java',
  'Web Development',
  'React',
  'Next.js',
  'İstanbul',
  'Türkiye',
  'Yazılım Geliştirici',
]

const DEFAULT_IMAGE = '/assets/logos/og-phoenix-v2.png'

export interface SeoProps {
  /** Sayfa başlığı — şablonla sarılır ("%s | Hüseyin DOL"). Verilmezse varsayılan başlık. */
  title?: string
  /** Başlığı şablona sokmadan aynen kullan (ana sayfa gibi). */
  rawTitle?: string
  description?: string
  /** Site köküne göre yol ("/blog") veya tam URL. */
  canonical?: string
  /** OG/Twitter görseli — göreli yol tam URL'e çevrilir. */
  image?: string
  type?: 'website' | 'article'
  keywords?: string[]
  noIndex?: boolean
  /** Makaleler için ek OG alanları. */
  publishedTime?: string
  authorName?: string
}

const absolute = (path: string) =>
  path.startsWith('http')
    ? path
    : `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`

export function Seo({
  title,
  rawTitle,
  description = DEFAULT_DESCRIPTION,
  canonical,
  image = DEFAULT_IMAGE,
  type = 'website',
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
  publishedTime,
  authorName = 'Hüseyin DOL',
}: SeoProps) {
  const pageTitle = rawTitle ?? (title ? TITLE_TEMPLATE(title) : DEFAULT_TITLE)
  const url = canonical ? absolute(canonical) : SITE_URL
  const imageUrl = absolute(image)
  // OG açıklaması sayfaya özel açıklama verildiyse onu kullanır; yoksa marka metni.
  const ogDescription =
    description === DEFAULT_DESCRIPTION ? OG_DESCRIPTION : description

  return (
    <Head>
      <title key="title">{pageTitle}</title>
      <meta name="description" content={description} key="description" />
      <meta name="keywords" content={keywords.join(', ')} key="keywords" />
      <meta name="author" content={authorName} key="author" />
      <meta name="creator" content="Hüseyin DOL" key="creator" />
      <link rel="canonical" href={url} key="canonical" />

      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" key="robots" />
      ) : (
        <>
          <meta name="robots" content="index, follow" key="robots" />
          <meta
            name="googlebot"
            content="index, follow, max-video-preview:-1, max-image-preview:large, max-snippet:-1"
            key="googlebot"
          />
        </>
      )}

      {/* Open Graph */}
      <meta property="og:type" content={type} key="og:type" />
      <meta property="og:locale" content="tr_TR" key="og:locale" />
      <meta property="og:url" content={url} key="og:url" />
      <meta property="og:site_name" content={SITE_NAME} key="og:site_name" />
      <meta property="og:title" content={pageTitle} key="og:title" />
      <meta
        property="og:description"
        content={ogDescription}
        key="og:description"
      />
      <meta property="og:image" content={imageUrl} key="og:image" />
      <meta
        property="og:image:secure_url"
        content={imageUrl}
        key="og:image:secure_url"
      />
      {imageUrl.endsWith('.png') && (
        <meta
          property="og:image:type"
          content="image/png"
          key="og:image:type"
        />
      )}
      <meta property="og:image:width" content="1200" key="og:image:width" />
      <meta property="og:image:height" content="630" key="og:image:height" />
      <meta
        property="og:image:alt"
        content="Hüseyin DOL — Systems • AI • Cloud • Engineering • Studio"
        key="og:image:alt"
      />
      {publishedTime && (
        <meta
          property="article:published_time"
          content={publishedTime}
          key="article:published_time"
        />
      )}

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
        key="twitter:card"
      />
      <meta name="twitter:title" content={pageTitle} key="twitter:title" />
      <meta
        name="twitter:description"
        content={ogDescription}
        key="twitter:description"
      />
      <meta name="twitter:image" content={imageUrl} key="twitter:image" />
      <meta
        name="twitter:image:alt"
        content="Hüseyin DOL — Systems • AI • Cloud • Engineering • Studio"
        key="twitter:image:alt"
      />

      {/* AI crawler'lar için llms.txt discovery (Metadata API alternates.types karşılığı) */}
      <link
        rel="alternate"
        type="text/plain"
        href={`${SITE_URL}/llms.txt`}
        key="alternate:llms"
      />
    </Head>
  )
}

export default Seo
