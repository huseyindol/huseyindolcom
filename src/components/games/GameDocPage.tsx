import { MdxContent } from '@/components/mdx-content'
import type { GameDoc, GameDocLang } from '@/lib/game-docs'
import { Seo } from '@/lib/seo'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export interface GameDocPageProps {
  doc: GameDoc
  lang: GameDocLang
  /** Bu sayfanın yolu ("/games/plufy/destek"). */
  path: string
  /** Diğer dildeki karşılığı. */
  alternatePath: string
  gameTitle: string
  gamePath: string
  description: string
}

const labels = {
  tr: { back: 'Oyuna dön', other: 'English' },
  en: { back: 'Back to the game', other: 'Türkçe' },
} as const

export function GameDocPage({
  doc,
  lang,
  path,
  alternatePath,
  gameTitle,
  gamePath,
  description,
}: Readonly<GameDocPageProps>) {
  const t = labels[lang]
  return (
    <>
      <Seo
        rawTitle={`${doc.title} | Hüseyin DOL`}
        description={description}
        canonical={path}
      />
      <div className="bg-muted/30 min-h-screen" lang={lang}>
        <div className="container mx-auto max-w-3xl px-4 py-8 md:py-12">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link
              href={gamePath}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              {t.back}: {gameTitle}
            </Link>
            <Link
              href={alternatePath}
              hrefLang={lang === 'tr' ? 'en' : 'tr'}
              className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              {t.other}
            </Link>
          </div>
          <h1 className="mb-6 text-2xl font-extrabold tracking-tight md:text-3xl">
            {doc.title}
          </h1>
          <MdxContent source={doc.source} />
        </div>
      </div>
    </>
  )
}
