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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

interface Project {
  id: string
  title: string
  subtitle: string
  description: string
  icon: React.ElementType
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
  live: 'border border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300',
  beta: 'border border-cyan-500/30 bg-cyan-500/15 text-cyan-700 dark:text-cyan-300',
  soon: 'border border-amber-500/30 bg-amber-500/15 text-amber-700 dark:text-amber-300',
}

export default function ProjectsContent() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-svh px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        {/* Radial Spotlight Glass Header */}
        <section className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 left-1/2 h-72 w-[680px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/25 via-sky-400/15 to-emerald-500/20 blur-3xl"
          />

          <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <Badge className="mb-4 rounded-full border border-cyan-500/30 bg-cyan-500/15 px-3.5 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                Açık Kaynak & Ürün Ailesi
              </Badge>
              <h1
                className="mb-3 font-extrabold tracking-tight text-slate-900 dark:text-white"
                style={{ fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4rem)' }}
              >
                Projelerim
              </h1>
              <p className="max-w-[58ch] text-base leading-relaxed text-slate-600 md:text-lg dark:text-slate-300">
                Elly ekosistemi ve kişisel projelerim. Backend&apos;den
                mobil&apos;e, admin panelinden portföy sitesine ve WebAssembly
                oyunlarına kadar uçtan uca bir yazılım ailesi.
              </p>
            </div>

            <div className="flex flex-col gap-4 lg:col-span-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-3xl font-extrabold leading-none text-transparent">
                    {projects.length}
                  </p>
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    Toplam Proje
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-3xl font-extrabold leading-none text-transparent">
                    11
                  </p>
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    Canlı Sistem
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-200/80 bg-white/70 p-4 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.04]">
                  <p className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-3xl font-extrabold leading-none text-transparent">
                    1
                  </p>
                  <p className="mt-2 text-xs font-bold text-slate-600 dark:text-slate-300">
                    Flight Test
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-2 backdrop-blur-xl dark:border-white/[0.08] dark:bg-slate-950/60">
                {[
                  { label: 'Elly Backend', target: 'elly-backend' },
                  { label: 'Admin Panel', target: 'elly-admin' },
                  { label: 'Portfolio Site', target: 'portfolio' },
                  { label: 'Mobile App', target: 'elly-mobile' },
                  { label: 'Arcade Games', target: 'arcade-games' },
                  { label: 'Godot Games', target: 'godot-engine-games' },
                  { label: 'Flutter Games', target: 'flutter-games' },
                ].map(item => (
                  <button
                    key={item.target}
                    type="button"
                    onClick={() => {
                      document
                        .getElementById(item.target)
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    className="rounded-full border border-slate-200/70 bg-white/80 px-3 py-1.5 text-xs font-bold text-slate-700 transition-all hover:border-cyan-400/50 hover:text-cyan-600 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-200 dark:hover:text-cyan-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="glass-panel px-4">
          <AdSenseAd slot="1535119733" />
        </div>

        {/* Specular Glass Project Showcase Cards */}
        <section>
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="flex flex-col gap-6"
          >
            {projects.map((project, index) => (
              <div key={project.id} className="flex flex-col gap-6">
                <ProjectCard project={project} />
                {index === 1 && (
                  <div className="glass-panel px-4">
                    <AdSenseAd slot="5199032579" />
                  </div>
                )}
                {index === 3 && (
                  <div className="glass-panel px-4">
                    <AdSenseAd slot="8283314736" />
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const Icon = project.icon

  return (
    <motion.div variants={fadeInUp} id={project.id} className="scroll-mt-24">
      <Card className="group relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 sm:p-8 dark:border-white/[0.08] dark:bg-white/[0.03]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Left Identity Column (Cols 1-4) */}
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white/60 p-6 backdrop-blur-md lg:col-span-4 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <div>
              <div className="mb-5 flex items-center justify-between gap-2">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:text-cyan-300">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex items-center gap-1.5">
                  {project.engine && (
                    <Badge className="rounded-full border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-0.5 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                      {project.engine}
                    </Badge>
                  )}
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${statusConfig[project.status]}`}
                  >
                    {project.statusLabel}
                  </Badge>
                </div>
              </div>

              <h2 className="mb-1 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {project.title}
              </h2>
              <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                {project.subtitle}
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.appIcon && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={project.appIcon}
                  alt={project.title}
                  className="h-9 w-9 rounded-xl border border-white/15 object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
                />
              )}
              {project.githubUrl && (
                <Link
                  href={project.githubUrl}
                  target="_blank"
                  aria-label="GitHub"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-700 transition-colors hover:border-cyan-400 hover:text-cyan-500 dark:border-white/10 dark:bg-white/[0.06] dark:text-slate-200"
                >
                  <Github className="h-4 w-4" />
                </Link>
              )}
              {project.liveUrl && (
                <Link
                  href={project.liveUrl}
                  target="_blank"
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 text-xs font-bold text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02]"
                >
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                  {project.liveLabel}
                </Link>
              )}
              {project.ecosystemUrl && (
                <Link
                  href={project.ecosystemUrl}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 text-xs font-bold text-cyan-700 transition-colors hover:bg-cyan-500/20 dark:text-cyan-300"
                >
                  <LayersIcon className="h-3.5 w-3.5" />
                  Ekosistem
                </Link>
              )}
            </div>
          </div>

          {/* Right Detail Column (Cols 5-12) */}
          <div className="flex flex-col justify-between lg:col-span-8">
            <div>
              <p className="mb-6 max-w-[68ch] text-base leading-relaxed text-slate-600 dark:text-slate-300">
                {project.description}
              </p>

              <ul className="mb-6 grid gap-3 sm:grid-cols-2">
                {project.highlights.map(h => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 rounded-2xl border border-slate-200/70 bg-white/60 p-3.5 text-xs font-semibold text-slate-700 md:text-sm dark:border-white/[0.07] dark:bg-white/[0.02] dark:text-slate-200"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-300"
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
