import {
  KineticScrollBanner,
  KineticScrollItem,
  type KineticTrackItem,
} from '@/components/KineticScrollBanner'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { SkillType } from '@/schemas/dynamic'
import type { LucideIcon } from 'lucide-react'
import { Cloud, Database, Monitor, Server, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const levelConfig: Record<string, { label: string; color: string }> = {
  Expert: {
    label: 'Uzman',
    color:
      'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  },
  Advanced: {
    label: 'İleri',
    color:
      'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-800',
  },
  Intermediate: {
    label: 'Orta',
    color:
      'bg-teal-100 text-teal-700 border-teal-200 dark:bg-teal-900/30 dark:text-teal-300 dark:border-teal-800',
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

const skillsKineticTracks: KineticTrackItem[] = [
  {
    id: 'sk-fe',
    dir: -1,
    speed: 1.4,
    baseOffset: -50,
    tag: 'FRONTEND',
    primary: 'REACT 19 · NEXT.JS 16 · TYPESCRIPT',
    secondary: 'REDUX · TAILWIND CSS 4 · SASS',
  },
  {
    id: 'sk-be',
    dir: 1,
    speed: 1.65,
    baseOffset: 75,
    tag: 'BACKEND',
    primary: 'JAVA 21 · SPRING BOOT 3.5 · NODE.JS',
    secondary: 'EXPRESS · PRISMA · REST & WEBSOCKET',
    accent: true,
  },
  {
    id: 'sk-db',
    dir: -1,
    speed: 1.15,
    baseOffset: -35,
    scaleEffect: true,
    tag: 'DATA LAYER',
    primary: 'POSTGRESQL · REDIS · MONGODB',
    secondary: 'MULTI-TENANT ISOLATION · QUERY TUNING',
  },
  {
    id: 'sk-ops',
    dir: 1,
    speed: 1.75,
    baseOffset: 90,
    tag: 'CLOUD & DEVOPS',
    primary: 'KUBERNETES · DOCKER · NGINX · GIT',
    secondary: 'CI/CD PIPELINES · ZERO-DOWNTIME DEPLOY',
    accent: true,
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
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero header */}
      <section className="brand-hero-surface relative -mt-20 overflow-hidden border-b border-white/10 py-32 pt-32 text-zinc-100 md:py-40 md:pt-40">
        <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="brand-glow-orb pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="brand-badge mb-6 border px-4 py-1.5 text-sm font-medium">
              Teknoloji Yığını
            </Badge>
            <h1 className="mb-5 text-4xl font-black tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="text-lg text-zinc-400 md:text-xl">{description}</p>
          </div>
        </div>
      </section>

      {/* Multi-directional Apple kinetic stream on Skills page */}
      <KineticScrollBanner
        kicker="01 / TEKNOLOJİ MATRİSİ"
        title="Katmanlar arası uzmanlık akışı"
        badge="23 TEKNOLOJİ · 5 KATMAN"
        tracks={skillsKineticTracks}
        ariaLabel="Yetenekler Kinetik Teknoloji Akışı"
      />

      {/* Category sections */}
      <div className="bg-muted/20">
        {CATEGORIES.map((cat, catIdx) => {
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

        {/* Uncategorized skills */}
        <UncategorizedSection skills={skills} categories={CATEGORIES} />
      </div>
    </div>
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
  const isEven = index % 2 === 0

  return (
    <section
      className={`overflow-hidden py-20 ${isEven ? 'bg-card' : 'bg-muted/30'}`}
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          {/* Category header glides in from left or right */}
          <KineticScrollItem side={isEven ? 'left' : 'right'} className="mb-12">
            <div className="flex items-start gap-5">
              <div className="brand-pill-btn flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-lg">
                <category.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="mb-2 text-2xl font-extrabold">
                  {category.label}
                </h2>
                <p className="max-w-2xl text-muted-foreground">
                  {category.description}
                </p>
              </div>
            </div>
          </KineticScrollItem>

          {/* Skill grid — cards alternate left & right on scroll */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {skills.map((skill, idx) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                side={(index + idx) % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({
  skill,
  side,
}: {
  skill: SkillType
  side: 'left' | 'right'
}) {
  const level = levelConfig[skill.level] ?? levelConfig['Intermediate']

  return (
    <KineticScrollItem side={side} intensity={0.7}>
      <Link href={skill.url} target="_blank" title={skill.name}>
        <Card className="border-border/60 group flex flex-col items-center gap-3 border p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${skill.name === 'Express' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
          >
            <Image
              src={skill.imageUrl}
              alt={skill.name}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div>
            <p className="mb-1.5 text-sm font-semibold">{skill.name}</p>
            <Badge variant="outline" className={`text-xs ${level.color}`}>
              {level.label}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground">{skill.years} yıl</p>
        </Card>
      </Link>
    </KineticScrollItem>
  )
}

function UncategorizedSection({
  skills,
  categories,
}: {
  skills: SkillType[]
  categories: CategoryConfig[]
}) {
  const allCategorized = new Set(categories.flatMap(c => c.skillNames))
  const uncategorized = skills.filter(s => !allCategorized.has(s.name))

  if (uncategorized.length === 0) return null

  return (
    <section className="overflow-hidden bg-card py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <KineticScrollItem side="left">
            <h2 className="mb-10 text-xl font-bold text-muted-foreground">
              Diğer Teknolojiler
            </h2>
          </KineticScrollItem>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {uncategorized.map((skill, idx) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                side={idx % 2 === 0 ? 'left' : 'right'}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
