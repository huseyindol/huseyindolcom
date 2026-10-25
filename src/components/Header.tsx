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
    <header className="fixed inset-x-0 top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="relative flex h-16 items-center justify-between gap-3 rounded-full border border-slate-200/80 bg-white/75 px-3 shadow-[0_16px_48px_rgba(15,23,42,0.12),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl md:px-4 dark:border-white/[0.1] dark:bg-slate-950/65 dark:shadow-[0_16px_48px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]">
        {/* Specular Top Edge Glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        />

        {/* Brand + Glowing Concept Badge */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            onClick={() =>
              sendGTMEvent({
                virtual: '/',
                event: 'buttonClick',
                target: 'home',
              })
            }
            className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-all"
          >
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-cyan-500/30 bg-slate-900 shadow-[0_0_16px_rgba(6,182,212,0.25)]">
              <Image
                src="/assets/img/huseyindol.png"
                alt="Hüseyin DOL"
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            </div>
            <span className="text-sm font-bold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-500 md:text-base dark:text-slate-100 dark:group-hover:text-cyan-300">
              Hüseyin DOL
            </span>
          </Link>

          <span className="hidden items-center gap-1.5 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 text-[11px] font-semibold tracking-wide text-cyan-700 xl:inline-flex dark:text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            Konsept A · Linear Obsidian Glass
          </span>
        </div>

        {/* Desktop Pill Navigation */}
        <nav
          aria-label="Ana Menü"
          className="hidden items-center gap-1 rounded-full border border-slate-200/70 bg-slate-100/70 p-1 md:flex dark:border-white/[0.07] dark:bg-white/[0.03]"
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
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 lg:px-4 lg:text-sm ${
                  active
                    ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:text-cyan-300'
                    : 'text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Right Actions: ThemeToggle + Glowing CTA + Logout */}
        <div className="hidden items-center gap-2 md:flex">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 backdrop-blur-md dark:border-white/[0.09] dark:bg-white/[0.04]">
            <ThemeToggle />
          </div>
          <Link
            href="mailto:huseyindol@gmail.com"
            className="inline-flex h-10 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 text-xs font-bold text-slate-950 shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_32px_rgba(6,182,212,0.55)] lg:text-sm"
          >
            <span>İletişime Geç</span>
            <span aria-hidden="true">↗</span>
          </Link>
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              disabled={isPending}
              title="Çıkış Yap"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500/30 bg-red-500/10 text-red-500 transition-colors hover:bg-red-500 hover:text-white disabled:opacity-50"
            >
              <LogOut className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 dark:border-white/[0.09] dark:bg-white/[0.04]">
            <ThemeToggle />
          </div>
          <button
            onClick={() => setIsOpen(v => !v)}
            aria-label="Menü"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Glass Dropdown Panel */}
      {isOpen && (
        <div className="animate-mobile-menu glass-panel mt-2 p-3 md:hidden">
          <div className="mb-2 flex items-center justify-between px-2 py-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-300">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
              Konsept A · Linear Obsidian Glass
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinksToUse.map(link => {
              const active = isActive(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex h-11 items-center justify-between rounded-xl px-3.5 text-sm font-semibold transition-all ${
                    active
                      ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 dark:text-cyan-300'
                      : 'border border-slate-200/60 bg-white/60 text-slate-700 hover:bg-white dark:border-white/[0.06] dark:bg-white/[0.03] dark:text-slate-200'
                  }`}
                >
                  <span>{link.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                    />
                  )}
                </Link>
              )
            })}
            <Link
              href="mailto:huseyindol@gmail.com"
              onClick={() => setIsOpen(false)}
              className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(6,182,212,0.3)]"
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
                className="col-span-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 text-sm font-semibold text-red-500"
              >
                <LogOut className="h-4 w-4" />
                <span>Çıkış Yap</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
