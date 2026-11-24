import { PlufyGameFrame } from '@/components/games/plufy/PlufyGameFrame'
import { Seo } from '@/lib/seo'
import { ArrowLeftIcon } from 'lucide-react'
import Head from 'next/head'
import Link from 'next/link'
import { FaApple as Apple } from 'react-icons/fa'

const APP_STORE_URL = 'https://apps.apple.com/app/id6831783212'

export default function PlufyGamePage() {
  return (
    <>
      <Seo
        rawTitle="Plufy'nin Dünyası Oyunu | Hüseyin DOL"
        description="Plufy'nin Dünyası: iPhone (App Store) ve Flutter Web demosunda oynanabilen etkileşimli hikâye kitabı oyunu. İlk 3 sayfayı tarayıcıda oyna."
        canonical="/games/plufy"
      />
      <Head>
        <meta
          name="apple-itunes-app"
          content="app-id=6831783212"
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
                Plufy&apos;nin Dünyası
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                iPhone için App Store’da yayında; aşağıda ilk 3 sayfayı
                tarayıcıda deneyebilirsiniz. Sağ alttaki
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
