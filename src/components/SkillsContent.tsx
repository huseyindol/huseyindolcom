import type { SkillType } from '@/schemas/dynamic'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Cloud, Database, Monitor, Server, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}

const levelConfig: Record<
  string,
  { label: string; badgeClass: string; percent: number }
> = {
  Expert: {
    label: 'Uzman',
    badgeClass:
      'border border-cyan-500/30 bg-cyan-500/15 text-cyan-700 dark:text-cyan-300',
    percent: 95,
  },
  Advanced: {
    label: 'İleri',
    badgeClass:
      'border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
    percent: 82,
  },
  Intermediate: {
    label: 'Orta',
    badgeClass:
      'border border-slate-300/80 bg-slate-200/70 text-slate-700 dark:border-white/15 dark:bg-white/[0.06] dark:text-slate-300',
    percent: 68,
  },
}

interface CategoryConfig {
  label: string
  description: string
  icon: LucideIcon
  skillNames: string[]
}

const CATEGORIES: CategoryConfig[] = [
  {
    label: 'Frontend',
    description:
      'React ekosisteminde 8+ yıl deneyimle SSR/SSG/ISR stratejileri, TypeScript ile tip güvenli geliştirme ve modern UI mimarileri üzerine uzmanlaştım.',
    icon: Monitor,
    skillNames: [
      'HTML5',
      'CSS3',
      'Bootstrap',
      'Sass',
      'JavaScript',
      'React',
      'Next.js',
      'Redux',
    ],
  },
  {
    label: 'Backend',
    description:
      "Node.js ve Express.js ile 7+ yıldır RESTful API'lar geliştiriyorum. Java Spring Boot 3.x ile multitenancy, RBAC ve OAuth2 entegrasyonları konusunda derinleşiyorum.",
    icon: Server,
    skillNames: ['Node.js', 'Express', 'Java', 'Spring', 'Prisma'],
  },
  {
    label: 'Veritabanı',
    description:
      'MongoDB, PostgreSQL ve Redis ile veri modelleme, sorgu optimizasyonu ve distributed caching stratejilerinde deneyimliyim.',
    icon: Database,
    skillNames: ['MongoDB', 'PostgreSQL'],
  },
  {
    label: 'DevOps',
    description:
      'Docker multi-stage build, Kubernetes StatefulSet/HPA, GitHub Actions CI/CD ve Traefik Ingress ile production-grade altyapı yönetimi yapıyorum.',
    icon: Cloud,
    skillNames: ['Docker', 'Nginx', 'Git'],
  },
  {
    label: 'Araçlar',
    description:
      'Figma ile design-to-code, Postman ile API testing ve MCP ile özel AI araç entegrasyonlarında deneyimliyim.',
    icon: Wrench,
    skillNames: ['VS Code', 'Figma', 'Trello', 'Postman', 'MCP'],
  },
]

interface SkillsContentProps {
  skills: SkillType[]
  title: string
  description: string
}

export default function SkillsContent({
  skills,
  title,
  description,
}: SkillsContentProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all')

  const allCategorized = new Set(CATEGORIES.flatMap(c => c.skillNames))
  const uncategorized = skills.filter(s => !allCategorized.has(s.name))

  const visibleCategories =
    activeCategory === 'all'
      ? CATEGORIES
      : CATEGORIES.filter(c => c.label === activeCategory)

  return (
    <section
      aria-label="Yetenekler ve Teknoloji Yığını"
      className="px-4 pb-16 sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {/* Top Linear Glass Header + Frosted Filter Pill Bar */}
        <div className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[620px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/20 via-sky-400/15 to-emerald-500/20 blur-3xl"
          />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                Teknoloji Matrisi · {skills.length} Yetkinlik
              </span>
              <h2
                className="mb-2 font-extrabold tracking-tight text-slate-900 dark:text-white"
                style={{ fontSize: 'clamp(1.85rem, 1.1rem + 2.4vw, 3rem)' }}
              >
                {title}
              </h2>
              <p className="max-w-[60ch] text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">
                {description}
              </p>
            </div>

            {/* Frosted Glass Category Filter Pill Bar */}
            <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 backdrop-blur-xl sm:rounded-full dark:border-white/[0.08] dark:bg-slate-950/60">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                  activeCategory === 'all'
                    ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 shadow-[0_0_16px_rgba(6,182,212,0.2)] dark:text-cyan-300'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Tümü ({skills.length})
              </button>
              {CATEGORIES.map(cat => {
                const count = skills.filter(s =>
                  cat.skillNames.includes(s.name),
                ).length
                const active = activeCategory === cat.label
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => setActiveCategory(cat.label)}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                      active
                        ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 shadow-[0_0_16px_rgba(6,182,212,0.2)] dark:text-cyan-300'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`}
                  >
                    {cat.label} ({count})
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Category Sections */}
        {visibleCategories.map(cat => {
          const catSkills = skills.filter(s => cat.skillNames.includes(s.name))
          if (catSkills.length === 0) return null
          return (
            <CategorySection
              key={cat.label}
              category={cat}
              skills={catSkills}
            />
          )
        })}

        {/* Uncategorized Skills */}
        {activeCategory === 'all' && uncategorized.length > 0 && (
          <UncategorizedSection skills={uncategorized} />
        )}
      </div>
    </section>
  )
}

function CategorySection({
  category,
  skills,
}: {
  category: CategoryConfig
  skills: SkillType[]
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      className="grid grid-cols-1 gap-6 lg:grid-cols-12"
    >
      {/* Category Lead Glass Card (Cols 1-4) */}
      <motion.div
        variants={fadeInUp}
        className="glass-panel flex flex-col justify-between p-6 sm:p-8 lg:col-span-4"
      >
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:text-cyan-300">
              <category.icon className="h-5 w-5" />
            </div>
            <span className="rounded-full border border-slate-200/80 bg-white/60 px-3 py-1 text-xs font-bold text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
              {skills.length} Teknoloji
            </span>
          </div>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {category.label}
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {category.description}
          </p>
        </div>
      </motion.div>

      {/* Skill Cards Grid (Cols 5-12) */}
      <motion.div
        variants={stagger}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8"
      >
        {skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  )
}

function SkillCard({ skill }: { skill: SkillType }) {
  const level = levelConfig[skill.level] ?? levelConfig['Intermediate']

  return (
    <motion.div variants={fadeInUp}>
      <Link
        href={skill.url}
        target="_blank"
        title={skill.name}
        className="block h-full"
      >
        <Card className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:shadow-[0_16px_40px_rgba(6,182,212,0.16)] dark:border-white/[0.08] dark:bg-white/[0.03]">
          <div className="mb-4 flex items-start justify-between gap-2">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200/70 bg-white p-2 shadow-sm dark:border-white/10 dark:bg-white/[0.06]">
              <Image
                src={skill.imageUrl}
                alt={skill.name}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <Badge
              className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${level.badgeClass}`}
            >
              {level.label}
            </Badge>
          </div>

          <div>
            <div className="mb-2 flex items-baseline justify-between gap-2">
              <p className="text-base font-bold tracking-tight text-slate-900 transition-colors group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">
                {skill.name}
              </p>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                {skill.years} yıl
              </span>
            </div>

            {/* Luminous Cyan-to-Emerald Gradient Progress Bar */}
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-200/80 dark:bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-400 shadow-[0_0_12px_rgba(6,182,212,0.5)]"
                style={{ width: `${level.percent}%` }}
              />
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  )
}

function UncategorizedSection({ skills }: { skills: SkillType[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      className="grid grid-cols-1 gap-6 lg:grid-cols-12"
    >
      <motion.div
        variants={fadeInUp}
        className="glass-panel flex flex-col justify-between p-6 sm:p-8 lg:col-span-4"
      >
        <div>
          <span className="mb-2 inline-block text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
            Tamamlayıcı Ekosistem
          </span>
          <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Diğer Teknolojiler
          </h3>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Farklı projelerde ve kurumsal entegrasyonlarda aktif olarak
            kullandığım ek kütüphane, protokol ve araçlar.
          </p>
        </div>
        <span className="mt-4 text-xs font-bold text-slate-500 dark:text-slate-400">
          {skills.length} Teknoloji
        </span>
      </motion.div>

      <motion.div
        variants={stagger}
        className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:col-span-8"
      >
        {skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  )
}
