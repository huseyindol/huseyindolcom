import {
  KineticScrollBanner,
  KineticScrollItem,
  type KineticTrackItem,
} from '@/components/KineticScrollBanner'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteInfo } from '@/data/mockData'
import { sendGTMEvent } from '@next/third-parties/google'
import { useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Code2, Download, Mail, Users, Zap } from 'lucide-react'
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1500
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * end))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [end, isInView])

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 10, suffix: '+', label: 'Yıl Deneyim' },
  { value: 7, suffix: '+', label: 'Şirket' },
  { value: 50, suffix: '+', label: 'Proje' },
  { value: 23, suffix: '', label: 'Teknoloji' },
]

const kineticTracks: KineticTrackItem[] = [
  {
    id: 'frontend-core',
    dir: -1,
    speed: 1.35,
    baseOffset: -60,
    tag: 'FRONTEND CORE',
    primary: 'REACT 19 · NEXT.JS 16 · TYPESCRIPT',
    secondary: 'SSR · ISR · CORE WEB VITALS',
  },
  {
    id: 'backend-engine',
    dir: 1,
    speed: 1.6,
    baseOffset: 80,
    tag: 'BACKEND ENGINE',
    primary: 'JAVA 21 & SPRING BOOT 3.5',
    secondary: 'Database-per-Tenant · Redis Cache',
    accent: true,
  },
  {
    id: 'cloud-native',
    dir: -1,
    speed: 0.95,
    baseOffset: -30,
    scaleEffect: true,
    tag: 'CLOUD NATIVE',
    primary: 'RABBITMQ · WEBSOCKET · WEBRTC',
    secondary: 'KUBERNETES · DOCKER',
  },
  {
    id: 'team-lead',
    dir: 1,
    speed: 1.85,
    baseOffset: 110,
    tag: 'TEAM LEADERSHIP',
    primary: 'CLEAN CODE & SOLID',
    secondary: 'MENTORLUK & CODE REVIEW',
    accent: true,
  },
  {
    id: 'fintech-scale',
    dir: -1,
    speed: 1.45,
    baseOffset: -90,
    tag: 'FINTECH & E-COMMERCE',
    primary: '10+ YIL · 7+ ŞİRKET · 50+ PROJE',
    secondary: 'Uçtan Uca Ölçeklenebilir Sistemler',
  },
]

const values: Array<{
  icon: LucideIcon
  title: string
  description: string
}> = [
  {
    icon: Code2,
    title: 'Temiz Kod',
    description:
      'Okunabilir, sürdürülebilir ve iyi yapılandırılmış kod yazmak en önemli önceliğim. SOLID prensiplerine ve kapsamlı code review süreçlerine büyük önem veriyorum.',
  },
  {
    icon: Zap,
    title: 'Performans Odaklı',
    description:
      'Core Web Vitals, lazy loading, code splitting ve bundle optimizasyonu ile kullanıcı deneyimini her zaman merkeze alıyorum. Her ms önemlidir.',
  },
  {
    icon: Users,
    title: 'Ekip & Mentorluk',
    description:
      'Code review, bilgi paylaşımı ve junior geliştirici mentorluğu ile ekibin büyümesine ve teknik kültürün güçlenmesine katkıda bulunuyorum.',
  },
]

export default function Hero() {
  return (
    <div>
      <HeroBanner />
      <KineticScrollBanner
        kicker="01 / KİNETİK TEKNOLOJİ AKIŞI"
        title="Uçtan uca mimari yetkinlikler"
        badge="REACT 19 · SPRING BOOT 3.5 · KUBERNETES"
        tracks={kineticTracks}
        ariaLabel="Teknoloji ve Mimari Akışı"
      />
      <StatsSection />
      <AboutSection />
      <ValuesSection />
    </div>
  )
}

function HeroBanner() {
  return (
    <section className="brand-hero-surface relative -mt-20 overflow-hidden border-b border-white/10 py-36 pt-36 text-zinc-100 md:py-48 md:pt-48">
      <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="brand-glow-orb pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="brand-badge mb-8 border px-4 py-1.5 text-sm font-medium">
            {siteInfo.sayHi}
          </Badge>

          <h1 className="mb-6 text-5xl font-black leading-none tracking-tight md:text-7xl">
            <span className="text-gradient">{siteInfo.title.highlight}</span>
            <br />
            <span className="mt-2 inline-block text-zinc-100">
              {siteInfo.title.rest}
            </span>
          </h1>

          <p
            className="mx-auto mb-10 max-w-3xl text-xl leading-relaxed text-zinc-400 md:text-2xl"
            dangerouslySetInnerHTML={{ __html: siteInfo.description }}
          />

          <div className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              className="brand-pill-btn rounded-full px-7 font-bold shadow-lg transition-all hover:scale-105"
              onClick={() => {
                sendGTMEvent({ event: 'buttonClick', platform: 'email' })
                window.open(siteInfo.email, '_blank')
              }}
            >
              <Mail className="mr-2 h-5 w-5" />
              İletişime Geç
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 bg-white/5 px-7 text-zinc-100 backdrop-blur transition-all hover:scale-105 hover:border-white/40 hover:bg-white/10"
              onClick={() => {
                sendGTMEvent({ event: 'buttonClick', platform: 'cv-download' })
                window.open(siteInfo.cvUrl, '_blank')
              }}
            >
              <Download className="mr-2 h-5 w-5" />
              CV İndir
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {siteInfo.socialLinks.map(link => (
              <Link
                key={link.platform}
                href={link.url}
                target="_blank"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-all hover:scale-110 hover:border-white/40 hover:bg-white/15 hover:text-white"
              >
                {link.platform === 'github' && <Github className="h-4 w-4" />}
                {link.platform === 'linkedin' && (
                  <Linkedin className="h-4 w-4" />
                )}
                {link.platform === 'email' && <Mail className="h-4 w-4" />}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section className="overflow-hidden border-b bg-card py-16">
      <div className="container mx-auto px-6">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-12 md:grid-cols-4">
          {stats.map((stat, idx) => (
            <KineticScrollItem
              key={stat.label}
              side={idx % 2 === 0 ? 'left' : 'right'}
              className="text-center"
            >
              <div className="brand-text-accent mb-2 text-5xl font-black">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </KineticScrollItem>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  return (
    <section className="bg-muted/30 overflow-hidden py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-20 md:grid-cols-2 md:items-center">
            <KineticScrollItem side="left" className="flex justify-center">
              <div className="relative">
                <div className="animate-ring-1 border-primary/40 absolute inset-0 rounded-full border-2" />
                <div className="animate-ring-2 border-primary/20 absolute inset-0 rounded-full border" />
                <div className="border-primary/20 ring-primary/10 relative h-72 w-72 overflow-hidden rounded-full border-4 shadow-2xl ring-4">
                  <Image
                    src="https://github.com/huseyindol.png"
                    alt="Hüseyin DOL"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="brand-pill-btn animate-badge-up absolute -bottom-3 -right-3 rounded-2xl px-4 py-2 text-xs font-bold shadow-lg">
                  10+ yıl deneyim
                </div>
                <div className="animate-badge-down absolute -left-3 top-10 rounded-2xl border border-white/15 bg-zinc-900 px-4 py-2 text-xs font-bold text-zinc-100 shadow-lg">
                  Full Stack
                </div>
              </div>
            </KineticScrollItem>

            <div className="space-y-6">
              <KineticScrollItem side="right">
                <p className="brand-text-accent mb-1 font-mono text-xs uppercase tracking-widest">
                  02 / KARİYER &amp; MİMARİ
                </p>
                <h2 className="text-gradient mb-3 text-3xl font-extrabold md:text-4xl">
                  Hakkımda
                </h2>
                <div className="hero-gradient h-1 w-16 rounded-full" />
              </KineticScrollItem>

              <KineticScrollItem side="left">
                <p className="leading-relaxed text-muted-foreground">
                  2011 yılında Projesoft&apos;ta başladığım frontend yolculuğu,
                  bugün{' '}
                  <strong className="text-foreground">
                    10+ yıllık deneyime
                  </strong>{' '}
                  dönüştü. E-ticaret&apos;ten fintech&apos;e, medya
                  platformlarından kurumsal uygulamalara kadar çeşitli
                  sektörlerde çalıştım. jQuery ve PHP&apos;den React ve
                  Next.js&apos;e, monolitik yapılardan mikroservis mimarilerine
                  kadar teknolojinin evrimini bizzat yaşadım.
                </p>
              </KineticScrollItem>

              <KineticScrollItem side="right">
                <p className="leading-relaxed text-muted-foreground">
                  React ekosisteminde uzmanlaşmanın yanı sıra, son yıllarda{' '}
                  <strong className="text-foreground">Java Spring Boot</strong>{' '}
                  ile backend geliştirme,{' '}
                  <strong className="text-foreground">Kubernetes</strong> ile
                  DevOps altyapısı ve{' '}
                  <strong className="text-foreground">React Native</strong> ile
                  mobil uygulama geliştirme alanlarında da derinleşiyorum.
                </p>
              </KineticScrollItem>

              <KineticScrollItem side="left">
                <p className="leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">
                    Hangikredi&apos;de takım lideri
                  </strong>{' '}
                  olarak teknik kararların yanı sıra junior geliştiricilerin
                  mentorluğunu yapıyor, code review süreçlerini yönetiyor ve
                  CI/CD pipeline&apos;larını optimize ediyorum.
                </p>
              </KineticScrollItem>

              <KineticScrollItem
                side="right"
                className="flex flex-wrap gap-2 pt-2"
              >
                {[
                  'React',
                  'Next.js',
                  'TypeScript',
                  'Java',
                  'Kubernetes',
                  'React Native',
                ].map(tech => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="border-primary/20 bg-primary/10 text-primary"
                  >
                    {tech}
                  </Badge>
                ))}
              </KineticScrollItem>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  return (
    <section className="overflow-hidden bg-card py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <KineticScrollItem side="left" className="mb-16 text-center">
            <p className="brand-text-accent mb-1 font-mono text-xs uppercase tracking-widest">
              03 / MÜHENDİSLİK İLKELERİ
            </p>
            <h2 className="text-gradient mb-4 text-3xl font-extrabold md:text-4xl">
              Çalışma Yaklaşımım
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Her projede kaliteyi, performansı ve ekip iletişimini ön planda
              tutuyorum.
            </p>
          </KineticScrollItem>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((value, idx) => (
              <KineticScrollItem
                key={value.title}
                side={idx % 2 === 0 ? 'left' : 'right'}
              >
                <Card className="border-border/60 group h-full overflow-hidden border p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="brand-pill-btn mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              </KineticScrollItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
