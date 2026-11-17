import { HtmlContent } from '@/components/html-content'
import { Post } from '@/types/BaseResponse'

export default function APost(props: Post) {
  const { title, content, slug, seoInfo } = props

  return (
    <article className="group relative mb-6 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-6 backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:border-violet-500/30 hover:shadow-2xl">
      <header className="mb-4">
        <h2 className="mb-3 text-2xl font-bold leading-tight">
          <a
            href={`/posts/${slug}`}
            className="bg-gradient-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent transition-opacity hover:opacity-80"
          >
            {title}
          </a>
        </h2>
        {seoInfo?.description && (
          <p className="text-base leading-relaxed text-slate-400">
            {seoInfo.description}
          </p>
        )}
      </header>

      {/* CMS içeriği DOMPurify'den geçer (stored-XSS kapatma, C4) */}
      {content && (
        <div className="relative mb-5 max-h-[120px] overflow-hidden text-sm leading-7 text-slate-300">
          <HtmlContent source={content} />
        </div>
      )}

      <footer className="flex justify-end">
        <a
          href={`/posts/${slug}`}
          className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-medium text-white no-underline transition-all duration-300 hover:translate-x-1 hover:shadow-lg hover:shadow-violet-500/40"
        >
          Devamını Oku
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </footer>
    </article>
  )
}
