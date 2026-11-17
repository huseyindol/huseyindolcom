import { Fragment } from 'react'

const SUBTITLE_PARTS = ['SYSTEMS', 'AI', 'CLOUD', 'ENGINEERING', 'STUDIO']

interface BrandLogoProps {
  scrolled?: boolean
  footer?: boolean
}

export default function BrandLogo({
  scrolled = false,
  footer = false,
}: BrandLogoProps) {
  // Hero üstü (scrolled=false): zemin her temada koyu teal gradyan → yazı HER
  // temada beyaz kalır (light temada koyu foreground'a düşüp okunmaz oluyordu —
  // sayfa geçişlerinde "Hüseyin" kayboluyordu). scrolled: header katı zemine
  // oturur → tema foreground'u. footer: koyu zemin → beyaz.
  const textClass = footer
    ? 'text-white'
    : scrolled
      ? 'text-foreground'
      : 'text-white'
  // Alt yazı (SYSTEMS • AI • CLOUD...) da aynı zemin mantığını izler: koyu
  // zeminde muted-foreground (light'ta orta gri) kontrastsız kalıyordu (QA).
  const subtitleClass = footer
    ? 'text-zinc-300'
    : scrolled
      ? 'text-muted-foreground'
      : 'text-zinc-300'

  return (
    <div className="group flex items-center gap-2.5 sm:gap-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/logos/logo-phoenix-chip-v1.png"
        alt="Hüseyin Dol Mekatronik Anka Kuşu & Mikroçip Arması"
        className="h-11 w-11 shrink-0 object-contain drop-shadow-[0_0_14px_rgba(45,212,191,0.55)] transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12"
      />
      <div className="min-w-0 leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-serif text-lg italic tracking-tight ${textClass}`}
          >
            Hüseyin
          </span>
          <span className="brand-text-accent text-base font-black uppercase tracking-widest">
            DOL
          </span>
        </div>
        <span
          className={`mt-1 block font-mono text-[7.5px] font-medium uppercase leading-tight tracking-[0.05em] sm:text-[9.5px] sm:tracking-[0.12em] ${subtitleClass}`}
        >
          {SUBTITLE_PARTS.map((part, idx) => (
            <Fragment key={part}>
              {idx > 0 && (
                <span className="brand-text-accent mx-0.5 font-bold">•</span>
              )}
              <span>{part}</span>
            </Fragment>
          ))}
        </span>
      </div>
    </div>
  )
}
