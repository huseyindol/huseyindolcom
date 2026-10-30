import { Head, Html, Main, NextScript } from 'next/document'

/**
 * App Router'daki root `layout.tsx`'in `<html>/<head>/<body>` iskeleti.
 *
 * NOT: Sayfaya özel meta/title `next/head` (Seo bileşeni) ile verilir — buradaki
 * `<Head>` yalnız her sayfada DEĞİŞMEYEN etiketler içindir (preconnect, favicon).
 */
export default function Document() {
  return (
    <Html lang="tr" suppressHydrationWarning>
      <Head>
        {/* DNS/TLS handshake'i kritik 3rd party kaynaklar için önceden yap */}
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://api.huseyindol.com" />
        <link rel="dns-prefetch" href="https://www.clarity.ms" />

        {/* Metadata API'deki icons karşılığı — immutable cache kırılması için versiyonlu yollar */}
        <link rel="icon" href="/assets/logos/favicon-v1.ico" sizes="48x48" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/logos/favicon-32x32-v1.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href="/assets/logos/favicon-48x48-v1.png"
        />
        <link rel="shortcut icon" href="/assets/logos/favicon-v1.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/logos/apple-touch-icon-v1.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#011317" />
      </Head>
      <body className="font-sans antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
