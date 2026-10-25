import { useUrlQueryParam } from '@/hooks/useUrlQueryParam'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { INDUSTRIES } from '@/schemas/constants'
import type { ExperienceType } from '@/schemas/dynamic/experienceSchema'
import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  Building,
  Calendar,
  ChevronDown,
  ChevronUp,
  MapPin,
} from 'lucide-react'
import { useRef, useState } from 'react'

interface ExperienceTimelineProps {
  experiences: ExperienceType[]
  title: string
  description: string
}

function syncFilterUrl(url: string) {
  try {
    window.history.replaceState(window.history.state, '', url)
  } catch {
    // URL güncellenemezse filtre yine çalışır
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
    <section
      aria-label="Profesyonel Deneyim Panosu"
      className="px-2 pb-2 md:px-3"
    >
      <div className="mx-auto flex max-w-[1680px] flex-col gap-2">
        {/* Top Career Board Row */}
        <div className="grid grid-cols-12 gap-2">
          {/* Title & Description Tile (Cols 1-5) */}
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:p-8 lg:col-span-5">
            <div>
              <span className="mb-2 inline-block rounded-sm bg-secondary px-2.5 py-1 text-xs font-extrabold text-primary">
                Kariyer İndeksi · 2011 – 2026
              </span>
              <h2
                className="mb-2 font-extrabold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(1.75rem, 1.1rem + 2.2vw, 3rem)' }}
              >
                {title}
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
          </div>

          {/* 3 Compact Summary Stat Tiles (Cols 6-8) */}
          <div className="col-span-12 grid grid-cols-3 gap-2 lg:col-span-3">
            {[
              { value: '10+', label: 'Yıl Kariyer' },
              { value: '7', label: 'Şirket' },
              { value: '5', label: 'Sektör' },
            ].map((s, idx) => (
              <div
                key={s.label}
                className={`flex flex-col justify-between rounded-md p-4 md:p-5 ${
                  idx === 0
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-foreground text-background'
                }`}
              >
                <span className="text-2xl font-extrabold leading-none tracking-tight md:text-3xl">
                  {s.value}
                </span>
                <span className="mt-3 text-xs font-bold opacity-85">
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* Industry Filter Tile (Cols 9-12) */}
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 lg:col-span-4">
            <span className="mb-3 text-xs font-bold text-muted-foreground">
              Sektöre Göre Filtrele
            </span>
            <div className="flex flex-wrap gap-1.5">
              {INDUSTRIES.map(industry => {
                const active = selectedIndustry === industry.value
                return (
                  <button
                    key={industry.value}
                    type="button"
                    onClick={() => handleFilter(industry.value)}
                    className={`rounded-sm px-3.5 py-2 text-xs font-extrabold transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-foreground hover:text-background'
                    }`}
                  >
                    {industry.label}
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Experience Strip Rows */}
        <div className="flex flex-col gap-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${exp.period}`}
                exp={exp}
                index={index}
              />
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="rounded-md bg-card py-16 text-center text-muted-foreground">
              Bu sektörde deneyim bulunamadı.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

function ExperienceCard({
  exp,
  index,
}: {
  exp: ExperienceType
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [expanded, setExpanded] = useState(index === 0)
  const isCurrent = index === 0

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="grid grid-cols-12 gap-2"
    >
      {/* Left Company & Period Tile (Cols 1-4) */}
      <div
        className={`col-span-12 flex flex-col justify-between rounded-md p-6 md:col-span-4 ${
          isCurrent
            ? 'bg-foreground text-background'
            : 'bg-secondary text-foreground'
        }`}
      >
        <div>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span
              className={`inline-flex items-center gap-1.5 text-xs font-bold ${
                isCurrent ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Calendar className="h-3.5 w-3.5" />
              {exp.period}
            </span>
            <Badge
              className={`rounded-sm border-0 px-2.5 py-0.5 text-xs font-extrabold ${
                isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground'
              }`}
            >
              {exp.industry}
            </Badge>
          </div>

          <h3 className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
            <Building className="h-4 w-4 shrink-0 text-primary" />
            <span>{exp.company}</span>
          </h3>
        </div>

        <div
          className={`mt-4 flex items-center justify-between text-xs font-semibold ${
            isCurrent ? 'text-background/70' : 'text-muted-foreground'
          }`}
        >
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {exp.location}
          </span>
          <span>{exp.technologies.length} Teknoloji</span>
        </div>
      </div>

      {/* Right Position, Achievements & Stack Tile (Cols 5-12) */}
      <Card
        className="hover:bg-secondary/60 col-span-12 cursor-pointer overflow-hidden rounded-md border-0 bg-card p-6 transition-colors md:col-span-8 md:p-7"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h4 className="mb-2 text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
              {exp.position}
            </h4>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {exp.description}
            </p>
          </div>
          <button
            type="button"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            aria-label={expanded ? 'Daralt' : 'Genişlet'}
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* Expandable Details */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-6 grid gap-6 pt-2 md:grid-cols-12">
                <div className="rounded-sm bg-secondary p-4 md:col-span-6">
                  <p className="mb-3 text-xs font-extrabold text-primary">
                    Başlıca Başarılar
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs font-medium leading-relaxed text-foreground md:text-sm"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-sm bg-secondary p-4 md:col-span-6">
                  <p className="mb-3 text-xs font-extrabold text-primary">
                    Kullanılan Teknolojiler
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map(tech => (
                      <Badge
                        key={tech}
                        className="rounded-sm border-0 bg-card px-2.5 py-1 text-xs font-bold text-foreground"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
