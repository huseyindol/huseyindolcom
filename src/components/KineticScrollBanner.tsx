import type { ReactNode } from 'react'
import { useEffect, useRef } from 'react'

export interface KineticTrackItem {
  id: string
  dir: -1 | 1
  speed: number
  baseOffset: number
  scaleEffect?: boolean
  tag: string
  primary: string
  secondary: string
  accent?: boolean
}

interface KineticScrollBannerProps {
  kicker: string
  title: string
  badge: string
  tracks: KineticTrackItem[]
  ariaLabel?: string
}

export function KineticScrollBanner({
  kicker,
  title,
  badge,
  tracks,
  ariaLabel = 'Teknoloji ve Mimari Akışı',
}: KineticScrollBannerProps) {
  const trackRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let rafId = 0

    const updateStreams = () => {
      const vh = window.innerHeight || 800
      const isMobile = (window.innerWidth || 1024) < 768
      const travelMultiplier = isMobile ? 135 : 210

      trackRefs.current.forEach((el, idx) => {
        if (!el) return
        const cfg = tracks[idx]
        if (!cfg) return
        const rect = el.getBoundingClientRect()
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / (vh * 0.68)
        const clamped = Math.max(-1.25, Math.min(1.25, centerOffset))
        const baseFactor = isMobile ? cfg.baseOffset * 0.45 : cfg.baseOffset
        const shiftX =
          clamped * cfg.dir * travelMultiplier * cfg.speed +
          baseFactor * Math.abs(clamped)
        const opacity = Math.max(0.28, 1 - Math.abs(clamped) * 0.58)
        const scale = cfg.scaleEffect
          ? Math.max(0.9, 1 - Math.abs(clamped) * 0.12)
          : 1

        el.style.transform = `translate3d(${shiftX.toFixed(1)}px, 0, 0) scale(${scale})`
        el.style.opacity = opacity.toFixed(2)
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateStreams)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateStreams()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [tracks])

  return (
    <section
      aria-label={ariaLabel}
      className="brand-hero-surface relative overflow-hidden border-b border-white/10 py-14 text-zinc-100 md:py-24"
    >
      <div className="container mx-auto mb-8 flex flex-wrap items-center justify-between gap-3 px-6">
        <div>
          <p className="brand-text-accent mb-1 font-mono text-xs uppercase tracking-widest">
            {kicker}
          </p>
          <h2 className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            {title}
          </h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-400">
          {badge}
        </span>
      </div>

      <div className="-mx-16 select-none space-y-3 overflow-hidden py-2 sm:mx-0 sm:space-y-5">
        {tracks.map((track, idx) => (
          <div
            key={track.id}
            ref={el => {
              trackRefs.current[idx] = el
            }}
            className={`gpu-kinetic flex items-center justify-center gap-3 whitespace-nowrap px-4 sm:gap-4 sm:px-6 ${
              track.dir === 1 ? 'md:justify-end' : 'md:justify-start'
            }`}
          >
            <span className="brand-badge rounded-full border px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider">
              {track.tag}
            </span>
            <span
              className={`text-xl font-black tracking-tighter sm:text-3xl md:text-5xl ${
                track.accent ? 'brand-text-accent' : 'text-zinc-100'
              }`}
            >
              {track.primary}
            </span>
            <span className="text-lg font-light text-zinc-600 sm:text-2xl">
              {'///'}
            </span>
            <span className="text-base font-semibold text-zinc-400 sm:text-xl md:text-3xl">
              {track.secondary}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

interface KineticScrollItemProps {
  children: ReactNode
  side?: 'left' | 'right'
  intensity?: number
  className?: string
}

/**
 * Scroll pozisyonuna duyarlı sağdan/soldan kayarak merkeze kenetlenen kapsayıcı.
 * Tek seferlik useInView yerine hem mobilde hem masaüstünde her aşağı/yukarı
 * kaydırmada GPU transform: translate3d(...) ile akıcı hareket üretir.
 */
export function KineticScrollItem({
  children,
  side = 'left',
  intensity = 1,
  className = '',
}: KineticScrollItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let rafId = 0
    const dir = side === 'left' ? -1 : 1

    const updatePosition = () => {
      const el = ref.current
      if (!el) return
      const vh = window.innerHeight || 800
      const isMobile = (window.innerWidth || 1024) < 768
      const maxShiftX = (isMobile ? 54 : 88) * intensity
      const rect = el.getBoundingClientRect()
      const elemCenter = rect.top + rect.height / 2
      const viewportCenter = vh * 0.52

      // Merkeze yaklaştıkça (dead-zone içinde) 0'a kenetlenir, alt/üst kenarlarda sağa/sola kayar
      const normalized = (elemCenter - viewportCenter) / (vh * 0.58)
      const deadZone = 0.18
      let offsetFactor = 0
      if (Math.abs(normalized) > deadZone) {
        const sign = normalized > 0 ? 1 : -1
        const raw = (Math.abs(normalized) - deadZone) / (1 - deadZone)
        offsetFactor = sign * Math.min(1, raw)
      }

      const shiftX = offsetFactor * dir * maxShiftX
      const shiftY = offsetFactor * 18
      const scale = 1 - Math.min(0.06, Math.abs(offsetFactor) * 0.05)
      const opacity = Math.max(0.35, 1 - Math.abs(offsetFactor) * 0.55)

      el.style.transform = `translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`
      el.style.opacity = opacity.toFixed(2)
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updatePosition)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updatePosition()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [side, intensity])

  return (
    <div ref={ref} className={`gpu-kinetic ${className}`}>
      {children}
    </div>
  )
}
