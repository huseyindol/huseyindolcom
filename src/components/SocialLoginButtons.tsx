import { useUrlQueryParam } from '@/hooks/useUrlQueryParam'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

/**
 * Google / GitHub ile devam et butonları (login + register ortak).
 * Tıklama → /api/auth/social/start/{provider} (state cookie + provider redirect);
 * dönüş → /api/auth/social/callback/{provider} (backend takas + cookie yazımı).
 */
export function SocialLoginButtons() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="h-px flex-1 bg-border" />
        <span className="text-xs uppercase tracking-wide text-muted-foreground">
          veya
        </span>
        <span className="h-px flex-1 bg-border" />
      </div>

      {/* Bilinçli <a> (Link DEĞİL): hedef bir route handler ve dış OAuth URL'ine
          302 döner — client-side navigation bu redirect'i takip edemez. */}
      <Button variant="outline" className="w-full" asChild>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/social/start/google">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google ile devam et
        </a>
      </Button>

      <Button variant="outline" className="w-full" asChild>
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/social/start/github">
          <GitHubIcon className="mr-2 h-4 w-4" />
          GitHub ile devam et
        </a>
      </Button>
    </div>
  )
}

/**
 * Callback'ten dönen `?error=` mesajını gösterir.
 * Router'dan BAĞIMSIZ: hata mesajı window.location'dan okunur. Böylece bileşen hem
 * App Router hem Pages Router sayfalarında çalışır (taşıma sürerken ikisi bir arada).
 */
export function SocialAuthErrorNotice() {
  // URL'deki ?error= (useSyncExternalStore — set-state-in-effect'e takılmaz,
  // hydration uyuşmazlığı üretmez, router'dan bağımsız).
  const error = useUrlQueryParam('error')
  if (!error) return null
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z"
      />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.04 11.04 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.26 5.67.41.35.77 1.05.77 2.12v3.15c0 .3.21.66.8.55A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}
