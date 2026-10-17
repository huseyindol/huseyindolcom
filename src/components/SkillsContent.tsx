import type { SkillType } from '@/schemas/dynamic'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Cloud, Database, Monitor, Server, Wrench } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const levelConfig: Record<string, { label: string; color: string }> = {
  Expert: {
    label: 'Uzman',
    color:
      'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800',
  },
  Advanced: {
    label: 'İleri',
    color:
      'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
  },
  Intermediate: {
    label: 'Orta',
    color:
      'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800',
  },
}

interface CategoryConfig {
  label: string
  description: string
  icon: LucideIcon
  gradient: string
  skillNames: string[]
}

const CATEGORIES: CategoryConfig[] = [
  {
    label: 'Frontend',
    description:
      'React ekosisteminde 8+ yıl deneyimle SSR/SSG/ISR stratejileri, TypeScript ile tip güvenli geliştirme ve modern UI mimarileri üzerine uzmanlaştım.',
    icon: Monitor,
    gradient: 'from-blue-500 to-indigo-600',
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
    gradient: 'from-emerald-500 to-teal-600',
    skillNames: ['Node.js', 'Express', 'Java', 'Spring', 'Prisma'],
  },
  {
    label: 'Veritabanı',
    description:
      'MongoDB, PostgreSQL ve Redis ile veri modelleme, sorgu optimizasyonu ve distributed caching stratejilerinde deneyimliyim.',
    icon: Database,
    gradient: 'from-orange-500 to-amber-600',
    skillNames: ['MongoDB', 'PostgreSQL'],
  },
  {
    label: 'DevOps',
    description:
      'Docker multi-stage build, Kubernetes StatefulSet/HPA, GitHub Actions CI/CD ve Traefik Ingress ile production-grade altyapı yönetimi yapıyorum.',
    icon: Cloud,
    gradient: 'from-violet-500 to-purple-600',
    skillNames: ['Docker', 'Nginx', 'Git'],
  },
  {
    label: 'Araçlar',
    description:
      'Figma ile design-to-code, Postman ile API testing ve MCP ile özel AI araç entegrasyonlarında deneyimliyim.',
    icon: Wrench,
    gradient: 'from-pink-500 to-rose-600',
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
              Teknoloji Yığını
            </Badge>
            <h1 className="mb-5 text-4xl font-extrabold md:text-6xl">
              {title}
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">{description}</p>
          </div>
        </div>
      </section>

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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const isEven = index % 2 === 0

  return (
    <section
      ref={ref}
      className={`py-20 ${isEven ? 'bg-card' : 'bg-muted/30'}`}
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            {/* Category header */}
            <motion.div variants={fadeInUp} className="mb-12">
              <div className="flex items-start gap-5">
                <div
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} shadow-lg`}
                >
                  <category.icon className="h-6 w-6 text-white" />
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
            </motion.div>

            {/* Skill grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
              variants={stagger}
            >
              {skills.map(skill => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function SkillCard({ skill }: { skill: SkillType }) {
  const level = levelConfig[skill.level] ?? levelConfig['Intermediate']

  return (
    <motion.div variants={fadeInUp}>
      <Link href={skill.url} target="_blank" title={skill.name}>
        <Card className="group flex flex-col items-center gap-3 border-0 p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
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
    </motion.div>
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  if (uncategorized.length === 0) return null

  return (
    <section ref={ref} className="bg-card py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.h2
              variants={fadeInUp}
              className="mb-10 text-xl font-bold text-muted-foreground"
            >
              Diğer Teknolojiler
            </motion.h2>
            <motion.div
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              variants={stagger}
            >
              {uncategorized.map(skill => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
