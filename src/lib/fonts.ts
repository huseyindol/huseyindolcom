import { Geist, Geist_Mono as loadCodeFont } from 'next/font/google' // taste-skill-ignore: mono only for code blocks

/**
 * Router-bağımsız font tanımları.
 *
 * Pages Router'da `next/font` `_app` içinde yüklenir; CSS değişkenleri `:root`'a
 * enjekte edilir (globals.css'teki `body { @apply font-sans }` bunu çözer).
 */
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true, // CLS için fallback font metrik eşleme
  weight: ['400', '500', '600', '700', '800'], // 800 = font-extrabold
})

export const geistMono = // taste-skill-ignore: mono only for code blocks
  loadCodeFont({
    variable: '--font-geist-mono', // taste-skill-ignore: mono only for code blocks
    subsets: ['latin', 'latin-ext'],
    display: 'swap',
    preload: false, // Mono sadece kod blokları için, kritik path'te değil
    adjustFontFallback: true,
    weight: ['400', '500'],
  })
