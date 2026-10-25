import { siteLogout } from '@/actions/auth/siteLogout'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { removeGlobalCookie, useCookie } from '@/context/CookieContext'
import { clearGuestStorage } from '@/hooks/chat/useGuestToken'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import { sendGTMEvent } from '@next/third-parties/google'
import { LogOut, Menu, X } from 'lucide-react'
import Image from 'next/image'
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
      className={`fixed top-0 z-50 w-full transition-colors duration-200 ${
        scrolled ? 'bg-card text-foreground' : 'bg-background text-foreground'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex items-center gap-3"
          onClick={() =>
            sendGTMEvent({ virtual: '/', event: 'buttonClick', target: 'home' })
          }
        >
          <div className="relative h-9 w-9 shrink-0 overflow-hidden bg-card">
            <Image
              src="/assets/img/huseyindol.png"
              alt="Hüseyin DOL"
              width={36}
              height={36}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="text-base font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Hüseyin DOL
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinksToUse.map(link => {
            const active = isActive(link.href)
            return (
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
                className={`inline-flex items-center gap-2 px-3.5 py-2 text-sm transition-colors ${
                  active
                    ? 'font-bold text-foreground'
                    : 'font-medium text-muted-foreground hover:text-foreground'
                }`}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 bg-primary"
                  />
                )}
                {link.label}
              </Link>
            )
          })}

          <div className="ml-3 flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="mailto:huseyindol@gmail.com"
              className="ml-1 bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              İletişime Geç
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                disabled={isPending}
                title="Çıkış Yap"
                className="bg-destructive/15 flex h-9 w-9 items-center justify-center text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
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
            className="flex h-9 w-9 items-center justify-center bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu — flat surface, zero runtime overhead */}
      {isOpen && (
        <div className="animate-mobile-menu bg-card px-6 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {navLinksToUse.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-2.5 px-4 py-3 text-sm transition-colors ${
                    active
                      ? 'bg-background font-bold text-foreground'
                      : 'font-medium text-muted-foreground hover:bg-background hover:text-foreground'
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-1.5 w-1.5 shrink-0 bg-primary"
                    />
                  )}
                  {link.label}
                </Link>
              )
            })}
            <div className="mt-3 flex items-center gap-2">
              <Link
                href="mailto:huseyindol@gmail.com"
                onClick={() => setIsOpen(false)}
                className="flex-1 bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
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
                  className="bg-destructive/15 flex h-11 w-11 shrink-0 items-center justify-center text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
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
