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
      className="px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {/* Top Glass Career Header + Filter Pills */}
        <div className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/3 h-64 w-[580px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-400/15 to-emerald-500/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                Kariyer İndeksi · 2011 – 2026
              </span>
              <h2
                className="mb-2 font-extrabold tracking-tight text-slate-900 dark:text-white"
                style={{ fontSize: 'clamp(1.85rem, 1.1rem + 2.4vw, 3rem)' }}
              >
                {title}
              </h2>
              <p className="text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">
                {description}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 lg:col-span-6">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: '10+', label: 'Yıl Kariyer' },
                  { value: '7', label: 'Şirket' },
                  { value: '5', label: 'Sektör' },
                ].map(s => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]"
                  >
                    <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-2xl font-extrabold leading-none tracking-tight text-transparent md:text-3xl">
                      {s.value}
                    </span>
                    <p className="mt-1.5 text-xs font-bold text-slate-600 dark:text-slate-300">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-950/60">
                {INDUSTRIES.map(industry => {
                  const active = selectedIndustry === industry.value
                  return (
                    <button
                      key={industry.value}
                      type="button"
                      onClick={() => handleFilter(industry.value)}
                      className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                        active
                          ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 shadow-[0_0_16px_rgba(6,182,212,0.2)] dark:text-cyan-300'
                          : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                      }`}
                    >
                      {industry.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Glowing Vertical Timeline Beam + Specular Glass Cards */}
        <div className="relative pl-6 sm:pl-8">
          {/* Glowing Vertical Timeline Beam */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-4 left-2 top-4 w-0.5 bg-gradient-to-b from-cyan-400 via-emerald-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.6)] sm:left-3"
          />

          <div className="flex flex-col gap-5">
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
              <div className="glass-panel py-16 text-center text-slate-500 dark:text-slate-400">
                Bu sektörde deneyim bulunamadı.
              </div>
            )}
          </div>
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
      className="relative"
    >
      {/* Glowing Timeline Node Dot */}
      <div
        aria-hidden="true"
        className={`absolute -left-[21px] top-7 h-3.5 w-3.5 rounded-full border-2 sm:-left-[25px] ${
          isCurrent
            ? 'border-cyan-300 bg-cyan-400 shadow-[0_0_16px_#22d3ee]'
            : 'border-emerald-400/60 bg-slate-900 dark:bg-slate-950'
        }`}
      />

      <Card
        className="glass-panel cursor-pointer overflow-hidden p-6 transition-all duration-300 hover:border-cyan-400/40 sm:p-8"
        onClick={() => setExpanded(v => !v)}
      >
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <Calendar className="h-3.5 w-3.5" />
                {exp.period}
              </span>
              <Badge className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                {exp.industry}
              </Badge>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <MapPin className="h-3.5 w-3.5 text-cyan-500" />
                {exp.location}
              </span>
            </div>

            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-xl font-extrabold tracking-tight text-slate-900 md:text-2xl dark:text-white">
                {exp.position}
              </h3>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-cyan-600 dark:text-cyan-400">
                <Building className="h-4 w-4" />
                {exp.company}
              </span>
            </div>

            <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">
              {exp.description}
            </p>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-full border border-slate-200/80 bg-white/70 text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-500 md:self-start dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200"
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
              <div className="mt-6 grid gap-4 border-t border-slate-200/70 pt-6 md:grid-cols-12 dark:border-white/[0.08]">
                <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 md:col-span-7 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    Başlıca Başarılar
                  </p>
                  <ul className="space-y-2">
                    {exp.achievements.map((a, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-xs font-medium leading-relaxed text-slate-700 md:text-sm dark:text-slate-200"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200/70 bg-white/60 p-5 md:col-span-5 dark:border-white/[0.07] dark:bg-white/[0.02]">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Kullanılan Teknolojiler ({exp.technologies.length})
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map(tech => (
                      <Badge
                        key={tech}
                        className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-800 dark:text-cyan-200"
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
