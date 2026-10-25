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
import { useState, useTransition } from 'react'

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
  const pathname = usePathname() ?? ''
  const isEllyPage = pathname.startsWith('/projects/elly')
  const navLinksToUse = isEllyPage ? ellyNavLinks : mainNavLinks
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { cookies } = useCookie()
  const isLoggedIn = !!cookies[CookieEnum.USERNAME]

  const handleLogout = () => {
    startTransition(async () => {
      await siteLogout()
      authCookies.forEach(removeGlobalCookie)
      removeGlobalCookie(CookieEnum.USERNAME)
      clearGuestStorage()
      window.location.assign('/login')
    })
  }

  function isActive(href: string) {
    if (href === '/projects/elly') return pathname === '/projects/elly'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="fixed top-0 z-50 w-full bg-background px-2 pt-2 md:px-3">
      <div className="mx-auto max-w-[1680px]">
        <div className="grid grid-cols-12 gap-2">
          {/* Tile 1: Brand & Status */}
          <Link
            href="/"
            onClick={() =>
              sendGTMEvent({
                virtual: '/',
                event: 'buttonClick',
                target: 'home',
              })
            }
            className="group col-span-7 flex h-14 items-center justify-between rounded-md bg-card px-4 transition-colors hover:bg-secondary md:col-span-3"
          >
            <div className="flex items-center gap-3">
              <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-sm bg-secondary">
                <Image
                  src="/assets/img/huseyindol.png"
                  alt="Hüseyin DOL"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary md:text-base">
                Hüseyin DOL
              </span>
            </div>
            <span className="hidden items-center gap-1.5 rounded-sm bg-secondary px-2 py-0.5 text-xs font-semibold text-muted-foreground lg:inline-flex">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              IST
            </span>
          </Link>

          {/* Tiles 2–6: Desktop Navigation Board */}
          <nav
            aria-label="Ana Menü"
            className="hidden md:col-span-6 md:grid md:grid-cols-5 md:gap-2"
          >
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
                  className={`flex h-14 items-center justify-between rounded-md px-3.5 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-foreground text-background'
                      : 'bg-card text-muted-foreground hover:bg-secondary hover:text-foreground'
                  }`}
                >
                  <span className="truncate">{link.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 shrink-0 rounded-full bg-primary"
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Tile 7: Desktop Theme + Primary CTA + Logout */}
          <div className="hidden md:col-span-3 md:flex md:gap-2">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-card">
              <ThemeToggle />
            </div>
            <Link
              href="mailto:huseyindol@gmail.com"
              className="flex h-14 flex-1 items-center justify-between rounded-md bg-primary px-4 text-sm font-extrabold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              <span>İletişime Geç</span>
              <span aria-hidden="true">↗</span>
            </Link>
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                disabled={isPending}
                title="Çıkış Yap"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-card text-destructive transition-colors hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Mobile Controls Tile */}
          <div className="col-span-5 flex justify-end gap-2 md:hidden">
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-card">
              <ThemeToggle />
            </div>
            <button
              onClick={() => setIsOpen(v => !v)}
              aria-label="Menü"
              className="flex h-14 w-14 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Tile Board Menu */}
        {isOpen && (
          <div className="animate-mobile-menu mt-2 grid grid-cols-2 gap-2 pb-2 md:hidden">
            {navLinksToUse.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex h-12 items-center justify-between rounded-md px-4 text-sm font-semibold transition-colors ${
                    active
                      ? 'bg-foreground text-background'
                      : 'bg-card text-foreground hover:bg-secondary'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-primary"
                    />
                  )}
                </Link>
              )
            })}
            <Link
              href="mailto:huseyindol@gmail.com"
              onClick={() => setIsOpen(false)}
              className="col-span-2 flex h-12 items-center justify-between rounded-md bg-primary px-4 text-sm font-extrabold text-primary-foreground"
            >
              <span>İletişime Geç</span>
              <span aria-hidden="true">↗</span>
            </Link>
            {isLoggedIn && (
              <button
                onClick={() => {
                  setIsOpen(false)
                  handleLogout()
                }}
                disabled={isPending}
                title="Çıkış Yap"
                className="col-span-2 flex h-12 items-center justify-center gap-2 rounded-md bg-card text-sm font-semibold text-destructive"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış Yap</span>
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}
