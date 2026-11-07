import { PlufyGameFrame } from '@/components/games/plufy/PlufyGameFrame'
import { Seo } from '@/lib/seo'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function PlufyGamePage() {
  return (
    <>
      <Seo
        rawTitle="Plufy'nin Dünyası Oyunu | Hüseyin DOL"
        description="Flutter ve Flame ile geliştirilmiş Plufy'nin Dünyası hikâye kitabı oyununun web demosu. İlk 3 sayfayı tarayıcıda oyna."
        canonical="/games/plufy"
      />
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto max-w-5xl px-4 py-8 md:py-12">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link
                href="/projects#flutter-games"
                className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Projeler
              </Link>
              <h1 className="text-2xl font-extrabold tracking-tight md:text-3xl">
                Plufy&apos;nin Dünyası
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Flutter Web demo: ilk 3 sayfa. Tam oyun yakında App
                Store&apos;da. Sağ alttaki
                <span className="font-medium text-foreground"> Tam ekran </span>
                düğmesi veya Esc ile tam ekrandan çıkabilirsiniz.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:ml-auto">
              <Link
                href="/games/plufy/gizlilik-politikasi"
                className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/games/plufy/destek"
                className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Destek
              </Link>
            </div>
          </div>

          <PlufyGameFrame />
        </div>
      </div>
    </>
  )
}
