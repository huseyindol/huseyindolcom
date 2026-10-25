import { Geist, Geist_Mono } from 'next/font/google'

/**
 * Router-bağımsız font tanımları.
 *
 * Pages Router'da `next/font` `_app` içinde yüklenir; CSS değişkenleri `:root`'a
 * enjekte edilir (globals.css'teki `body { @apply font-sans }` bunu çözer).
 */
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  adjustFontFallback: true, // CLS için fallback font metrik eşleme
  weight: ['400', '500', '600', '700', '800'], // 800 = font-extrabold
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Mono sadece kod blokları için, kritik path'te değil
  adjustFontFallback: true,
  weight: ['400', '500'],
})
