import bundleAnalyzer from '@next/bundle-analyzer'

// Validate environment variables at build time
import './src/lib/env'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
})

/** Oyun export’u aynı dosya adlarıyla güncellenince mobil cache kırılsın diye (iframe + revalidate). */
const matchingGameAssetVersion =
  process.env.NEXT_PUBLIC_MATCHING_GAME_ASSET_VERSION?.trim() ||
  process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 12) ||
  ''

const nextConfig = {
  // Standalone çıktı YALNIZ Vercel DIŞINDA açık (panel ile aynı desen).
  // - Vercel: kendi output file tracing'ini yapar ve build sonunda
  //   `.next/next-server.js.nft.json` bekler. Next 16.3 + standalone kombinasyonunda
  //   bu dosya üretilmiyor, deploy `onBuildComplete` adımında ENOENT ile düşüyordu
  //   (vercel/next.js#96646). Vercel build'inde `VERCEL=1` tanımlı → standalone KAPALI.
  // - Docker / Kubernetes / self-host: `.next/standalone` minimal sunucu paketi üretilir
  //   (küçük imaj, hızlı build/deploy). Çalıştırma: `.next/static` ve `public`'i
  //   standalone'a kopyala → `node .next/standalone/server.js`.
  output: process.env.VERCEL ? undefined : ('standalone' as const),

  env: {
    NEXT_PUBLIC_MATCHING_GAME_ASSET_VERSION: matchingGameAssetVersion,
  },

  // NOT: Next 16.3'te stabilleşen `typedRoutes: true` denendi ve 14 gerçek bulgu
  // çıkardı (var olmayan /admin rotalarına linkler + dış URL'lerin next/link ile
  // kullanılması). Açmak bu çağrı yerlerinin düzeltilmesini gerektirdiğinden ayrı
  // bir değişikliğe bırakıldı — bu PR yalnızca sürüm yükseltmesini kapsıyor.

  experimental: {
    // Kritik CSS inline (halef paket `beasties` kurulu; deprecated critters DEĞİL).
    optimizeCss: true,
    // Not: `experimental.ppr` 16.3'te deprecate edildi (top-level `cacheComponents`'a
    // taşındı). Burada zaten `false` idi (= varsayılan davranış), o yüzden anahtar
    // tamamen kaldırıldı — PPR/Cache Components açmak `use cache` direktifleri
    // gerektirir ve ayrı bir mimari karardır.
  },

  // Force metadata to be in head for all bots
  // Empty regex = matches nothing = no bots are HTML-limited
  htmlLimitedBots: /.*/,

  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: 'raw.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'avatars.githubusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'api.huseyindol.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http' as const,
        hostname: 'localhost',
        port: '8080',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'github.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: '**.pollinations.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Eski /arcade → yeni /games/arcade (kalıcı). Oyun sayfası taşındı; eski URL
  // (yer imleri, dış linkler, indeks) korunsun diye 308 yönlendirme.
  async redirects() {
    return [
      {
        source: '/arcade',
        destination: '/games/arcade',
        permanent: true,
      },
      // Oyun yeniden adlandırıldı: Offroad Arcade → Tumble Trail 4x4 (2026-10-09).
      // Eski sayfa ve eski web build yolu (yer imleri, iframe gömmeleri) korunsun.
      {
        source: '/games/offroad-arcade',
        destination: '/games/tumble-trail',
        permanent: true,
      },
      {
        source: '/assets/games/offroad-arcade/:path*',
        destination: '/assets/games/tumble-trail/:path*',
        permanent: true,
      },
      // Oyun yeniden adlandırıldı: Drift Arcade → Hyper Drift: Arcade (2026-10-10).
      {
        source: '/games/drift-arcade',
        destination: '/games/hyper-drift-arcade',
        permanent: true,
      },
      {
        source: '/assets/games/drift-arcade/:path*',
        destination: '/assets/games/hyper-drift-arcade/:path*',
        permanent: true,
      },
      // Oyun yeniden adlandırıldı: Hamur Usta → Plufy'nin Dünyası (2026-11-06).
      // Eski sayfa, doc sayfaları ve eski web build yolu (yer imleri, iframe gömmeleri) korunsun.
      {
        source: '/games/hamur-usta',
        destination: '/games/plufy',
        permanent: true,
      },
      {
        source: '/games/hamur-usta/:path*',
        destination: '/games/plufy/:path*',
        permanent: true,
      },
      {
        source: '/assets/games/hamur-usta/:path*',
        destination: '/assets/games/plufy/:path*',
        permanent: true,
      },
    ]
  },

  // Performance: Headers for caching
  async headers() {
    return [
      // Godot Web export (SharedArrayBuffer / crossOriginIsolated)
      {
        source: '/assets/games/matching/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=1800, s-maxage=1800, must-revalidate',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp',
          },
        ],
      },
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // AI arama motorları için llms.txt dosyaları
      {
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'X-Robots-Tag', value: 'all' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'X-Robots-Tag', value: 'all' },
        ],
      },
    ]
  },
}

export default withBundleAnalyzer(nextConfig)
