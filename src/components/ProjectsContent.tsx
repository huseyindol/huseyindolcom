import AdSenseAd from '@/components/AdSenseAd'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion, useInView } from 'framer-motion'
import {
  ExternalLinkIcon,
  GamepadIcon,
  GlobeIcon,
  JoystickIcon,
  LayersIcon,
  LayoutDashboardIcon,
  ServerIcon,
  SmartphoneIcon,
} from 'lucide-react'
import { FaGithub as Github } from 'react-icons/fa'
import Link from 'next/link'
import { useRef } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
  gradient: string
  status: 'live' | 'beta' | 'soon'
  statusLabel: string
  techStack: string[]
  highlights: string[]
  liveUrl?: string
  liveLabel?: string
  ecosystemUrl?: string
  githubUrl?: string
  engine?: string
  appIcon?: string
}

const projects: Project[] = [
  {
    id: 'elly-backend',
    title: 'Elly',
    subtitle: 'Headless CMS Backend',
    description:
      'Spring Boot 3.5 + Java 21 üzerine kurulu multitenant headless CMS API. Database-per-tenant mimarisi, RBAC yetkilendirme, Redis cache ve RabbitMQ ile kurumsal ölçekte içerik yönetimi altyapısı.',
    icon: ServerIcon,
    gradient: 'from-emerald-500 to-teal-600',
    status: 'live',
    statusLabel: 'Canlı',
    techStack: [
      'Java 21',
      'Spring Boot 3.5',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'Docker',
      'Kubernetes',
      'JWT & OAuth2',
      'Zipkin',
      'Prometheus',
    ],
    highlights: [
      'Database-per-Tenant multitenant mimarisi',
      'RBAC + OAuth2 (Google/GitHub) entegrasyonu',
      'Redis tenant-aware cache (AOF + LRU)',
      'RabbitMQ async email worker',
    ],
    githubUrl: 'https://github.com/huseyindol/elly',
    liveUrl: 'https://api.huseyindol.com/swagger-ui/index.html',
    liveLabel: 'API Docs',
    ecosystemUrl: '/projects/elly',
  },
  {
    id: 'elly-admin',
    title: 'Elly Admin Panel',
    subtitle: 'Headless CMS Yönetim Paneli',
    description:
      "Elly CMS'in tüm içeriklerini yöneten modern admin paneli. Sayfalar, bileşenler, widget'lar, banner'lar, yazılar ve formları tek arayüzden yönetin. Google Gemini AI entegrasyonu ile içerik üretimi.",
    icon: LayoutDashboardIcon,
    gradient: 'from-blue-500 to-indigo-600',
    status: 'live',
    statusLabel: 'Canlı',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'TanStack Query 5',
      'TipTap 3',
      'Google Gemini AI',
      'Framer Motion',
      'Zod 4',
    ],
    highlights: [
      'Hiyerarşik içerik yönetimi (sayfa → bileşen → widget)',
      'AI destekli makale ve alan içeriği üretimi',
      'Dinamik form oluşturucu (wizard, multi-step, validasyonlu)',
      'SEO metadata yönetimi & canonical URL kontrolü',
    ],
    githubUrl: 'https://github.com/huseyindol/elly-admin-panel',
    liveUrl: 'https://admin.huseyindol.com/login',
    liveLabel: 'Admin Panel',
    ecosystemUrl: '/projects/elly',
  },
  {
    id: 'portfolio',
    title: 'Portfolio Site',
    subtitle: 'Kişisel Portföy & Blog',
    description:
      "Şu an gezdiğiniz site. Elly CMS'den beslenen dinamik sayfa sistemi, MDX tabanlı teknik blog, Framer Motion animasyonları ve Next.js Pages Router mimarisi ile inşa edilmiş modern bir portföy sitesi.",
    icon: GlobeIcon,
    gradient: 'from-violet-500 to-purple-600',
    status: 'live',
    statusLabel: 'Canlı',
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Framer Motion',
      'Shadcn UI',
      'MDX',
      'Vercel',
    ],
    highlights: [
      "Elly CMS'den beslenen dinamik sayfa sistemi",
      'MDX tabanlı teknik blog (24 makale)',
      'getStaticProps & ISR ile 24 saatlik blog önbellekleme',
      'Framer Motion scroll animasyonları',
    ],
    githubUrl: 'https://github.com/huseyindol/huseyindolcom',
    liveUrl: 'https://www.huseyindol.com',
    liveLabel: 'Siteyi Gör',
    ecosystemUrl: '/projects/elly',
  },
  {
    id: 'elly-mobile',
    title: 'Elly Mobile',
    subtitle: 'React Native Mobil Uygulama',
    description:
      'Elly ekosisteminin mobil ayağı. Feature-based mimarisi, type-safe navigation, tam karanlık mod desteği ve React Native Reanimated 3 ile native hissiyatlı animasyonlar.',
    icon: SmartphoneIcon,
    gradient: 'from-pink-500 to-rose-600',
    status: 'soon',
    statusLabel: 'Flight Test',
    techStack: [
      'React Native',
      'Expo',
      'TypeScript',
      'React Navigation v6',
      'Reanimated 3',
      'Zustand',
      'TanStack Query',
    ],
    highlights: [
      'Feature-based modüler mimari',
      'Strongly-typed navigation (compile-time doğrulama)',
      'Deep linking & push notification routing',
      'Karanlık mod odaklı tam tema sistemi',
    ],
    githubUrl: 'https://github.com/huseyindol/elly-mobile-app',
    ecosystemUrl: '/projects/elly',
  },
  {
    id: 'arcade-games',
    title: 'Makas & Park Etme',
    engine: 'Phaser 3',
    subtitle: 'Klasik 2D Oyunlar (Web)',
    description:
      'Next.js Pages Router içerisine entegre edilmiş, Phaser oyun motoru ve Vite ile geliştirilmiş klasik 2D arcade oyunları. Akıcı 60fps oyun deneyimi ve modern web teknolojileri ile tarayıcıda doğrudan oynanabilir.',
    icon: GamepadIcon,
    gradient: 'from-orange-500 to-amber-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: ['Phaser', 'Next.js 16', 'React', 'TypeScript', 'Vite'],
    highlights: [
      'Phaser 2D oyun motoru entegrasyonu',
      "ES Module üzerinden Next.js'e dinamik script aktarımı",
      'Gelişmiş fizik ve animasyon motoru kullanımı',
      'Klavye (yön tuşları) destekli interaktif oynanış',
    ],
    githubUrl: 'https://github.com/huseyindol/huseyindolcom',
    liveUrl: '/games/arcade',
    liveLabel: 'Oyna',
  },
  {
    id: 'godot-engine-games',
    appIcon: '/assets/games/matching/index.icon.png',
    title: 'Eğitici Eşleştirme',
    engine: 'Godot',
    subtitle: 'Eğitici Eşleştirme (Web)',
    description:
      'Godot 4.x ile geliştirilmiş, WebAssembly export üzerinde çalışan eğitici eşleştirme oyunu. 24 seviyede renk, hayvan ve meyve eşleştirme; oturum metrikleri ve final ekranındaki ebeveyn paneli ile öğrenme özetleri.',
    icon: JoystickIcon,
    gradient: 'from-cyan-500 to-sky-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: [
      'Godot 4',
      'GDScript',
      'WebAssembly',
      'HTML5 Canvas',
      'Next.js 16',
    ],
    highlights: [
      'Godot Engine web export (WASM + .pck) ile tek tıkla tarayıcıda çalışma',
      '24 veri odaklı seviye; renk, hayvan ve meyve katalogları',
      'Analytics ve ebeveyn paneli ile doğruluk, tepki süresi ve seri istatistikleri',
      'Eksik asset toleransı: görsel/ses yoksa uyarı ile güvenli düşüş (crash yok)',
    ],
    githubUrl: 'https://github.com/huseyindol/game-ge',
    liveUrl: '/games/matching',
    liveLabel: 'Oyna',
  },
  {
    id: 'crane-arcade',
    appIcon: '/assets/games/crane-arcade/index.icon.png',
    title: 'Crane Arcade',
    engine: 'Godot',
    subtitle: 'Vinç Simülasyonu (Web)',
    description:
      'Godot 4 ile geliştirilmiş vinç (crane) operatörü simülasyon oyunu. Vinç kontrolü ve yük taşıma dinamikleri. Tarayıcıda tam ekran oynanabilir.',
    icon: JoystickIcon,
    gradient: 'from-violet-400 to-fuchsia-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: ['Godot 4', 'GDScript', 'WebAssembly', 'Next.js 16'],
    highlights: [
      'Godot Engine web export ile tarayıcıda doğrudan çalışma',
      'Gerçekçi vinç ve kargo fizikleri',
      'Mobil ve masaüstü uyumlu web arayüzü',
    ],
    liveUrl: '/games/crane-arcade',
    liveLabel: 'Oyna',
  },
  {
    id: 'flutter-games',
    appIcon: '/assets/games/tumble-trail/icons/Icon-192.png',
    title: 'Tumble Trail 4x4',
    engine: 'Flutter',
    subtitle: 'Tumble Trail 4x4 (Web)',
    description:
      'Tumble Trail 4x4: sonsuz dağ yolunda 2.5D 4x4 macera. Süspansiyonu ayarla, kayaların üstünden tırman, devrilmeden ve yakıtı bitirmeden ilerle; jetonlarla garajda aracını geliştir. Flutter Web ile tarayıcıda doğrudan oynanabilir.',
    icon: GamepadIcon,
    gradient: 'from-blue-400 to-cyan-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: ['Flutter', 'Dart', 'WebAssembly', 'Next.js 16'],
    highlights: [
      'Flutter Web export ile tarayıcıda doğrudan çalışma',
      'Fizik tabanlı araç kontrolü ve dinamikleri',
      'Mobil ve masaüstü uyumlu web arayüzü',
    ],
    liveUrl: '/games/tumble-trail',
    liveLabel: 'Oyna',
  },
  {
    id: 'hyper-drift-arcade',
    appIcon: '/assets/games/hyper-drift-arcade/icons/Icon-192.png',
    title: 'Hyper Drift: Arcade',
    engine: 'Flutter',
    subtitle: 'Hyper Drift: Arcade (Web)',
    description:
      'Flutter Web ile geliştirilmiş Hyper Drift: Arcade oyunu. Harika fizikler ve drift mekanikleri. Tarayıcıda tam ekran oynanabilir.',
    icon: GamepadIcon,
    gradient: 'from-orange-400 to-red-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: ['Flutter', 'Dart', 'WebAssembly', 'Next.js 16'],
    highlights: [
      'Flutter Web export ile tarayıcıda doğrudan çalışma',
      'Drift mekanikleri ve araç fizikleri',
      'Mobil ve masaüstü uyumlu web arayüzü',
    ],
    liveUrl: '/games/hyper-drift-arcade',
    liveLabel: 'Oyna',
  },
  {
    id: 'soccer-freekick',
    appIcon: '/assets/games/soccer-freekick/icons/Icon-192.png',
    title: 'Soccer Freekick',
    engine: 'Flutter',
    subtitle: 'Frikik Simülasyonu (Web)',
    description:
      'Flutter Web ile geliştirilmiş futbol frikik atış oyunu. Akıcı top fiziği, baraj mekanikleri ve hedef vurma heyecanı. Tarayıcıda tam ekran oynanabilir.',
    icon: GamepadIcon,
    gradient: 'from-green-400 to-emerald-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: ['Flutter', 'Dart', 'WebAssembly', 'Next.js 16'],
    highlights: [
      'Flutter Web export ile tarayıcıda doğrudan çalışma',
      'Akıcı şut ve top dinamikleri',
      'Mobil ve masaüstü uyumlu web arayüzü',
    ],
    liveUrl: '/games/soccer-freekick',
    liveLabel: 'Oyna',
  },
  {
    id: 'wet-paint',
    appIcon: '/assets/games/wet-paint/icons/Icon-192.png',
    title: 'Wet Paint',
    engine: 'Flutter',
    subtitle: 'Boyama ve Bulmaca (Web)',
    description:
      'Flutter Web ile geliştirilmiş eğlenceli boyama ve bulmaca oyunu. Renkleri karıştırma ve yaratıcılığınızı konuşturma fırsatı. Tarayıcıda tam ekran oynanabilir.',
    icon: GamepadIcon,
    gradient: 'from-pink-400 to-rose-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: ['Flutter', 'Dart', 'WebAssembly', 'Next.js 16'],
    highlights: [
      'Flutter Web export ile tarayıcıda doğrudan çalışma',
      'Eğlenceli boyama mekanikleri ve bulmacalar',
      'Mobil ve masaüstü uyumlu web arayüzü',
    ],
    liveUrl: '/games/wet-paint',
    liveLabel: 'Oyna',
  },
  {
    id: 'hamur-usta',
    appIcon: '/assets/games/hamur-usta/icons/Icon-192.png',
    title: 'Hamur Usta',
    engine: 'Flutter',
    subtitle: 'Renk Karıştırma (Web Demo)',
    description:
      'Flutter ve Flame ile geliştirilmiş renk karıştırma oyunu. Kavanozlardan hamur topu al, kasede parmağınla yoğur, hedef rengi yap ve hikâye kitabını renklendir. Web demosunda ilk 3 seviye oynanır; tam oyun yakında App Store’da.',
    icon: GamepadIcon,
    gradient: 'from-emerald-400 to-teal-600',
    status: 'live',
    statusLabel: 'Oyna',
    techStack: ['Flutter', 'Flame', 'Dart', 'Next.js 16'],
    highlights: [
      'RYB pigment modeliyle gerçekçi renk karışımı',
      'Parmakla daire çizerek yoğurma ve anlık uyum emojisi',
      'Prosedürel kil görünümlü hikâye kitabı',
    ],
    liveUrl: '/games/hamur-usta',
    liveLabel: 'Oyna',
  },
]

const statusConfig = {
  live: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  beta: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  soon: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
}

export default function ProjectsContent() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative -mt-20 overflow-hidden border-b border-white/10 bg-zinc-950 py-32 pt-32 text-zinc-100 md:py-40 md:pt-40">
        <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-6 border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-200">
              Açık Kaynak
            </Badge>
            <h1 className="mb-5 text-4xl font-black tracking-tight md:text-6xl">
              Projelerim
            </h1>
            <p className="text-lg text-zinc-400 md:text-xl">
              Elly ekosistemi ve kişisel projelerim. Backend'den mobil'e, admin
              panelinden portföy sitesine kadar uçtan uca bir yazılım ailesi.
            </p>

            <div className="mt-10 flex justify-center gap-8 text-sm text-slate-400">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">9</p>
                <p>Proje</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">8</p>
                <p>Canlı</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-white">1</p>
                <p>Flight Test</p>
              </div>
            </div>

            {/* Project Inline Tags */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-2 md:gap-3">
              {[
                {
                  label: 'Elly Backend',
                  color: 'emerald',
                  icon: ServerIcon,
                  target: 'elly-backend',
                },
                {
                  label: 'Admin Panel',
                  color: 'blue',
                  icon: LayoutDashboardIcon,
                  target: 'elly-admin',
                },
                {
                  label: 'Portfolio Site',
                  color: 'violet',
                  icon: GlobeIcon,
                  target: 'portfolio',
                },
                {
                  label: 'Mobile App',
                  color: 'pink',
                  icon: SmartphoneIcon,
                  target: 'elly-mobile',
                },
                {
                  label: 'Arcade Games',
                  color: 'orange',
                  icon: GamepadIcon,
                  target: 'arcade-games',
                },
                {
                  label: 'Godot Games',
                  color: 'cyan',
                  icon: JoystickIcon,
                  target: 'godot-engine-games',
                },
                {
                  label: 'Flutter Games',
                  color: 'blue',
                  icon: GamepadIcon,
                  target: 'flutter-games',
                },
              ].map((item, idx, items) => (
                <div
                  key={item.target}
                  className="flex items-center gap-2 md:gap-3"
                >
                  <div
                    onClick={() => {
                      document
                        .getElementById(item.target)
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className={`flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold backdrop-blur-md transition-all hover:scale-105 md:text-xs ${
                      item.color === 'emerald'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                        : item.color === 'blue'
                          ? 'border-blue-500/30 bg-blue-500/10 text-blue-300'
                          : item.color === 'violet'
                            ? 'border-violet-500/30 bg-violet-500/10 text-violet-300'
                            : item.color === 'pink'
                              ? 'border-pink-500/30 bg-pink-500/10 text-pink-300'
                              : item.color === 'cyan'
                                ? 'border-cyan-500/35 bg-cyan-500/10 text-cyan-200'
                                : 'border-orange-500/50 bg-orange-500/20 text-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.4)] ring-1 ring-orange-500/40'
                    }`}
                  >
                    <item.icon
                      className={`h-4 w-4 ${item.color === 'orange' ? 'animate-pulse' : ''}`}
                    />
                    {item.label}
                  </div>
                  {idx !== items.length - 1 && (
                    <div className="hidden h-px w-3 bg-slate-700/50 xl:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ad — ekosistem bölümü sonrası (üst) */}

      {/* Ad — ekosistem bölümü sonrası (üst) */}
      <div className="container mx-auto max-w-5xl px-6">
        <AdSenseAd slot="1535119733" />
      </div>

      {/* Project cards */}
      <section className="bg-muted/20 py-20">
        <div className="container mx-auto px-6">
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="mx-auto max-w-5xl space-y-8"
          >
            {projects.map((project, index) => (
              <>
                <ProjectCard key={project.id} project={project} />
                {index === 1 && (
                  <div key="ad-mid">
                    <AdSenseAd slot="5199032579" />
                  </div>
                )}
                {index === 3 && (
                  <div key="ad-bottom">
                    <AdSenseAd slot="8283314736" />
                  </div>
                )}
              </>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon

  return (
    <motion.div variants={fadeInUp} id={project.id} className="scroll-mt-24">
      <Card className="overflow-hidden border-0 shadow-sm transition-shadow duration-300 hover:shadow-lg">
        <div className="flex flex-col md:flex-row">
          {/* Left accent */}
          <div
            className={`flex w-full items-center justify-center bg-gradient-to-br p-8 md:w-52 md:shrink-0 ${project.gradient}`}
          >
            <Icon className="h-16 w-16 text-white/90" />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-6 md:p-8">
            <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="text-xl font-extrabold">{project.title}</h3>
                  <Badge
                    className={`border-0 text-xs font-semibold ${statusConfig[project.status]}`}
                  >
                    {project.statusLabel}
                  </Badge>
                  {project.engine && (
                    <Badge className="border-0 bg-slate-200/50 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/50 dark:text-slate-300 dark:ring-slate-700">
                      {project.engine}
                    </Badge>
                  )}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {project.subtitle}
                </p>
              </div>

              <div className="flex items-center gap-4">
                {project.appIcon && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={project.appIcon}
                    alt="App Icon"
                    className="ring-border/50 h-10 w-10 rounded-xl object-cover shadow-sm ring-1"
                  />
                )}
                <div className="flex gap-2">
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      aria-label="GitHub"
                      className="hover:border-foreground/30 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Github className="h-4 w-4" />
                    </Link>
                  )}
                  {project.liveUrl && (
                    <Link
                      href={project.liveUrl}
                      target="_blank"
                      className="hover:border-foreground/30 inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-muted px-4 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLinkIcon className="h-3.5 w-3.5" />
                      {project.liveLabel}
                    </Link>
                  )}
                  {project.ecosystemUrl && (
                    <Link
                      href={project.ecosystemUrl}
                      className="flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-4 text-xs font-bold text-white shadow-md shadow-emerald-500/20 transition-all hover:scale-105 hover:shadow-emerald-500/40"
                    >
                      <LayersIcon className="h-3.5 w-3.5" />
                      Ekosistem
                    </Link>
                  )}
                </div>
              </div>
            </div>

            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {/* Highlights */}
            <ul className="mb-5 space-y-1.5">
              {project.highlights.map(h => (
                <li
                  key={h}
                  className="flex items-start gap-2 text-sm text-foreground"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
