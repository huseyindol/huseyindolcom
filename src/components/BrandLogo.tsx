import { Fragment } from 'react'

const SUBTITLE_PARTS = ['SYSTEMS', 'AI', 'CLOUD', 'ENGINEERING', 'STUDIO']

interface BrandLogoProps {
  scrolled?: boolean
  footer?: boolean
}

// scrolled/footer: artık renk bu props'lara değil tema token'larına bağlı;
// imza çağıranlarla uyum için korunur (gelecekte tekrar davranış bağlanabilir).
export default function BrandLogo(_props: BrandLogoProps) {
  // brand-hero-surface tema-duyarlı olduğundan (2026-11-18) hero/footer zemini
  // light'ta AÇIK → metinler tema foreground'u; dark'ta beyaz. Sabit renk yok.
  const textClass = 'text-foreground dark:text-white'
  const subtitleClass = 'text-muted-foreground dark:text-zinc-300'

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
