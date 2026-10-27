import AdSenseAd from '@/components/AdSenseAd'
import {
  KineticScrollBanner,
  KineticScrollItem,
  type KineticTrackItem,
} from '@/components/KineticScrollBanner'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useUrlQueryParam } from '@/hooks/useUrlQueryParam'
import type { BlogPost } from '@/lib/mdx'
import { BookOpenIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const BLOG_LIST_AD_SLOTS = [
  '7448731904',
  '4630996875',
  '9691751868',
  '3401675681',
  '3126343511',
]
const BLOG_LIST_LAYOUT_KEY = '-6t+ed+2i-1n-4w'

const cardCategoryColors: Record<string, string> = {
  Frontend: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  Backend:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  DevOps: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
  AI: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
  Mobile: 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
}

const blogKineticTracks: KineticTrackItem[] = [
  {
    id: 'blg-fe',
    dir: -1,
    speed: 1.4,
    baseOffset: -50,
    tag: 'FRONTEND ARCHITECTURE',
    primary: 'REACT 19 · NEXT.JS 16 · SSR & ISR',
    secondary: 'CORE WEB VITALS · STATE MANAGEMENT',
  },
  {
    id: 'blg-be',
    dir: 1,
    speed: 1.65,
    baseOffset: 75,
    tag: 'DISTRIBUTED BACKEND',
    primary: 'JAVA 21 · SPRING BOOT 3.5 · MICROSERVICES',
    secondary: 'MULTI-TENANCY · REDIS · RABBITMQ',
    accent: true,
  },
  {
    id: 'blg-ops',
    dir: -1,
    speed: 1.15,
    baseOffset: -30,
    scaleEffect: true,
    tag: 'CLOUD & DEVOPS',
    primary: 'KUBERNETES · DOCKER · CI/CD PIPELINES',
    secondary: 'HIGH AVAILABILITY · OBSERVABILITY',
  },
  {
    id: 'blg-ai',
    dir: 1,
    speed: 1.8,
    baseOffset: 90,
    tag: 'AI & MODERN WEB',
    primary: 'LLM AGENTS · MCP · PERFORMANCE ENGINEERING',
    secondary: 'CLEAN CODE · SECURITY · SYSTEM DESIGN',
    accent: true,
  },
]

interface BlogContentProps {
  posts: BlogPost[]
  categories: string[]
}

function syncFilterUrl(url: string) {
  try {
    window.history.replaceState(window.history.state, '', url)
  } catch {
    // URL güncellenemezse filtre yine çalışır — sessiz geç.
  }
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
  const urlCategory = useUrlQueryParam('category')
  const [selected, setSelected] = useState<string | undefined | null>(null)
  const categoryFilter = selected === null ? urlCategory : selected

  const selectCategory = (category: string | undefined) => {
    setSelected(category)
    syncFilterUrl(
      category ? `/blog?category=${encodeURIComponent(category)}` : '/blog',
    )
  }

  const visiblePosts = categoryFilter
    ? posts.filter(post => post.frontmatter.category === categoryFilter)
    : posts

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="brand-hero-surface relative -mt-20 overflow-hidden border-b border-white/10 py-32 pt-32 text-zinc-100 md:py-40 md:pt-40">
        <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="brand-glow-orb pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="brand-badge mb-6 border px-4 py-1.5 text-sm font-medium">
              Teknik Makaleler
            </Badge>
            <h1 className="mb-5 text-4xl font-black tracking-tight md:text-6xl">
              Makalelerim
            </h1>
            <p className="text-lg text-zinc-400 md:text-xl">
              Yazılım geliştirme süreçleri, kariyer deneyimlerim ve modern
              teknolojiler üzerine teknik notlarım.
            </p>

            {/* Stats */}
            <div className="mt-10 flex justify-center gap-8 text-sm text-zinc-400">
              <div className="text-center">
                <p className="brand-text-accent text-2xl font-black">
                  {posts.length}
                </p>
                <p>Makale</p>
              </div>
              <div className="text-center">
                <p className="brand-text-accent text-2xl font-black">
                  {categories.length}
                </p>
                <p>Kategori</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-directional Apple kinetic stream on Blog page */}
      <KineticScrollBanner
        kicker="01 / MÜHENDİSLİK NOTLARI"
        title="Derinlemesine mimari ve performans yazıları"
        badge={`${posts.length} MAKALE · ${categories.length} KATEGORİ`}
        tracks={blogKineticTracks}
        ariaLabel="Makaleler Kinetik Akışı"
      />

      {/* Category Filter */}
      <div className="bg-background/80 sticky top-[65px] z-40 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-4">
            <button
              type="button"
              onClick={() => selectCategory(undefined)}
              className={`inline-flex shrink-0 cursor-pointer items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                categoryFilter === undefined
                  ? 'brand-pill-btn border-transparent font-bold'
                  : 'border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
              }`}
            >
              Tümü
            </button>
            {categories.map(category => (
              <button
                key={category}
                type="button"
                onClick={() => selectCategory(category)}
                className={`inline-flex shrink-0 cursor-pointer items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                  categoryFilter === category
                    ? 'brand-pill-btn border-transparent font-bold'
                    : 'border-border bg-muted text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts grid */}
      <main className="bg-muted/20 min-h-[60vh] overflow-hidden py-16">
        <div className="container mx-auto px-6">
          {visiblePosts.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
              <BookOpenIcon className="mx-auto mb-4 h-12 w-12 opacity-30" />
              <p className="text-lg">Bu kategoride henüz makale yok.</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(() => {
                const adPositions = BLOG_LIST_AD_SLOTS.map((_, k) =>
                  Math.floor(
                    (visiblePosts.length * (k + 1)) /
                      (BLOG_LIST_AD_SLOTS.length + 1),
                  ),
                )
                const items: React.ReactNode[] = []
                const showListAds = categoryFilter === undefined
                visiblePosts.forEach((post, i) => {
                  items.push(
                    <PostCard
                      key={post.slug}
                      post={post}
                      side={i % 2 === 0 ? 'left' : 'right'}
                    />,
                  )
                  const adIdx = adPositions.indexOf(i + 1)
                  if (showListAds && adIdx !== -1) {
                    items.push(
                      <div key={`ad-${adIdx}`} className="col-span-full">
                        <AdSenseAd
                          slot={BLOG_LIST_AD_SLOTS[adIdx]}
                          layoutKey={BLOG_LIST_LAYOUT_KEY}
                        />
                      </div>,
                    )
                  }
                })
                return items
              })()}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function PostCard({ post, side }: { post: BlogPost; side: 'left' | 'right' }) {
  const category = post.frontmatter.category
  const badgeColor =
    cardCategoryColors[category] ??
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

  return (
    <KineticScrollItem side={side} intensity={0.85} className="h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <Card className="border-border/60 group flex h-full flex-col overflow-hidden border shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          {post.frontmatter.coverImage && (
            <div className="relative h-52 w-full overflow-hidden">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge
                className={`absolute bottom-3 left-3 border-0 text-xs font-semibold ${badgeColor}`}
              >
                {category}
              </Badge>
            </div>
          )}

          {!post.frontmatter.coverImage && (
            <div className="to-muted/50 flex h-52 items-center justify-center bg-gradient-to-br from-muted">
              <Badge className={`border-0 text-xs font-semibold ${badgeColor}`}>
                {category}
              </Badge>
            </div>
          )}

          <div className="flex flex-1 flex-col p-6">
            <h2 className="mb-3 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary">
              {post.frontmatter.title}
            </h2>
            <p className="mb-6 line-clamp-3 flex-1 text-sm text-muted-foreground">
              {post.frontmatter.description}
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarIcon className="h-3.5 w-3.5" />
                <time dateTime={post.frontmatter.publishedAt}>
                  {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                    'tr-TR',
                    { month: 'short', day: 'numeric', year: 'numeric' },
                  )}
                </time>
              </span>
              {post.frontmatter.readingTime && (
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-3.5 w-3.5" />
                  {post.frontmatter.readingTime} dk
                </span>
              )}
            </div>
          </div>
        </Card>
      </Link>
    </KineticScrollItem>
  )
}
