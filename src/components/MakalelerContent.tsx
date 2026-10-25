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
    <div className="min-h-svh px-2 pb-2 md:px-3">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-2">
        {/* Top Board Header + Filter Tiles */}
        <section className="grid grid-cols-12 gap-2">
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:p-8 lg:col-span-5">
            <div>
              <Badge className="mb-4 rounded-sm border-0 bg-primary px-3 py-1 text-xs font-extrabold text-primary-foreground">
                Teknik Makaleler
              </Badge>
              <h1
                className="mb-2 font-extrabold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4.25rem)' }}
              >
                Makalelerim
              </h1>
            </div>
            <p className="text-base leading-relaxed text-muted-foreground">
              Yazılım geliştirme süreçleri, kariyer deneyimlerim ve modern
              teknolojiler üzerine teknik notlarım.
            </p>
          </div>

          <div className="col-span-12 flex flex-col justify-between gap-2 lg:col-span-7">
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md bg-primary p-5 text-primary-foreground">
                <p className="text-3xl font-extrabold leading-none">
                  {posts.length}
                </p>
                <p className="mt-2 text-xs font-bold">Makale</p>
              </div>
              <div className="rounded-md bg-foreground p-5 text-background">
                <p className="text-3xl font-extrabold leading-none text-primary">
                  {categories.length}
                </p>
                <p className="text-background/80 mt-2 text-xs font-bold">
                  Kategori
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between rounded-md bg-card p-5">
              <span className="mb-3 text-xs font-bold text-muted-foreground">
                Kategoriye Göre Filtrele
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => selectCategory(undefined)}
                  className={`rounded-sm px-3.5 py-2 text-xs font-extrabold transition-colors ${
                    categoryFilter === undefined
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-foreground hover:text-background'
                  }`}
                >
                  Tümü ({allPosts.length})
                </button>
                {categories.map(category => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => selectCategory(category)}
                    className={`rounded-sm px-3.5 py-2 text-xs font-extrabold transition-colors ${
                      categoryFilter === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-foreground hover:text-background'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Posts Bento Grid */}
        <main className="min-h-[60svh]">
          {posts.length === 0 ? (
            <div className="rounded-md bg-card py-24 text-center text-muted-foreground">
              <BookOpenIcon className="mx-auto mb-4 h-12 w-12 opacity-30" />
              <p className="text-lg">Bu kategoride henüz makale yok.</p>
            </div>
          ) : (
            <motion.div
              ref={gridRef}
              initial="hidden"
              animate={gridInView ? 'visible' : 'hidden'}
              variants={stagger}
              className="grid gap-2 md:grid-cols-2 lg:grid-cols-3"
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
                        className="col-span-full rounded-md bg-card px-4"
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
        <Card className="group flex h-full flex-col overflow-hidden rounded-md border-0 bg-card transition-colors duration-200 hover:bg-secondary">
          {post.frontmatter.coverImage ? (
            <div className="relative h-52 w-full overflow-hidden bg-secondary">
              <Image
                src={post.frontmatter.coverImage}
                alt={post.frontmatter.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {category && (
                <Badge className="absolute bottom-3 left-3 rounded-sm border-0 bg-primary px-2.5 py-1 text-xs font-extrabold text-primary-foreground">
                  {category}
                </Badge>
              )}
            </div>
          ) : (
            <div className="flex h-36 items-end justify-between bg-foreground p-5 text-background">
              {category && (
                <Badge className="rounded-sm border-0 bg-primary px-2.5 py-1 text-xs font-extrabold text-primary-foreground">
                  {category}
                </Badge>
              )}
              <span className="text-background/65 text-xs font-bold">CMS</span>
            </div>
          )}

          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h2 className="mb-3 text-lg font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary">
                {post.frontmatter.title}
              </h2>
              {post.frontmatter.description && (
                <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                  {post.frontmatter.description}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 text-xs font-semibold text-muted-foreground">
              {post.frontmatter.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5 text-primary" />
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
                  <ClockIcon className="h-3.5 w-3.5 text-primary" />
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
