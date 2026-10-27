import { useUrlQueryParam } from '@/hooks/useUrlQueryParam'
import AdSenseAd from '@/components/AdSenseAd'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { BlogPost } from '@/lib/mdx'
import { motion, useInView } from 'framer-motion'
import { BookOpenIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

const BLOG_LIST_AD_SLOTS = [
  '7448731904',
  '4630996875',
  '9691751868',
  '3401675681',
  '3126343511',
]
const BLOG_LIST_LAYOUT_KEY = '-6t+ed+2i-1n-4w'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardCategoryColors: Record<string, string> = {
  Frontend: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Backend:
    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  DevOps:
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  AI: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300',
  Mobile: 'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
}

interface BlogContentProps {
  posts: BlogPost[]
  categories: string[]
}

/**
 * Filtre seçimini URL'e yansıtır — ROUTER KULLANMADAN.
 *
 * Router'a bağlanmak taşımada sorun çıkardı: App Router'ın useRouter'ı Pages
 * Router'da mount değil, çağrısı handler içinde patlayınca React aynı handler'daki
 * setState'i de düşürüyor ve filtre hiç çalışmıyordu. Filtrelemenin URL'e ihtiyacı
 * yok; adres yalnız paylaşılabilirlik için güncelleniyor.
 */
function syncFilterUrl(url: string) {
  try {
    window.history.replaceState(window.history.state, '', url)
  } catch {
    // URL güncellenemezse filtre yine çalışır — sessiz geç.
  }
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  // Kategori filtresi tamamen client-side (server searchParams okunmuyor → sayfa static).
  // Tüm postlar prerender edilir; seçim sadece görüneni süzer, URL'i de paylaşılabilir tutar.
  // İlk yük: adresteki ?category= uygulanır (paylaşılan link filtreli açılsın).
  // Sonrası: kullanıcı seçimi (selected) URL'i ezer. null = henüz seçim yapılmadı.
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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative -mt-20 overflow-hidden border-b border-white/10 bg-zinc-950 py-32 pt-32 text-zinc-100 md:py-40 md:pt-40">
        <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-200">
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
            <div className="mt-10 flex justify-center gap-8 text-sm text-slate-400">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{posts.length}</p>
                <p>Makale</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">
                  {categories.length}
                </p>
                <p>Kategori</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-background/80 sticky top-[65px] z-40 border-b border-border backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="scrollbar-hide flex items-center gap-2 overflow-x-auto py-4">
            <button
              type="button"
              onClick={() => selectCategory(undefined)}
              className={`inline-flex shrink-0 cursor-pointer items-center rounded-full border px-4 py-1.5 text-sm font-medium transition-all ${
                categoryFilter === undefined
                  ? 'border-primary bg-primary text-primary-foreground'
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
                    ? 'border-primary bg-primary text-primary-foreground'
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
      <main className="bg-muted/20 min-h-[60vh] py-16">
        <div className="container mx-auto px-6">
          {visiblePosts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center text-muted-foreground"
            >
              <BookOpenIcon className="mx-auto mb-4 h-12 w-12 opacity-30" />
              <p className="text-lg">Bu kategoride henüz makale yok.</p>
            </motion.div>
          ) : (
            <motion.div
              ref={gridRef}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              variants={stagger}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
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
                  items.push(<PostCard key={post.slug} post={post} />)
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
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  const category = post.frontmatter.category
  const badgeColor =
    cardCategoryColors[category] ??
    'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'

  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/blog/${post.slug}`}>
        <Card className="group flex h-full flex-col overflow-hidden border-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
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
    </motion.div>
  )
}
