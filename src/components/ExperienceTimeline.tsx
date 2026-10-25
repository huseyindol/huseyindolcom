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

const fadeInLeft = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const industryColors: Record<string, string> = {
  Fintech:
    'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400',
  'E-commerce':
    'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400',
  Agency:
    'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/30 dark:text-violet-400',
  Media:
    'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400',
  Freelancer:
    'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-900/30 dark:text-pink-400',
}

interface ExperienceTimelineProps {
  experiences: ExperienceType[]
  title: string
  description: string
}

/**
 * Filtre seçimini URL'e yansıtır — ROUTER KULLANMADAN.
 *
 * Router'a bağlanmak taşımada sorun çıkardı: App Router'ın useRouter'ı Pages
 * Router'da mount değil, çağrısı handler içinde patlayınca React aynı handler'daki
 * setState'i de düşürüyor ve filtre hiç çalışmıyordu. Filtrelemenin URL'e ihtiyacı
 * yok; adres yalnız paylaşılabilirlik için güncelleniyor.
 */
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
  // Filtre tamamen client state — server searchParams okunmuyor (sayfa static/ISR kalır).
  // Tıklamada URL de güncellenir (paylaşılabilir); ilk yükte hep "all" başlar.
  // İlk yük: adresteki ?industry= uygulanır; sonrası kullanıcı seçimi ezer.
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
    <div className="min-h-screen">
      {/* Hero header */}
      <section className="relative -mt-20 overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-32 pt-32 text-white md:py-40 md:pt-40">
        <div className="animate-orb-1 pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="animate-orb-2 pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border border-blue-400/30 bg-blue-500/20 px-4 py-1.5 text-sm font-medium text-blue-200">
              Kariyer Yolculuğu
            </Badge>
            <h1 className="mb-5 text-4xl font-extrabold md:text-6xl">
              {title}
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">{description}</p>
          </div>

          {/* Career summary stats */}
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-6 text-center">
            {[
              { value: '10+', label: 'Yıl Kariyer' },
              { value: '7', label: 'Şirket' },
              { value: '5', label: 'Farklı Sektör' },
            ].map(s => (
              <div key={s.label}>
                <div className="text-3xl font-extrabold text-blue-300">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-slate-400">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter + Timeline */}
      <section className="bg-muted/20 py-20">
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
                      ? 'shadow-primary/30 scale-105 bg-primary text-primary-foreground shadow-md'
                      : 'border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  {industry.label}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              <AnimatePresence mode="popLayout">
                {filtered.map((exp, index) => (
                  <ExperienceCard
                    key={`${exp.company}-${exp.period}`}
                    exp={exp}
                    index={index}
                    isLast={index === filtered.length - 1}
                  />
                ))}
              </AnimatePresence>

              {filtered.length === 0 && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center text-muted-foreground"
                >
                  Bu sektörde deneyim bulunamadı.
                </motion.p>
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [expanded, setExpanded] = useState(index === 0)

  const industryColor =
    industryColors[exp.industry] ??
    'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, x: -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pb-10 pl-12 last:pb-0"
    >
      {/* Timeline line */}
      {!isLast && (
        <div className="from-primary/50 via-primary/20 absolute bottom-0 left-[18px] top-6 w-px bg-gradient-to-b to-transparent" />
      )}

      {/* Timeline dot */}
      <motion.div
        className="ring-primary/10 absolute left-2.5 top-3 flex h-5 w-5 items-center justify-center rounded-full border-2 border-primary bg-card shadow-md ring-4"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.3, delay: index * 0.08 + 0.15 }}
      >
        <div className="h-2 w-2 rounded-full bg-primary" />
      </motion.div>

      <motion.div variants={fadeInLeft}>
        <Card
          className="cursor-pointer overflow-hidden border-0 shadow-md transition-shadow duration-300 hover:shadow-lg"
          onClick={() => setExpanded(v => !v)}
        >
          {/* Card header — always visible */}
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="mb-1 text-xl font-bold text-primary">
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
      </motion.div>
    </motion.div>
  )
}
