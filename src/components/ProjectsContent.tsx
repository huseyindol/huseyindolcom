import AdSenseAd from '@/components/AdSenseAd'
import {
  KineticScrollBanner,
  KineticScrollItem,
  type KineticTrackItem,
} from '@/components/KineticScrollBanner'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useUrlQueryParam } from '@/hooks/useUrlQueryParam'
import {
  ArrowRightIcon,
  BotIcon,
  ExternalLinkIcon,
  GamepadIcon,
  GlobeIcon,
  JoystickIcon,
  LayersIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  ListIcon,
  RadarIcon,
  SearchIcon,
  ServerIcon,
  ShieldAlertIcon,
  SmartphoneIcon,
  SparklesIcon,
  TerminalIcon,
  XIcon,
} from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { FaGithub as Github } from 'react-icons/fa'

export type ProjectCategory = 'skills' | 'ecosystem' | 'games'

interface Project {
  id: string
  category: ProjectCategory
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
  detailUrl?: string
  detailLabel?: string
  ecosystemUrl?: string
  githubUrl?: string
  engine?: string
  appIcon?: string
}

const projects: Project[] = [
  {
    id: 'vuln-guardian',
    category: 'skills',
    title: 'VulnGuardian',
    subtitle: 'AI Agent Skill & Otonom Zafiyet Komut Merkezi',
    description:
      'Çok dilli yazılım projelerinin (npm/Bun, Maven, Pub, PyPI, Go, Cargo) bağımlılıklarını canlı Google OSV.dev, GitHub GHSA ve NVD/CVE veritabanlarına karşı tarayan; breaking-change ve site çalışabilirlik kapısından geçirerek PR mail spam’i olmadan tek seferde güvenli (safe) versiyona yükselten AI Agent Skill (Antigravity & Claude Code) ve Next.js 16 Web Komut Merkezi.',
    icon: ShieldAlertIcon,
    gradient: 'from-teal-500 to-emerald-600',
    status: 'live',
    statusLabel: 'Açık Kaynak · Canlı',
    engine: 'Agent Skill',
    techStack: [
      'Antigravity Skill',
      'Claude Code Skill',
      'Next.js 16',
      'TypeScript',
      'OSV.dev API',
      'GHSA & CVE',
      'Node.js CLI',
      'GitHub API',
    ],
    highlights: [
      '6 dil & ekosistem desteği (npm, Maven, Pub, PyPI, Go, Cargo)',
      'Single-Batch Safe-Version: PR spam’i olmadan tek commit ile güncelleme',
      '5 aşamalı Breaking-Change, CI Build ve HTTP 200 Smoke kontrol kapısı',
      'Self-hosted Next.js 16 Web Komut Merkezi & günlük otomatik tarama',
    ],
    githubUrl: 'https://github.com/huseyindol/vuln-guardian',
    liveUrl: 'https://skillstudio-zeta.vercel.app',
    liveLabel: 'Komut Merkezi',
    detailUrl: '/projects/vuln-guardian',
    detailLabel: 'Skill Detayı',
  },
  {
    id: 'elly-backend',
    category: 'ecosystem',
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
    category: 'ecosystem',
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
    category: 'ecosystem',
    title: 'Portfolio Site',
    subtitle: 'Kişisel Portföy & Blog',
    description:
      "Şu an gezdiğiniz site. Elly CMS'den beslenen dinamik sayfa sistemi, MDX tabanlı teknik blog, Kinetik Tipografi animasyonları ve Next.js Pages Router mimarisi ile inşa edilmiş modern bir portföy sitesi.",
    icon: GlobeIcon,
    gradient: 'from-teal-600 to-cyan-600',
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
      'Apple tarzı Kinetik Tipografi & Scrollytelling akışı',
    ],
    githubUrl: 'https://github.com/huseyindol/huseyindolcom',
    liveUrl: 'https://www.huseyindol.com',
    liveLabel: 'Siteyi Gör',
    ecosystemUrl: '/projects/elly',
  },
  {
    id: 'elly-mobile',
    category: 'ecosystem',
    title: 'Elly Mobile',
    subtitle: 'Mobil Yönetim Uygulaması',
    description:
      'Elly ekosisteminin mobil ayağı. Tüm CMS modülleri, STOMP canlı destek sohbeti, WebRTC görüntülü görüşme ve iOS PushKit/CallKit VoIP entegrasyonu ile tam kapsamlı mobil yönetim deneyimi.',
    icon: SmartphoneIcon,
    gradient: 'from-pink-500 to-rose-600',
    status: 'soon',
    statusLabel: 'Flight Test',
    techStack: [
      'Flutter 3',
      'Dart',
      'Provider',
      'WebRTC',
      'STOMP WebSocket',
      'iOS CallKit & PushKit',
      'React Native',
    ],
    highlights: [
      'Admin panel ile %100 modül ve RBAC yetki paritesi',
      'iOS CallKit & PushKit VoIP arka plan görüntülü çağrı desteği',
      'STOMP üzerinden gerçek zamanlı bildirim ve canlı destek',
      'Karanlık mod odaklı tam tema sistemi',
    ],
    githubUrl: 'https://github.com/huseyindol/elly-mobile-app',
    ecosystemUrl: '/projects/elly',
  },
  {
    id: 'arcade-games',
    category: 'games',
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
    category: 'games',
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
    category: 'games',
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
    category: 'games',
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
    category: 'games',
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
    category: 'games',
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
    category: 'games',
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
    category: 'games',
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

const CATEGORY_TABS: Array<{
  id: 'all' | ProjectCategory
  label: string
  icon: React.ElementType
}> = [
  { id: 'all', label: 'Tümü', icon: LayersIcon },
  { id: 'skills', label: 'AI & Agent Skills', icon: BotIcon },
  { id: 'ecosystem', label: 'Elly Ekosistemi', icon: ServerIcon },
  { id: 'games', label: 'Web Oyunları', icon: GamepadIcon },
]

const ENGINE_FILTERS = ['Tümü', 'Flutter', 'Godot', 'Phaser 3'] as const

const statusConfig = {
  live: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  beta: 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300',
  soon: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300',
}

const projectsKineticTracks: KineticTrackItem[] = [
  {
    id: 'prj-skill',
    dir: -1,
    speed: 1.45,
    baseOffset: -55,
    tag: 'AI AGENT SKILLS',
    primary: 'VULNGUARDIAN · OSV.DEV & CVE AUTO-REMEDIATION',
    secondary: 'ANTIGRAVITY & CLAUDE CODE · SINGLE-BATCH DEPLOY',
    accent: true,
  },
  {
    id: 'prj-elly',
    dir: 1,
    speed: 1.65,
    baseOffset: 75,
    tag: 'HEADLESS CMS',
    primary: 'ELLY MULTI-TENANT ARCHITECTURE',
    secondary: 'SPRING BOOT 3.5 · JAVA 21 · NEXT.JS 16 · FLUTTER',
  },
  {
    id: 'prj-games',
    dir: -1,
    speed: 1.2,
    baseOffset: -30,
    scaleEffect: true,
    tag: 'GAME ENGINE',
    primary: 'GODOT ENGINE & FLUTTER ARCADE GAMES',
    secondary: 'APP STORE · TESTFLIGHT · WEBASSEMBLY',
  },
  {
    id: 'prj-open',
    dir: 1,
    speed: 1.8,
    baseOffset: 90,
    tag: 'OPEN SOURCE STUDIO',
    primary: '13 PROJE · 12 CANLI · UÇTAN UCA EKOSİSTEM',
    secondary: 'CLEAN ARCHITECTURE · CI/CD · KUBERNETES',
    accent: true,
  },
]

function syncFilterUrl(url: string) {
  try {
    window.history.replaceState(window.history.state, '', url)
  } catch {
    // URL güncellenemezse filtre yine çalışır
  }
}

export default function ProjectsContent() {
  const urlCategory = useUrlQueryParam('category') as
    ProjectCategory | undefined
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | ProjectCategory | null
  >(null)
  const [engineFilter, setEngineFilter] = useState<string>('Tümü')
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const activeCategory: 'all' | ProjectCategory =
    selectedCategory === null
      ? urlCategory && ['skills', 'ecosystem', 'games'].includes(urlCategory)
        ? urlCategory
        : 'all'
      : selectedCategory

  const handleSelectCategory = (cat: 'all' | ProjectCategory) => {
    setSelectedCategory(cat)
    if (cat !== 'games' && cat !== 'all') {
      setEngineFilter('Tümü')
    }
    syncFilterUrl(
      cat === 'all'
        ? '/projects'
        : `/projects?category=${encodeURIComponent(cat)}`,
    )
  }

  const categoryCounts = useMemo(() => {
    return {
      all: projects.length,
      skills: projects.filter(p => p.category === 'skills').length,
      ecosystem: projects.filter(p => p.category === 'ecosystem').length,
      games: projects.filter(p => p.category === 'games').length,
    }
  }, [])

  const filteredProjects = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return projects.filter(project => {
      if (activeCategory !== 'all' && project.category !== activeCategory) {
        return false
      }
      if (engineFilter !== 'Tümü' && project.engine !== engineFilter) {
        return false
      }
      if (!q) return true
      const haystack = [
        project.title,
        project.subtitle,
        project.description,
        project.engine ?? '',
        ...project.techStack,
        ...project.highlights,
      ]
        .join(' ')
        .toLowerCase()
      return haystack.includes(q)
    })
  }, [activeCategory, engineFilter, searchQuery])

  const jumpToProject = (project: Project) => {
    if (activeCategory !== 'all' && activeCategory !== project.category) {
      setSelectedCategory('all')
      syncFilterUrl('/projects')
    }
    if (engineFilter !== 'Tümü' && project.engine !== engineFilter) {
      setEngineFilter('Tümü')
    }
    if (searchQuery) {
      setSearchQuery('')
    }
    setTimeout(() => {
      document
        .getElementById(project.id)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 60)
  }

  const totalCount = projects.length
  const liveCount = projects.filter(p => p.status === 'live').length
  const flightCount = projects.filter(p => p.status === 'soon').length

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="brand-hero-surface relative -mt-20 overflow-hidden border-b border-white/10 py-28 pt-32 text-zinc-100 md:py-36 md:pt-40">
        <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-50" />
        <div className="brand-glow-orb pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full blur-3xl" />

        <div className="container relative mx-auto px-6">
          <div className="mx-auto max-w-4xl text-center">
            <Badge className="brand-badge mb-6 border px-4 py-1.5 text-sm font-medium">
              Açık Kaynak · AI Agent Skills · Ekosistem
            </Badge>
            <h1 className="mb-5 text-4xl font-black tracking-tight md:text-6xl">
              Projelerim &amp; Skill Stüdyosu
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-400 md:text-xl">
              AI Agent Skill çalışmalarım (
              <strong className="text-zinc-200">VulnGuardian</strong>), Elly
              multi-tenant CMS ekosistemi ve tarayıcıda doğrudan oynanabilen
              WebAssembly oyunlarım.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
              <div className="text-center">
                <p className="brand-text-accent text-2xl font-black">
                  {totalCount}
                </p>
                <p>Toplam Proje</p>
              </div>
              <div className="text-center">
                <p className="brand-text-accent text-2xl font-black">
                  {liveCount}
                </p>
                <p>Canlı</p>
              </div>
              <div className="text-center">
                <p className="brand-text-accent text-2xl font-black">
                  {categoryCounts.skills}
                </p>
                <p>AI Agent Skill</p>
              </div>
              <div className="text-center">
                <p className="brand-text-accent text-2xl font-black">
                  {flightCount}
                </p>
                <p>Flight Test</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Multi-directional Apple kinetic stream on Projects page */}
      <KineticScrollBanner
        kicker="01 / AGENT SKILL · EKOSİSTEM · OYUN MİMARİSİ"
        title="Otonom AI ajan yeteneklerinden multi-tenant backend ve oyun motorlarına canlı akış"
        badge={`${totalCount} PROJE · 4 KATEGORİ`}
        tracks={projectsKineticTracks}
        ariaLabel="Projeler Kinetik Akışı"
      />

      {/* AI Agent Skill Studio Spotlight Section */}
      <section
        id="skill-studio"
        className="border-b border-border bg-gradient-to-b from-teal-500/[0.06] via-background to-background py-14"
      >
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            <KineticScrollItem side="left">
              <div className="relative overflow-hidden rounded-3xl border border-teal-500/30 bg-zinc-950 p-6 text-zinc-100 shadow-2xl md:p-10">
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-teal-500/15 blur-3xl" />

                <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                  <div className="max-w-2xl space-y-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-teal-400/35 bg-teal-500/15 px-3 py-1 font-mono text-xs font-bold text-teal-300">
                        <SparklesIcon className="h-3.5 w-3.5" />
                        YENİ · AI AGENT SKILL ÇALIŞMALARI (SKILL STUDIO)
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-[11px] text-zinc-300">
                        Antigravity &amp; Claude Code
                      </span>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="h-13 w-13 flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-emerald-600 text-zinc-950 shadow-lg shadow-teal-500/25">
                        <ShieldAlertIcon className="h-7 w-7" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                          Vuln
                          <span className="brand-text-accent">
                            Guardian
                          </span>{' '}
                          <span className="text-base font-semibold text-zinc-400">
                            (huseyindol/vuln-guardian)
                          </span>
                        </h2>
                        <p className="text-xs font-medium text-teal-300/90 sm:text-sm">
                          Autonomous Vulnerability Intelligence, Single-Batch
                          Safe-Version Patcher &amp; Deploy Skill
                        </p>
                      </div>
                    </div>

                    <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
                      6 farklı ekosistemdeki (
                      <code className="text-teal-300">package.json</code>,{' '}
                      <code className="text-teal-300">pom.xml</code>,{' '}
                      <code className="text-teal-300">pubspec.yaml</code>,{' '}
                      <code className="text-teal-300">requirements.txt</code>,{' '}
                      <code className="text-teal-300">go.mod</code>,{' '}
                      <code className="text-teal-300">Cargo.toml</code>)
                      zafiyetli paketleri canlı{' '}
                      <strong className="text-white">OSV.dev</strong>,{' '}
                      <strong className="text-white">GHSA</strong> ve{' '}
                      <strong className="text-white">CVE</strong>{' '}
                      veritabanlarından tespit eder; her paket için ayrı PR açıp
                      mail spam&apos;i üretmek yerine tüm güncellemeleri{' '}
                      <strong className="text-white">
                        5 aşamalı Breaking-Change &amp; HTTP 200 Smoke
                      </strong>{' '}
                      kapısından geçirerek tek seferde güvenli versiyona çeker
                      ve canlıya alır.
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {[
                        '6 Dil & Ekosistem',
                        '0 PR Mail Spam (Single-Batch)',
                        'Breaking-Change Koruması',
                        'Next.js 16 Web Komut Merkezi',
                        'SKILL.md Standardı',
                      ].map(tag => (
                        <span
                          key={tag}
                          className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-zinc-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right side command card + actions */}
                  <div className="flex flex-col justify-between gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 lg:w-96 lg:shrink-0">
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs text-zinc-400">
                        <span className="inline-flex items-center gap-1.5 font-mono font-semibold text-teal-300">
                          <TerminalIcon className="h-3.5 w-3.5" />
                          Hızlı Skill Kurulumu
                        </span>
                        <span className="font-mono text-[10px] uppercase text-emerald-400">
                          ● PUBLIC REPO
                        </span>
                      </div>
                      <pre className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-900/90 p-3 font-mono text-[11px] leading-relaxed text-zinc-200">
                        <code>
                          {`git clone https://github.com/huseyindol/vuln-guardian.git
cd vuln-guardian && bun install
bun run skill:install`}
                        </code>
                      </pre>
                    </div>

                    <div className="flex flex-col gap-2.5">
                      <Link
                        href="/projects/vuln-guardian"
                        className="brand-pill-btn inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold shadow-md transition-all hover:scale-[1.02]"
                      >
                        <span>VulnGuardian Mimari &amp; Tanıtım Sayfası</span>
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </Link>
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          href="https://skillstudio-zeta.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-teal-500/30 bg-teal-500/10 px-3 py-2 text-xs font-semibold text-teal-300 transition-colors hover:bg-teal-500/20"
                        >
                          <RadarIcon className="h-3.5 w-3.5" />
                          Komut Merkezi
                        </Link>
                        <Link
                          href="https://github.com/huseyindol/vuln-guardian"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:bg-white/10"
                        >
                          <Github className="h-3.5 w-3.5" />
                          GitHub Repo
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </KineticScrollItem>
          </div>
        </div>
      </section>

      {/* Sticky Filter, Search, Quick-Jump & View Switcher Bar */}
      <div className="bg-background/90 sticky top-[65px] z-40 border-b border-border backdrop-blur-md">
        <div className="container mx-auto px-6 py-3.5">
          <div className="mx-auto max-w-6xl space-y-3">
            {/* Row 1: Category Tabs + Search + Grid/List Toggle */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              {/* Category Tabs */}
              <div className="scrollbar-hide flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0">
                {CATEGORY_TABS.map(tab => {
                  const Icon = tab.icon
                  const isActive = activeCategory === tab.id
                  const count = categoryCounts[tab.id]
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleSelectCategory(tab.id)}
                      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all sm:text-sm ${
                        isActive
                          ? 'brand-pill-btn border-transparent font-bold shadow-sm'
                          : 'bg-muted/70 border-border text-muted-foreground hover:bg-accent hover:text-foreground'
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                      <span>{tab.label}</span>
                      <span
                        className={`py-0.2 rounded-full px-1.5 text-[10px] font-bold ${
                          isActive
                            ? 'bg-black/20 text-current'
                            : 'bg-background text-muted-foreground'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Search Input + View Toggle */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1 sm:w-64 lg:w-72">
                  <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Proje, teknoloji veya motor ara..."
                    aria-label="Proje ara"
                    className="bg-muted/60 w-full rounded-full border border-border py-1.5 pl-9 pr-8 text-xs text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary sm:text-sm"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Aramayı temizle"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <XIcon className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>

                {/* Engine Sub-filter when in Games or All */}
                {(activeCategory === 'all' || activeCategory === 'games') && (
                  <div className="bg-muted/50 hidden items-center gap-1 rounded-full border border-border p-1 xl:flex">
                    {ENGINE_FILTERS.map(eng => (
                      <button
                        key={eng}
                        type="button"
                        onClick={() => setEngineFilter(eng)}
                        className={`rounded-full px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                          engineFilter === eng
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {eng}
                      </button>
                    ))}
                  </div>
                )}

                {/* Grid / List View Switcher */}
                <div
                  className="bg-muted/60 flex shrink-0 items-center rounded-full border border-border p-0.5"
                  role="group"
                  aria-label="Görünüm düzeni"
                >
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    title="Kompakt 2 Sütunlu Görünüm"
                    aria-label="Kompakt Grid Görünümü"
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                      viewMode === 'grid'
                        ? 'brand-pill-btn font-bold shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <LayoutGridIcon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Kompakt</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('list')}
                    title="Geniş Liste Görünümü"
                    aria-label="Geniş Liste Görünümü"
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
                      viewMode === 'list'
                        ? 'brand-pill-btn font-bold shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <ListIcon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Liste</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Quick-Jump Project Chips (Hızlı Erişim Barı) */}
            <div className="scrollbar-hide flex items-center gap-1.5 overflow-x-auto pt-0.5">
              <span className="shrink-0 font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                Hızlı Git:
              </span>
              {(filteredProjects.length > 0 ? filteredProjects : projects).map(
                item => {
                  const Icon = item.icon
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => jumpToProject(item)}
                      className="border-border/80 bg-background/80 hover:border-primary/50 inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium text-muted-foreground transition-colors hover:text-primary"
                    >
                      <Icon className="h-3 w-3 shrink-0" />
                      <span>{item.title}</span>
                    </button>
                  )
                },
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Ad — filtre barı sonrası (üst) */}
      <div className="container mx-auto max-w-6xl px-6 pt-6">
        <AdSenseAd slot="1535119733" />
      </div>

      {/* Project cards */}
      <section className="bg-muted/20 overflow-hidden py-14">
        <div className="container mx-auto px-6">
          <div className="mx-auto max-w-6xl">
            {/* Active filter summary */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <span>
                Gösterilen:{' '}
                <strong className="text-foreground">
                  {filteredProjects.length}
                </strong>{' '}
                / {projects.length} proje
              </span>
              {(activeCategory !== 'all' ||
                engineFilter !== 'Tümü' ||
                searchQuery.trim() !== '') && (
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCategory('all')
                    setEngineFilter('Tümü')
                    setSearchQuery('')
                  }}
                  className="brand-text-accent cursor-pointer font-semibold hover:underline"
                >
                  Filtreleri Sıfırla
                </button>
              )}
            </div>

            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-border bg-card py-20 text-center">
                <SearchIcon className="text-muted-foreground/40 mx-auto mb-3 h-10 w-10" />
                <p className="text-base font-bold text-foreground">
                  Aramanızla eşleşen proje bulunamadı
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Farklı bir anahtar kelime deneyin veya kategori filtresini
                  sıfırlayın.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleSelectCategory('all')
                    setEngineFilter('Tümü')
                    setSearchQuery('')
                  }}
                  className="brand-pill-btn mt-4 inline-flex items-center rounded-full px-4 py-2 text-xs font-bold"
                >
                  Tüm Projeleri Göster
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map((project, index) => (
                  <KineticScrollItem
                    key={project.id}
                    side={index % 2 === 0 ? 'left' : 'right'}
                  >
                    <ProjectCard project={project} compact />
                  </KineticScrollItem>
                ))}
              </div>
            ) : (
              <div className="space-y-8">
                {filteredProjects.map((project, index) => (
                  <div key={project.id} className="space-y-8">
                    <KineticScrollItem
                      side={index % 2 === 0 ? 'left' : 'right'}
                    >
                      <ProjectCard project={project} compact={false} />
                    </KineticScrollItem>
                    {index === 1 && (
                      <div>
                        <AdSenseAd slot="5199032579" />
                      </div>
                    )}
                    {index === 3 && (
                      <div>
                        <AdSenseAd slot="8283314736" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

function ProjectCard({
  project,
  compact = false,
}: {
  project: Project
  compact?: boolean
}) {
  const Icon = project.icon
  const visibleHighlights = compact
    ? project.highlights.slice(0, 3)
    : project.highlights

  return (
    <div id={project.id} className="h-full scroll-mt-36">
      <Card className="border-border/60 flex h-full flex-col overflow-hidden border shadow-sm transition-all duration-300 hover:border-teal-500/40 hover:shadow-lg">
        <div className={`flex h-full flex-col ${compact ? '' : 'md:flex-row'}`}>
          {/* Accent header / sidebar */}
          {compact ? (
            <div
              className={`flex items-center justify-between bg-gradient-to-r px-5 py-3.5 text-white ${project.gradient}`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="h-6 w-6 text-white/95" />
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-white/90">
                  {project.category === 'skills'
                    ? 'AI Agent Skill'
                    : project.category === 'ecosystem'
                      ? 'Elly Ekosistemi'
                      : (project.engine ?? 'Web Oyunu')}
                </span>
              </div>
              <Badge
                className={`border-0 text-[11px] font-semibold ${statusConfig[project.status]}`}
              >
                {project.statusLabel}
              </Badge>
            </div>
          ) : (
            <div
              className={`flex w-full items-center justify-center bg-gradient-to-br p-8 md:w-52 md:shrink-0 ${project.gradient}`}
            >
              <Icon className="h-16 w-16 text-white/90" />
            </div>
          )}

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
            <div>
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-extrabold md:text-xl">
                      {project.title}
                    </h3>
                    {!compact && (
                      <Badge
                        className={`border-0 text-xs font-semibold ${statusConfig[project.status]}`}
                      >
                        {project.statusLabel}
                      </Badge>
                    )}
                    {project.engine && (
                      <Badge className="border-0 bg-slate-200/50 text-xs font-semibold text-slate-700 ring-1 ring-slate-300 dark:bg-slate-800/50 dark:text-slate-300 dark:ring-slate-700">
                        {project.engine}
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs font-medium text-muted-foreground sm:text-sm">
                    {project.subtitle}
                  </p>
                </div>

                <div className="flex items-center gap-2.5">
                  {project.appIcon && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={project.appIcon}
                      alt={`${project.title} ikonu`}
                      className="ring-border/50 h-9 w-9 rounded-xl object-cover shadow-sm ring-1"
                    />
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${project.title} GitHub`}
                        className="hover:border-foreground/30 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target={
                          project.liveUrl.startsWith('http')
                            ? '_blank'
                            : undefined
                        }
                        rel={
                          project.liveUrl.startsWith('http')
                            ? 'noopener noreferrer'
                            : undefined
                        }
                        className="hover:border-foreground/30 inline-flex h-8 items-center gap-1.5 rounded-full border border-border bg-muted px-3 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ExternalLinkIcon className="h-3 w-3" />
                        {project.liveLabel}
                      </Link>
                    )}
                    {project.detailUrl && (
                      <Link
                        href={project.detailUrl}
                        className="brand-pill-btn inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-xs font-bold shadow-sm transition-all hover:scale-105"
                      >
                        <SparklesIcon className="h-3 w-3" />
                        {project.detailLabel ?? 'Detay'}
                      </Link>
                    )}
                    {project.ecosystemUrl && (
                      <Link
                        href={project.ecosystemUrl}
                        className="flex h-8 items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 px-3 text-xs font-bold text-white shadow-sm transition-all hover:scale-105"
                      >
                        <LayersIcon className="h-3 w-3" />
                        Ekosistem
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <p
                className={`mb-4 text-sm leading-relaxed text-muted-foreground ${
                  compact ? 'line-clamp-3' : ''
                }`}
              >
                {project.description}
              </p>

              {/* Highlights */}
              <ul className="mb-4 space-y-1">
                {visibleHighlights.map(h => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-xs text-foreground sm:text-sm"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech stack */}
            <div className="border-border/50 flex flex-wrap gap-1.5 border-t pt-3">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="rounded-md border border-border bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
