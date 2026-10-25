import { ClarityAnalytics } from '@/components/ClarityAnalytics'
import Datalayer from '@/components/Datalayer'
import { PersonJsonLd } from '@/components/JsonLd'
import ScrollToTop from '@/components/ScrollToTopButton'
import { SessionRefresher } from '@/components/SessionRefresher'
import SiteLayout from '@/components/SiteLayout'
import { WebVitals } from '@/components/WebVitals'
import { geistMono, geistSans } from '@/lib/fonts'
import { Seo } from '@/lib/seo'
import Providers from '@/providers/Providers'
import '@/styles/globals.css'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import NextTopLoader from 'nextjs-toploader'
import type { ReactElement, ReactNode } from 'react'

/**
 * Sayfalar varsayılan olarak SiteLayout (Header + Footer) ile sarılır.
 * Farklı bir kabuk isteyen sayfa `Page.getLayout` tanımlar; `null` dönerse çıplak render.
 */
export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    ((page: ReactElement) => <SiteLayout>{page}</SiteLayout>)

  return (
    <>
      {/*
        next/font CSS değişkenlerini :root'a bağla — globals.css'teki
        `body { @apply font-sans }` bunu okuyor. styled-jsx yerine düz <style>
        (proje eslint'i react/no-unknown-property ile jsx/global prop'unu yasaklıyor).
      */}
      <style
        dangerouslySetInnerHTML={{
          __html: `:root{--font-geist-sans:${geistSans.style.fontFamily};--font-geist-mono:${geistMono.style.fontFamily};}`,
        }}
      />

      {/* Varsayılan meta seti — sayfalar kendi <Seo> ile aynı key'leri ezer */}
      <Seo />

      <GoogleAnalytics gaId="G-ETR2NBJH5V" />
      <ClarityAnalytics />
      <NextTopLoader
        color="#6366f1"
        height={3}
        showSpinner={false}
        easing="ease"
        speed={200}
      />

      <PersonJsonLd />
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem={true}
        themes={['light', 'dark']}
        disableTransitionOnChange
      >
        <Providers cookiesData={{}}>
          <WebVitals />
          <Datalayer />
          <SessionRefresher />
          {getLayout(<Component {...pageProps} />)}
          <ScrollToTop />
          <Analytics />
          <SpeedInsights />
        </Providers>
      </ThemeProvider>
    </>
  )
}
