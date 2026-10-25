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
  live: 'bg-primary text-primary-foreground',
  beta: 'bg-foreground text-background',
  soon: 'bg-secondary text-foreground',
}

export default function ProjectsContent() {
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-svh px-2 pb-2 md:px-3">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-2">
        {/* Top Board Header Row */}
        <section className="grid grid-cols-12 gap-2">
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:p-8 lg:col-span-6">
            <div>
              <Badge className="mb-4 rounded-sm border-0 bg-primary px-3 py-1 text-xs font-extrabold text-primary-foreground">
                Açık Kaynak & Ürün Ailesi
              </Badge>
              <h1
                className="mb-3 font-extrabold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2.25rem, 1.2rem + 3.5vw, 4.25rem)' }}
              >
                Projelerim
              </h1>
            </div>
            <p className="max-w-[60ch] text-base leading-relaxed text-muted-foreground md:text-lg">
              Elly ekosistemi ve kişisel projelerim. Backend&apos;den
              mobil&apos;e, admin panelinden portföy sitesine ve WebAssembly
              oyunlarına kadar uçtan uca bir yazılım ailesi.
            </p>
          </div>

          <div className="col-span-12 flex flex-col justify-between gap-2 lg:col-span-6">
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-md bg-primary p-5 text-primary-foreground">
                <p className="text-3xl font-extrabold leading-none">
                  {projects.length}
                </p>
                <p className="mt-2 text-xs font-bold">Toplam Proje</p>
              </div>
              <div className="rounded-md bg-foreground p-5 text-background">
                <p className="text-3xl font-extrabold leading-none text-primary">
                  11
                </p>
                <p className="text-background/80 mt-2 text-xs font-bold">
                  Canlı Sistem
                </p>
              </div>
              <div className="rounded-md bg-card p-5 text-foreground">
                <p className="text-3xl font-extrabold leading-none text-primary">
                  1
                </p>
                <p className="mt-2 text-xs font-bold text-muted-foreground">
                  Flight Test
                </p>
              </div>
            </div>

            <div className="flex flex-1 flex-col justify-between rounded-md bg-card p-5">
              <span className="mb-3 text-xs font-bold text-muted-foreground">
                Hızlı Atlama Panosu
              </span>
              <div className="flex flex-wrap gap-1.5">
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
                    className="rounded-sm bg-secondary px-3 py-2 text-xs font-extrabold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="rounded-md bg-card px-4">
          <AdSenseAd slot="1535119733" />
        </div>

        {/* Project Board Strips */}
        <section>
          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={gridInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="flex flex-col gap-2"
          >
            {projects.map((project, index) => (
              <div key={project.id} className="flex flex-col gap-2">
                <ProjectCard project={project} index={index} />
                {index === 1 && (
                  <div className="rounded-md bg-card px-4">
                    <AdSenseAd slot="5199032579" />
                  </div>
                )}
                {index === 3 && (
                  <div className="rounded-md bg-card px-4">
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = project.icon
  const invertLead = index % 2 === 0

  return (
    <motion.div
      variants={fadeInUp}
      id={project.id}
      className="grid scroll-mt-24 grid-cols-12 gap-2"
    >
      {/* Left Identity Tile (Cols 1-4) */}
      <div
        className={`col-span-12 flex flex-col justify-between rounded-md p-6 md:col-span-4 md:p-8 ${
          invertLead
            ? 'bg-foreground text-background'
            : 'bg-secondary text-foreground'
        }`}
      >
        <div>
          <div className="mb-5 flex items-center justify-between gap-2">
            <div
              className={`inline-flex h-12 w-12 items-center justify-center rounded-sm ${
                invertLead
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-primary'
              }`}
            >
              <Icon className="h-6 w-6" />
            </div>
            <div className="flex items-center gap-1.5">
              {project.engine && (
                <Badge className="rounded-sm border-0 bg-card px-2.5 py-0.5 text-xs font-extrabold text-foreground">
                  {project.engine}
                </Badge>
              )}
              <Badge
                className={`rounded-sm border-0 px-2.5 py-0.5 text-xs font-extrabold ${statusConfig[project.status]}`}
              >
                {project.statusLabel}
              </Badge>
            </div>
          </div>

          <h2 className="mb-1 text-2xl font-extrabold tracking-tight">
            {project.title}
          </h2>
          <p
            className={`text-sm font-semibold ${
              invertLead ? 'text-background/70' : 'text-muted-foreground'
            }`}
          >
            {project.subtitle}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {project.appIcon && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.appIcon}
              alt={project.title}
              className="h-9 w-9 rounded-sm object-cover"
            />
          )}
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              aria-label="GitHub"
              className="flex h-9 w-9 items-center justify-center rounded-sm bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <Github className="h-4 w-4" />
            </Link>
          )}
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-card px-3.5 text-xs font-extrabold text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              {project.liveLabel}
            </Link>
          )}
          {project.ecosystemUrl && (
            <Link
              href={project.ecosystemUrl}
              className="inline-flex h-9 items-center gap-1.5 rounded-sm bg-primary px-3.5 text-xs font-extrabold text-primary-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              <LayersIcon className="h-3.5 w-3.5" />
              Ekosistem
            </Link>
          )}
        </div>
      </div>

      {/* Right Detail Tile (Cols 5-12) */}
      <Card className="col-span-12 flex flex-col justify-between rounded-md border-0 bg-card p-6 md:col-span-8 md:p-8">
        <div>
          <p className="mb-6 max-w-[68ch] text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <ul className="mb-6 grid gap-2 sm:grid-cols-2">
            {project.highlights.map(h => (
              <li
                key={h}
                className="flex items-start gap-2 rounded-sm bg-secondary p-3 text-xs font-semibold text-foreground md:text-sm"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {project.techStack.map(tech => (
            <span
              key={tech}
              className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-bold text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </Card>
    </motion.div>
  )
}
