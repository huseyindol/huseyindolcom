import type { BlogFrontmatter, BlogPost } from '@/types/blog'
import { fetcher } from '@/utils/services/fetcher'

export type { BlogFrontmatter, BlogPost }

interface CmsPost {
  id: number
  title: string
  content: string
  slug: string
  status: boolean
  orderIndex: number | null
  description: string | null
  category: string | null
  coverImage: string | null
  publishedAt: string | null
  author: string | null
  readingTime: string | null
  seoInfo: {
    title: string | null
    description: string | null
    keywords: string | null
  } | null
}

interface ApiResponse<T> {
  result: boolean
  message?: string
  data: T
}

async function fetchAllPosts(): Promise<CmsPost[]> {
  // Build-time dayanıklılık: SSG/ISR sırasında backend (Cloudflare arkası) geçici
  // olarak erişilemezse (timeout / challenge HTML'i) build ÖLMEMELİ — boş liste ile
  // statik sayfa üretilir, ISR revalidate (86400) ile sonradan dolar. Vercel build
  // machine'lerinden anlık bloklar build kırılganlığı yaratıyordu (2026-11-17).
  try {
    const json = await fetcher<ApiResponse<CmsPost[]>>('/posts/list/summary', {
      method: 'GET',
      next: { tags: ['cms-posts'], revalidate: 86400 },
    })
    if (!json.result) throw new Error(json.message ?? 'API error')
    return json.data
  } catch (err) {
    console.warn(
      '[blog] posts fetch failed (build/revalidate sırasında) — boş listeyle devam:',
      err instanceof Error ? err.message : err,
    )
    return []
  }
}

async function fetchPostBySlug(slug: string): Promise<CmsPost | null> {
  try {
    const json = await fetcher<ApiResponse<CmsPost>>(`/posts/slug/${slug}`, {
      method: 'GET',
      next: { tags: ['cms-posts', `cms-post-${slug}`], revalidate: 86400 },
    })
    if (!json.result) return null
    return json.data
  } catch {
    return null
  }
}

function toBlogPost(post: CmsPost): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    content: post.content ?? '',
    status: post.status ?? false,
    frontmatter: {
      title: post.title,
      description: post.description ?? null,
      category: post.category ?? null,
      coverImage: post.coverImage ?? null,
      publishedAt: post.publishedAt ?? null,
      author: post.author ?? null,
      readingTime: post.readingTime ?? null,
      order: post.orderIndex ?? 0,
    },
  }
}

export async function getAllCmsPosts(): Promise<BlogPost[]> {
  const posts = await fetchAllPosts()
  return posts
    .filter(p => p.status)
    .map(toBlogPost)
    .sort((a, b) => {
      if (a.frontmatter.order !== b.frontmatter.order)
        return a.frontmatter.order - b.frontmatter.order
      const dateA = a.frontmatter.publishedAt
        ? new Date(a.frontmatter.publishedAt).getTime()
        : 0
      const dateB = b.frontmatter.publishedAt
        ? new Date(b.frontmatter.publishedAt).getTime()
        : 0
      return dateB - dateA
    })
}

export async function getCmsPostBySlug(slug: string): Promise<BlogPost | null> {
  const post = await fetchPostBySlug(slug)
  if (!post) return null
  return toBlogPost(post)
}

export async function getAllCmsCategories(): Promise<string[]> {
  const posts = await getAllCmsPosts()
  const categories = new Set(
    posts.map(p => p.frontmatter.category).filter(Boolean),
  )
  return Array.from(categories) as string[]
}
