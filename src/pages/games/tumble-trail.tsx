import { TumbleTrailGameFrame } from '@/components/games/tumble-trail/TumbleTrailGameFrame'
import { Seo } from '@/lib/seo'
import { ArrowLeftIcon } from 'lucide-react'
import Link from 'next/link'

export default function TumbleTrailGamePage() {
  return (
    <>
      <Seo
        rawTitle="Tumble Trail 4x4 Oyunu | Hüseyin DOL"
        description="Tumble Trail 4x4: Flutter Web ile geliştirilmiş 2.5D dağ yolu macerası. Süspansiyonu ayarla, devrilmeden ilerle, garajda aracını geliştir."
        canonical="/games/tumble-trail"
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
                Tumble Trail 4x4
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                Flutter Web Engine. Sağ alttaki
                <span className="font-medium text-foreground"> Tam ekran </span>
                düğmesi veya Esc ile tam ekrandan çıkabilirsiniz.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:ml-auto">
              <Link
                href="/games/tumble-trail/gizlilik-politikasi"
                className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Gizlilik Politikası
              </Link>
              <Link
                href="/games/tumble-trail/destek"
                className="text-sm font-medium text-muted-foreground underline underline-offset-4 hover:text-foreground"
              >
                Destek
              </Link>
            </div>
          </div>

          <TumbleTrailGameFrame />
        </div>
      </div>
    </>
  )
}
