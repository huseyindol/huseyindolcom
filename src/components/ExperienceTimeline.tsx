import {
  KineticScrollBanner,
  KineticScrollItem,
  type KineticTrackItem,
} from '@/components/KineticScrollBanner'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useUrlQueryParam } from '@/hooks/useUrlQueryParam'
import { INDUSTRIES } from '@/schemas/constants'
import type { ExperienceType } from '@/schemas/dynamic/experienceSchema'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react'
import { useState } from 'react'

const industryColors: Record<string, string> = {
  Fintech:
    'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
  'E-commerce':
    'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300',
  Agency:
    'bg-stone-100 text-stone-700 border-stone-200 dark:bg-stone-800 dark:text-stone-300',
  Media:
    'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300',
  Freelancer:
    'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-300',
}

const experienceKineticTracks: KineticTrackItem[] = [
  {
    id: 'exp-fintech',
    dir: -1,
    speed: 1.45,
    baseOffset: -55,
    tag: 'FINTECH LEADERSHIP',
    primary: 'HANGİKREDİ · TEAM LEAD · MİMARİ KARARLAR',
    secondary: 'CI/CD · CODE REVIEW · MENTORLUK',
  },
  {
    id: 'exp-ecom',
    dir: 1,
    speed: 1.65,
    baseOffset: 75,
    tag: 'E-COMMERCE & MEDIA',
    primary: 'YÜKSEK TRAFİKLİ WEB PLATFORMLARI',
    secondary: 'SSR · ISR · CORE WEB VITALS OPTİMİZASYONU',
    accent: true,
  },
  {
    id: 'exp-scale',
    dir: -1,
    speed: 1.15,
    baseOffset: -30,
    scaleEffect: true,
    tag: '2011 → 2026',
    primary: '10+ YIL DENEYİM · 7 ŞİRKET · 5 SEKTÖR',
    secondary: 'MONOLİTİKTEN MİKROSERVİS MİMARİSİNE',
  },
  {
    id: 'exp-stack',
    dir: 1,
    speed: 1.8,
    baseOffset: 95,
    tag: 'FULL-STACK EVOLVEMENT',
    primary: 'REACT · NEXT.JS · JAVA SPRING BOOT',
    secondary: 'KUBERNETES · DOCKER · MULTI-TENANT DB',
    accent: true,
  },
]

interface ExperienceTimelineProps {
  experiences: ExperienceType[]
  title: string
  description: string
}

function syncFilterUrl(url: string) {
  try {
    window.history.replaceState(window.history.state, '', url)
  } catch {
    // URL güncellenemezse filtre yine çalışır — sessiz geç.
  }
}

export default function ExperienceTimeline({
  experiences,
  title,
  description,
}: ExperienceTimelineProps) {
  const urlIndustry = useUrlQueryParam('industry')
  const [selected, setSelected] = useState<string | null>(null)
  const selectedIndustry = selected ?? urlIndustry ?? 'all'

  const filtered =
    selectedIndustry === 'all'
      ? experiences
      : experiences.filter(exp => exp.industry === selectedIndustry)

  function handleFilter(industry: string) {
    setSelected(industry)
    const url =
      industry === 'all' ? '/experience' : `/experience?industry=${industry}`
    syncFilterUrl(url)
  }

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero header */}
      <section className="brand-hero-surface relative -mt-20 overflow-hidden border-b border-white/10 py-32 pt-32 text-zinc-100 md:py-40 md:pt-40">
        <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="brand-glow-orb pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="brand-badge mb-6 border px-4 py-1.5 text-sm font-medium">
              Kariyer Yolculuğu
            </Badge>
            <h1 className="mb-5 text-4xl font-black tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="text-lg text-zinc-400 md:text-xl">{description}</p>
          </div>

          {/* Career summary stats */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 text-center">
            {[
              { value: '10+', label: 'Yıl Kariyer' },
              { value: '7', label: 'Şirket' },
              { value: '5', label: 'Farklı Sektör' },
            ].map(s => (
              <div key={s.label}>
                <div className="brand-text-accent text-3xl font-black">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-zinc-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-directional Apple kinetic stream on Experience page */}
      <KineticScrollBanner
        kicker="01 / KARİYER KRONOLOJİSİ"
        title="Sektörler ve mimariler arası yolculuk"
        badge="FINTECH · E-COMMERCE · MEDIA · AGENCY"
        tracks={experienceKineticTracks}
        ariaLabel="Deneyim Kinetik Kariyer Akışı"
      />

      {/* Filter + Timeline */}
      <section className="bg-muted/20 overflow-hidden py-20">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-4xl">
            {/* Industry filter */}
            <div className="mb-14 flex flex-wrap justify-center gap-3">
              {INDUSTRIES.map(industry => (
                <button
                  key={industry.value}
                  onClick={() => handleFilter(industry.value)}
                  className={`inline-flex h-10 items-center justify-center rounded-full px-5 text-sm font-medium transition-all duration-200 ${
                    selectedIndustry === industry.value
                      ? 'brand-pill-btn scale-105 font-bold shadow-md'
                      : 'border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {industry.label}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              {filtered.map((exp, index) => (
                <ExperienceCard
                  key={`${exp.company}-${exp.period}`}
                  exp={exp}
                  index={index}
                  isLast={index === filtered.length - 1}
                />
              ))}

              {filtered.length === 0 && (
                <p className="py-20 text-center text-muted-foreground">
                  Bu sektörde deneyim bulunamadı.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function ExperienceCard({
  exp,
  index,
  isLast,
}: {
  exp: ExperienceType
  index: number
  isLast: boolean
}) {
  const [expanded, setExpanded] = useState(index === 0)

  const industryColor =
    industryColors[exp.industry] ??
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'

  return (
    <div className="relative pb-10 pl-12 last:pb-0">
      {/* Timeline line */}
      {!isLast && (
        <div className="from-primary/50 via-primary/20 absolute bottom-0 left-[18px] top-6 w-px bg-gradient-to-b to-transparent" />
      )}

      {/* Timeline dot */}
      <div className="ring-primary/10 absolute left-2.5 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-card shadow-md ring-4">
        <div className="h-2 w-2 rounded-full bg-primary" />
      </div>

      <KineticScrollItem side={index % 2 === 0 ? 'left' : 'right'}>
        <Card
          className="border-border/60 cursor-pointer overflow-hidden border shadow-md transition-shadow duration-300 hover:shadow-lg"
          onClick={() => setExpanded(v => !v)}
        >
          {/* Card header — always visible */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="brand-text-accent mb-1 text-xl font-bold">
                  {exp.position}
                </h3>
                <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5 font-semibold text-foreground">
                    <Building className="h-4 w-4" />
                    {exp.company}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {exp.location}
                  </span>
                </div>
                <Badge variant="outline" className={`text-xs ${industryColor}`}>
                  {exp.industry}
                </Badge>
              </div>
              <button
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors hover:bg-accent"
                aria-label={expanded ? 'Daralt' : 'Genişlet'}
              >
                {expanded ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>

          {/* Expandable content */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                key="content"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t px-6 pb-6 pt-5">
                  <p className="mb-6 leading-relaxed text-muted-foreground">
                    {exp.description}
                  </p>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Teknolojiler
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map(tech => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="bg-primary/5 text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                        Başlıca Başarılar
                      </h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((a, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </KineticScrollItem>
    </div>
  )
}
