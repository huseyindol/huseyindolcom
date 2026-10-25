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

const levelConfig: Record<string, { label: string; badgeClass: string }> = {
  Expert: {
    label: 'Uzman',
    badgeClass: 'bg-primary text-primary-foreground',
  },
  Advanced: {
    label: 'İleri',
    badgeClass: 'bg-foreground text-background',
  },
  Intermediate: {
    label: 'Orta',
    badgeClass: 'bg-secondary text-foreground',
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
      className="px-2 pb-2 md:px-3"
    >
      <div className="mx-auto flex max-w-[1680px] flex-col gap-2">
        {/* Top Board Header + Interactive Category Filter Tile */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:p-8 lg:col-span-5">
            <div>
              <span className="mb-2 inline-block rounded-sm bg-secondary px-2.5 py-1 text-xs font-extrabold text-primary">
                Teknoloji Matrisi · {skills.length} Yetkinlik
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

          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:p-8 lg:col-span-7">
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-muted-foreground">
                Disipline Göre Filtrele
              </span>
              <span className="text-xs font-extrabold text-primary">
                {activeCategory === 'all' ? 'Tüm Disiplinler' : activeCategory}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`flex h-12 flex-col justify-between rounded-sm p-2.5 text-left text-xs font-extrabold transition-colors ${
                  activeCategory === 'all'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-foreground hover:bg-foreground hover:text-background'
                }`}
              >
                <span>Tümü</span>
                <span className="opacity-80">{skills.length}</span>
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
                    className={`flex h-12 flex-col justify-between rounded-sm p-2.5 text-left text-xs font-extrabold transition-colors ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-foreground hover:bg-foreground hover:text-background'
                    }`}
                  >
                    <span className="truncate">{cat.label}</span>
                    <span className="opacity-80">{count}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Category Tile Rows */}
        {visibleCategories.map((cat, catIdx) => {
          const catSkills = skills.filter(s => cat.skillNames.includes(s.name))
          if (catSkills.length === 0) return null
          return (
            <CategorySection
              key={cat.label}
              category={cat}
              skills={catSkills}
              index={catIdx}
            />
          )
        })}

        {/* Uncategorized Skills Board Row */}
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
  index,
}: {
  category: CategoryConfig
  skills: SkillType[]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const invertLead = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger}
      className="grid grid-cols-12 gap-2"
    >
      {/* Category Lead Tile (Cols 1-4) */}
      <motion.div
        variants={fadeInUp}
        className={`col-span-12 flex flex-col justify-between rounded-md p-6 md:p-8 lg:col-span-4 ${
          invertLead
            ? 'bg-foreground text-background'
            : 'bg-secondary text-foreground'
        }`}
      >
        <div>
          <div className="mb-5 flex items-center justify-between">
            <div
              className={`inline-flex h-11 w-11 items-center justify-center rounded-sm ${
                invertLead
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-primary'
              }`}
            >
              <category.icon className="h-5 w-5" />
            </div>
            <span
              className={`text-xs font-extrabold ${
                invertLead ? 'text-background/70' : 'text-muted-foreground'
              }`}
            >
              {skills.length} Teknoloji
            </span>
          </div>
          <h3 className="mb-2 text-2xl font-extrabold tracking-tight">
            {category.label}
          </h3>
          <p
            className={`text-sm leading-relaxed ${
              invertLead ? 'text-background/75' : 'text-muted-foreground'
            }`}
          >
            {category.description}
          </p>
        </div>
      </motion.div>

      {/* Skill Tiles Grid (Cols 5-12) */}
      <motion.div
        variants={stagger}
        className="col-span-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:col-span-8"
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
        <Card className="group flex h-full flex-col justify-between rounded-md border-0 bg-card p-4 transition-colors duration-200 hover:bg-primary hover:text-primary-foreground md:p-5">
          <div className="mb-5 flex items-start justify-between gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-secondary p-1.5 transition-colors group-hover:bg-background">
              <Image
                src={skill.imageUrl}
                alt={skill.name}
                width={28}
                height={28}
                className="object-contain"
              />
            </div>
            <Badge
              className={`rounded-sm border-0 px-2 py-0.5 text-xs font-extrabold ${level.badgeClass}`}
            >
              {level.label}
            </Badge>
          </div>

          <div>
            <p className="text-base font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary-foreground">
              {skill.name}
            </p>
            <p className="group-hover:text-primary-foreground/85 mt-0.5 text-xs font-semibold text-muted-foreground transition-colors">
              {skill.years} yıl deneyim
            </p>
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
      className="grid grid-cols-12 gap-2"
    >
      <motion.div
        variants={fadeInUp}
        className="col-span-12 flex flex-col justify-between rounded-md bg-secondary p-6 md:p-8 lg:col-span-4"
      >
        <div>
          <span className="mb-2 inline-block text-xs font-extrabold text-primary">
            Tamamlayıcı Ekosistem
          </span>
          <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-foreground">
            Diğer Teknolojiler
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Farklı projelerde ve kurumsal entegrasyonlarda aktif olarak
            kullandığım ek kütüphane, protokol ve araçlar.
          </p>
        </div>
        <span className="mt-4 text-xs font-extrabold text-muted-foreground">
          {skills.length} Teknoloji
        </span>
      </motion.div>

      <motion.div
        variants={stagger}
        className="col-span-12 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:col-span-8"
      >
        {skills.map(skill => (
          <SkillCard key={skill.name} skill={skill} />
        ))}
      </motion.div>
    </motion.div>
  )
}
