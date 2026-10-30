const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

export function PersonJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Hüseyin DOL',
    alternateName: 'huseyindol',
    url: SITE_URL,
    jobTitle: 'Software Developer',
    image: `${SITE_URL}/assets/logos/icon-512-v1.png`,
    email: 'huseyindol@gmail.com',
    identifier: 'huseyindol',
    sameAs: [
      'https://github.com/huseyindol',
      'https://www.linkedin.com/in/huseyindol/',
    ],
    knowsAbout: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Frontend Development',
      'Backend Development',
      'Full Stack Development',
      'Web Development',
      'Redux',
      'Node.js',
      'Java',
      'Spring Boot',
      'Spring Security',
      'OAuth2',
      'JWT',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'Docker',
      'Kubernetes',
      'CI/CD',
      'GitHub Actions',
      'Prometheus',
      'Grafana',
      'React Native',
      'MCP',
      'Model Context Protocol',
      'Tailwind CSS',
      'Framer Motion',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export interface ArticleJsonLdProps {
  title: string
  description: string
  url: string
  imageUrl?: string
  datePublished: string
  dateModified?: string
  authorName: string
  keywords?: string[]
  articleSection?: string
  wordCount?: number
}

export function ArticleJsonLd({
  title,
  description,
  url,
  imageUrl,
  datePublished,
  dateModified,
  authorName,
  keywords,
  articleSection,
  wordCount,
}: Readonly<ArticleJsonLdProps>) {
  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description,
    image: imageUrl ? [imageUrl] : [],
    datePublished: datePublished,
    dateModified: dateModified ?? datePublished,
    author: {
      '@type': 'Person',
      name: authorName,
      url: SITE_URL,
      identifier: 'huseyindol',
      sameAs: [
        'https://github.com/huseyindol',
        'https://www.linkedin.com/in/huseyindol/',
      ],
    },
    publisher: {
      '@type': 'Organization',
      name: 'Hüseyin DOL',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logos/icon-512-v1.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    inLanguage: 'tr-TR',
  }

  if (keywords && keywords.length > 0) {
    schema.keywords = keywords.join(', ')
  }
  if (articleSection) {
    schema.articleSection = articleSection
  }
  if (wordCount && wordCount > 0) {
    schema.wordCount = wordCount
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
