import { getAllPosts } from '@/lib/mdx'
import type { GetServerSideProps } from 'next'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.huseyindol.com'

interface UrlEntry {
  loc: string
  lastmod: string
  changefreq: string
  priority: number
}

const HIGH_PRIORITY_SLUGS = new Set([
  'backend-multitenancy-migration',
  'backend-jwt-jwe-security',
  'backend-java-elly',
  'devops-kubernetes-master',
  'devops-docker-postgresql',
  'devops-postgresql',
  'frontend-js-event-loop',
  'elly-multitenant-bolum-1',
  'elly-multitenant-bolum-2',
  'elly-multitenant-bolum-3',
])

async function buildEntries(): Promise<UrlEntry[]> {
  const now = new Date().toISOString()

  const staticRoutes: UrlEntry[] = [
    { loc: BASE_URL, lastmod: now, changefreq: 'weekly', priority: 1 },
    {
      loc: `${BASE_URL}/about`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/experience`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/skills`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.7,
    },
    {
      loc: `${BASE_URL}/projects`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    },
    {
      loc: `${BASE_URL}/blog`,
      lastmod: now,
      changefreq: 'daily',
      priority: 0.9,
    },
    {
      loc: `${BASE_URL}/games/arcade`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.65,
    },
    {
      loc: `${BASE_URL}/games/matching`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.65,
    },
    {
      loc: `${BASE_URL}/projects/elly`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85,
    },
    {
      loc: `${BASE_URL}/projects/vuln-guardian`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.85,
    },
    ...[
      'elly-architecture',
      'elly-video',
      'elly-sunum',
      'elly-presentation',
    ].map(slug => ({
      loc: `${BASE_URL}/projects/${slug}`,
      lastmod: now,
      changefreq: 'monthly',
      priority: 0.8,
    })),
  ]

  const posts = await getAllPosts()
  const blogRoutes: UrlEntry[] = posts.map(post => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: post.frontmatter.publishedAt
      ? new Date(post.frontmatter.publishedAt).toISOString()
      : now,
    changefreq: 'monthly',
    priority: HIGH_PRIORITY_SLUGS.has(post.slug) ? 0.9 : 0.8,
  }))

  return [...staticRoutes, ...blogRoutes]
}

function toXml(entries: UrlEntry[]): string {
  const urls = entries
    .map(
      e =>
        `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${e.lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const xml = toXml(await buildEntries())
  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400',
  )
  res.write(xml)
  res.end()
  return { props: {} }
}

export default function Sitemap() {
  return null
}
