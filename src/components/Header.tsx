import { siteLogout } from '@/actions/auth/siteLogout'
import BrandLogo from '@/components/BrandLogo'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { removeGlobalCookie, useCookie } from '@/context/CookieContext'
import { clearGuestStorage } from '@/hooks/chat/useGuestToken'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import { sendGTMEvent } from '@next/third-parties/google'
import { LogOut, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

const mainNavLinks = [
  { href: '/about', label: 'Hakkında' },
  { href: '/skills', label: 'Yetenekler' },
  { href: '/experience', label: 'Deneyim' },
  { href: '/projects', label: 'Projeler' },
  { href: '/blog', label: 'Makalelerim' },
]

const ellyNavLinks = [
  { href: '/projects/elly', label: 'Elly' },
  { href: '/projects/elly-architecture', label: 'Architecture' },
  { href: '/projects/elly-sunum', label: 'Sunum' },
  { href: '/projects/elly-presentation', label: 'Sunum (EN)' },
  { href: '/projects/elly-video', label: 'Video' },
]

const authCookies = [
  CookieEnum.ACCESS_TOKEN,
  CookieEnum.REFRESH_TOKEN,
  CookieEnum.EXPIRED_DATE,
  CookieEnum.USER_CODE,
] as const

export default function Header() {
  // usePathname HER İKİ router'da da çalışır (useRouter'ın aksine) — Header
  // taşıma sürerken hem app/ hem pages/ layout'unda render ediliyor.
  const pathname = usePathname() ?? ''
  const isEllyPage = pathname.startsWith('/projects/elly')
  const navLinksToUse = isEllyPage ? ellyNavLinks : mainNavLinks
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { cookies } = useCookie()
  const isLoggedIn = !!cookies[CookieEnum.USERNAME]

  const handleLogout = () => {
    startTransition(async () => {
      await siteLogout()
      authCookies.forEach(removeGlobalCookie)
      removeGlobalCookie(CookieEnum.USERNAME)
      // Chat guest kimliğini de temizle → tekrar girişte eski guest adı kalmasın
      clearGuestStorage()
      // Router'dan bağımsız tam gezinme: çıkışta zaten tüm istemci durumu
      // sıfırlanmalı (cookie'ler temizlendi), ayrıca iki router'da da çalışır.
      window.location.assign('/login')
    })
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function isActive(href: string) {
    if (href === '/projects/elly') return pathname === '/projects/elly'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'border-border/60 bg-background/90 border-b shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() =>
            sendGTMEvent({ virtual: '/', event: 'buttonClick', target: 'home' })
          }
        >
          <BrandLogo scrolled={scrolled} />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinksToUse.map(link => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() =>
                sendGTMEvent({
                  virtual: link.href,
                  event: 'buttonClick',
                  target: link.href.startsWith('/projects/elly')
                    ? link.href
                    : link.href.slice(1),
                })
              }
              className={`relative rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? scrolled
                    ? 'text-primary'
                    : 'text-primary dark:text-white'
                  : scrolled
                    ? 'text-muted-foreground hover:text-foreground'
                    : 'text-foreground/60 hover:text-foreground dark:text-white/70 dark:hover:text-white'
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}

          <div className="ml-2 flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="mailto:huseyindol@gmail.com"
              className="brand-pill-btn ml-1 rounded-full px-4 py-2 text-sm font-bold shadow-md transition-all hover:scale-105"
            >
              İletişime Geç
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                disabled={isPending}
                title="Çıkış Yap"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label="Menü"
            className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors ${
              scrolled
                ? 'bg-muted text-foreground hover:bg-accent'
                : 'bg-foreground/10 hover:bg-foreground/20 text-foreground dark:bg-white/10 dark:text-white dark:hover:bg-white/20'
            }`}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — pure CSS, runtime maliyeti yok */}
      {isOpen && (
        <div className="animate-mobile-menu bg-background/95 border-b border-border px-6 pb-6 pt-2 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinksToUse.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2">
              <Link
                href="mailto:huseyindol@gmail.com"
                onClick={() => setIsOpen(false)}
                className="brand-pill-btn flex-1 rounded-lg px-4 py-3 text-center text-sm font-bold"
              >
                İletişime Geç
              </Link>
              {isLoggedIn && (
                <button
                  onClick={() => {
                    setIsOpen(false)
                    handleLogout()
                  }}
                  disabled={isPending}
                  title="Çıkış Yap"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500 transition-colors hover:bg-red-500/20 disabled:opacity-50"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
