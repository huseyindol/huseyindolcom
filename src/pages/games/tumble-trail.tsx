import { TumbleTrailGameFrame } from '@/components/games/tumble-trail/TumbleTrailGameFrame'
import { Seo } from '@/lib/seo'
import { ArrowLeftIcon } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { FaApple as Apple } from 'react-icons/fa'

const APP_STORE_URL =
  'https://apps.apple.com/tr/app/tumble-trail-4x4/id6821119563'

export default function TumbleTrailGamePage() {
  return (
    <>
      <Seo
        rawTitle="Tumble Trail 4x4 Oyunu | Hüseyin DOL"
        description="Tumble Trail 4x4: iPhone, iPad (App Store) ve Flutter Web üzerinde oynanabilen 2.5D 4x4 arazi macerası. Süspansiyonu ayarla, dağ ve şehir engellerini aş, garajda aracını geliştir."
        canonical="/games/tumble-trail"
      />
      <Head>
        <meta
          name="apple-itunes-app"
          content="app-id=6821119563"
          key="apple-itunes-app"
        />
      </Head>
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
                iPhone &amp; iPad için App Store’da ve aşağıda tarayıcıda
                oynanabilir. Sağ alttaki
                <span className="font-medium text-foreground"> Tam ekran </span>
                düğmesi veya Esc ile tam ekrandan çıkabilirsiniz.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:ml-auto">
              <Link
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:scale-105 hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                <Apple className="h-4 w-4" />
                <span>App Store’da İndir</span>
              </Link>
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
