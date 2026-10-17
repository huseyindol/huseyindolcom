import AdSenseAd from '@/components/AdSenseAd'
import { HtmlContent } from '@/components/html-content'
import { ArticleJsonLd } from '@/components/JsonLd'
import { Badge } from '@/components/ui/badge'
import { getAllCmsPosts, getCmsPostBySlug } from '@/lib/blog'
import type { BlogPost } from '@/types/blog'
import { Seo, SITE_URL } from '@/lib/seo'
import { ArrowLeftIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'

const cardCategoryColors: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Backend:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  DevOps:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  AI: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Mobile: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
}

interface MakaleDetayProps {
  post: BlogPost
  keywords: string[]
}

export default function MakaleDetayPage({
  post,
  keywords,
}: Readonly<MakaleDetayProps>) {
  const siteUrl = SITE_URL

  const categoryColor =
    (post.frontmatter.category
      ? cardCategoryColors[post.frontmatter.category]
      : undefined) ??
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

  return (
    <>
      <Seo
        rawTitle={`${post.frontmatter.title} | Hüseyin DOL`}
        description={post.frontmatter.description ?? undefined}
        canonical={`/makaleler/${post.slug}`}
        image={post.frontmatter.coverImage ?? undefined}
        type="article"
        keywords={keywords}
        publishedTime={post.frontmatter.publishedAt ?? undefined}
        authorName={post.frontmatter.author ?? undefined}
      />
      <div className="min-h-screen bg-background">
        <ArticleJsonLd
          title={post.frontmatter.title}
          description={post.frontmatter.description ?? post.frontmatter.title}
          url={`${siteUrl}/makaleler/${post.slug}`}
          imageUrl={post.frontmatter.coverImage ?? undefined}
          datePublished={post.frontmatter.publishedAt ?? ''}
          dateModified={post.frontmatter.publishedAt ?? ''}
          authorName={post.frontmatter.author ?? 'Hüseyin DOL'}
          articleSection={post.frontmatter.category ?? undefined}
          wordCount={post.content.split(/\s+/).length}
        />

        {/* Cover image hero */}
        {post.frontmatter.coverImage ? (
          <div className="relative h-72 w-full overflow-hidden md:h-96">
            <Image
              src={post.frontmatter.coverImage}
              alt={post.frontmatter.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
              fetchPriority="high"
            />
            <div className="via-background/40 absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          </div>
        ) : (
          <div className="h-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
        )}

        <div className="container mx-auto px-6 pb-24">
          <article className="mx-auto max-w-3xl">
            {/* Back link */}
            <div className="mb-8 pt-8">
              <Link
                href="/makaleler"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Makalelere Dön
              </Link>
            </div>

            {/* Article header */}
            <header className="mb-12 space-y-5">
              {post.frontmatter.category && (
                <Badge
                  className={`border-0 text-xs font-semibold ${categoryColor}`}
                >
                  {post.frontmatter.category}
                </Badge>
              )}

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
                {post.frontmatter.title}
              </h1>

              {post.frontmatter.description && (
                <p className="text-lg text-muted-foreground">
                  {post.frontmatter.description}
                </p>
              )}

              <div className="flex flex-wrap items-center gap-5 border-t border-border pt-5 text-sm text-muted-foreground">
                {post.frontmatter.author && (
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-border">
                      <Image
                        src="https://github.com/huseyindol.png"
                        alt="Hüseyin DOL"
                        width={36}
                        height={36}
                      />
                    </div>
                    <span className="font-semibold text-foreground">
                      {post.frontmatter.author}
                    </span>
                  </div>
                )}

                {post.frontmatter.publishedAt && (
                  <span className="flex items-center gap-1.5">
                    <CalendarIcon className="h-4 w-4" />
                    <time dateTime={post.frontmatter.publishedAt}>
                      {new Date(
                        post.frontmatter.publishedAt,
                      ).toLocaleDateString('tr-TR', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </time>
                  </span>
                )}

                {post.frontmatter.readingTime && (
                  <span className="flex items-center gap-1.5">
                    <ClockIcon className="h-4 w-4" />
                    {post.frontmatter.readingTime} dk okuma
                  </span>
                )}
              </div>
            </header>

            {/* Ad — makale başlangıcı */}
            <AdSenseAd slot="1350227419" />

            {/* HTML content (CMS WYSIWYG output) */}
            <HtmlContent source={post.content} />

            {/* Ad — makale sonu */}
            <AdSenseAd slot="3777093516" />
          </article>
        </div>
      </div>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = await getAllCmsPosts()
    return {
      paths: posts.map(post => ({ params: { slug: post.slug } })),
      // CMS'e yeni makale eklenirse ilk istekte üretilir (build gerekmez).
      fallback: 'blocking',
    }
  } catch {
    // CMS build anında erişilemezse build'i düşürme; sayfalar ilk istekte üretilir.
    return { paths: [], fallback: 'blocking' }
  }
}

export const getStaticProps: GetStaticProps<MakaleDetayProps> = async ({
  params,
}) => {
  const post = await getCmsPostBySlug(params?.slug as string)

  if (!post) {
    return { notFound: true, revalidate: 60 }
  }

  const categoryKeywords: Record<string, string[]> = {
    Backend: [
      'Spring Boot',
      'Java',
      'RBAC',
      'Redis',
      'RabbitMQ',
      'JWT',
      'PostgreSQL',
      'Multitenancy',
      'Spring Security',
      'OAuth2',
      'JPA',
      'Hibernate',
      'Zipkin',
      'Actuator',
    ],
    DevOps: [
      'Kubernetes',
      'Docker',
      'PostgreSQL',
      'CI/CD',
      'GitHub Actions',
      'Helm',
      'k3s',
      'Traefik',
      'Prometheus',
      'Grafana',
      'Redis',
      'RabbitMQ',
      'StatefulSet',
      'HPA',
    ],
    Frontend: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'SEO',
      'Performance',
      'Pages Router',
      'SSG',
      'ISR',
    ],
    AI: [
      'MCP',
      'Model Context Protocol',
      'Claude',
      'LLM',
      'AI Agents',
      'Anthropic',
      'Prompt Engineering',
      'ChatGPT',
    ],
    Mobile: [
      'React Native',
      'Expo',
      'Mobile Development',
      'iOS',
      'Android',
      'Reanimated',
      'Navigation',
    ],
  }

  const baseKeywords = [
    'Hüseyin DOL',
    'huseyindol',
    'Yazılım',
    'Teknoloji',
    'Makale',
  ]
  const keywords = [
    ...(post.frontmatter.category
      ? (categoryKeywords[post.frontmatter.category] ?? [])
      : []),
    ...baseKeywords,
  ]

  return { props: { post, keywords }, revalidate: 86400 }
}
