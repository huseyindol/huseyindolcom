import { useUrlQueryParam } from '@/hooks/useUrlQueryParam'
import AdSenseAd from '@/components/AdSenseAd'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { BlogPost } from '@/types/blog'
import { motion, useInView } from 'framer-motion'
import { BookOpenIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

const AD_SLOTS = [
  '7448731904',
  '4630996875',
  '9691751868',
  '3401675681',
  '3126343511',
]
const AD_LAYOUT_KEY = '-6t+ed+2i-1n-4w'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

interface MakalelerContentProps {
  posts: BlogPost[]
  categories: string[]
}

function syncFilterUrl(url: string) {
  try {
    window.history.replaceState(window.history.state, '', url)
  } catch {
    // URL güncellenemezse filtre yine çalışır
  }
}

export default function MakalelerContent({
  posts: allPosts,
  categories,
}: MakalelerContentProps) {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  const urlCategory = useUrlQueryParam('category')
  const [selected, setSelected] = useState<string | undefined | null>(null)
  const categoryFilter = selected === null ? urlCategory : selected

  const selectCategory = (category: string | undefined) => {
    setSelected(category)
    syncFilterUrl(
      category
        ? `/makaleler?category=${encodeURIComponent(category)}`
        : '/makaleler',
    )
  }

  const posts = categoryFilter
    ? allPosts.filter(post => post.frontmatter.category === categoryFilter)
    : allPosts

  return (
    <div className="min-h-svh px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {/* Radial Spotlight Glass Header + Category Filter Pills */}
        <section className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[620px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-400/15 to-emerald-500/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <Badge className="mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                Teknik Makaleler
              </Badge>
              <h1
                className="mb-2 font-extrabold tracking-tight text-slate-900 dark:text-white"
                style={{ fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4rem)' }}
              >
                Makalelerim
              </h1>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300">
                Yazılım geliştirme süreçleri, kariyer deneyimlerim ve modern
                teknolojiler üzerine teknik notlarım.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-7">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-3xl font-extrabold leading-none text-transparent">
                    {posts.length}
                  </p>
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    Makale
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-3xl font-extrabold leading-none text-transparent">
                    {categories.length}
                  </p>
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    Kategori
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-950/60">
                <button
                  type="button"
                  onClick={() => selectCategory(undefined)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                    categoryFilter === undefined
                      ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 shadow-[0_0_16px_rgba(6,182,212,0.2)] dark:text-cyan-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  Tümü ({allPosts.length})
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => selectCategory(category)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                      categoryFilter === category
                        ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 shadow-[0_0_16px_rgba(6,182,212,0.2)] dark:text-cyan-300'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Specular Glass Grid */}
        <main className="min-h-[60svh]">
          {posts.length === 0 ? (
            <div className="glass-panel py-24 text-center text-slate-500 dark:text-slate-400">
              <BookOpenIcon className="mx-auto mb-4 h-12 w-12 opacity-30" />
              <p className="text-lg">Bu kategoride henüz makale yok.</p>
            </div>
          ) : (
            <motion.div
              ref={gridRef}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              variants={stagger}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {(() => {
                const adPositions = AD_SLOTS.map((_, k) =>
                  Math.floor((posts.length * (k + 1)) / (AD_SLOTS.length + 1)),
                )
                const items: React.ReactNode[] = []
                const showListAds = categoryFilter === undefined
                posts.forEach((post, i) => {
                  items.push(<PostCard key={post.slug} post={post} />)
                  const adIdx = adPositions.indexOf(i + 1)
                  if (showListAds && adIdx !== -1) {
                    items.push(
                      <div
                        key={`ad-${adIdx}`}
                        className="glass-panel col-span-full px-4"
                      >
                        <AdSenseAd
                          slot={AD_SLOTS[adIdx]}
                          layoutKey={AD_LAYOUT_KEY}
                        />
                      </div>,
                    )
                  }
                })
                return items
              })()}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  )
}

function PostCard({ post }: { post: BlogPost }) {
  const category = post.frontmatter.category ?? ''

  return (
    <motion.div variants={fadeInUp}>
      <Link href={`/makaleler/${post.slug}`} className="block h-full">
        <Card className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 dark:border-white/[0.08] dark:bg-white/[0.03]">
          {post.frontmatter.coverImage ? (
            <div className="relative h-52 w-full overflow-hidden bg-slate-900">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
              {category && (
                <Badge className="absolute bottom-3 left-3 rounded-full border border-cyan-400/30 bg-slate-950/70 px-3 py-1 text-xs font-bold text-cyan-300 backdrop-blur-md">
                  {category}
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex h-36 items-end justify-between bg-gradient-to-br from-cyan-500/20 via-slate-900/40 to-emerald-500/20 p-5">
              {category && (
                <Badge className="rounded-full border border-cyan-500/30 bg-cyan-500/15 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                  {category}
                </Badge>
              )}
              <span className="text-xs font-bold text-cyan-500 dark:text-cyan-300">
                CMS
              </span>
            </div>
          )}

          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h2 className="mb-3 text-lg font-extrabold leading-snug text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">
                {post.frontmatter.title}
              </h2>
              {post.frontmatter.description && (
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                  {post.frontmatter.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 border-t border-slate-200/70 pt-4 text-xs font-semibold text-slate-500 dark:border-white/[0.08] dark:text-slate-400">
              {post.frontmatter.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-cyan-500" />
                  <time dateTime={post.frontmatter.publishedAt}>
                    {new Date(post.frontmatter.publishedAt).toLocaleDateString(
                      'tr-TR',
                      { month: 'short', day: 'numeric', year: 'numeric' },
                    )}
                  </time>
                </span>
              )}
              {post.frontmatter.readingTime && (
                <span className="flex items-center gap-1.5">
                  <ClockIcon className="h-3.5 w-3.5 text-emerald-500" />
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
