import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteInfo } from '@/data/mockData'
import { sendGTMEvent } from '@next/third-parties/google'
import { motion, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Code2, Download, Mail, Users, Zap } from 'lucide-react'
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const slideFromLeft = {
  hidden: { opacity: 0, x: -72, y: 16 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const slideFromRight = {
  hidden: { opacity: 0, x: 72, y: 16 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

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

interface KineticTrackConfig {
  id: string
  dir: -1 | 1
  speed: number
  baseOffset: number
  scaleEffect?: boolean
  tag: string
  primary: string
  secondary: string
  accent?: boolean
}

const kineticTracks: KineticTrackConfig[] = [
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
  color: string
}> = [
  {
    icon: Code2,
    title: 'Temiz Kod',
    description:
      'Okunabilir, sürdürülebilir ve iyi yapılandırılmış kod yazmak en önemli önceliğim. SOLID prensiplerine ve kapsamlı code review süreçlerine büyük önem veriyorum.',
    color: 'from-amber-500 to-orange-600',
  },
  {
    icon: Zap,
    title: 'Performans Odaklı',
    description:
      'Core Web Vitals, lazy loading, code splitting ve bundle optimizasyonu ile kullanıcı deneyimini her zaman merkeze alıyorum. Her ms önemlidir.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Users,
    title: 'Ekip & Mentorluk',
    description:
      'Code review, bilgi paylaşımı ve junior geliştirici mentorluğu ile ekibin büyümesine ve teknik kültürün güçlenmesine katkıda bulunuyorum.',
    color: 'from-stone-700 to-zinc-900',
  },
]

export default function Hero() {
  return (
    <div>
      <HeroBanner />
      <KineticTypographySection />
      <StatsSection />
      <AboutSection />
      <ValuesSection />
    </div>
  )
}

function HeroBanner() {
  return (
    <section className="relative -mt-20 overflow-hidden border-b border-white/10 bg-zinc-950 py-36 pt-36 text-zinc-100 md:py-48 md:pt-48">
      <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="container relative mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <Badge className="mb-8 border border-amber-400/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-200">
            {siteInfo.sayHi}
          </Badge>

          <h1 className="mb-6 text-5xl font-black leading-none tracking-tight md:text-7xl">
            <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              {siteInfo.title.highlight}
            </span>
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
              className="rounded-full bg-amber-400 px-7 font-bold text-zinc-950 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 hover:bg-amber-300"
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
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-300 transition-all hover:scale-110 hover:border-amber-400/40 hover:bg-amber-400/15 hover:text-amber-300"
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

function KineticTypographySection() {
  const trackRefs = useRef<Array<HTMLDivElement | null>>([])

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    ) {
      return
    }

    let rafId = 0

    const updateStreams = () => {
      const vh = window.innerHeight || 800
      trackRefs.current.forEach((el, idx) => {
        if (!el) return
        const cfg = kineticTracks[idx]
        if (!cfg) return
        const rect = el.getBoundingClientRect()
        const centerOffset = (rect.top + rect.height / 2 - vh / 2) / (vh * 0.75)
        const clamped = Math.max(-1.2, Math.min(1.2, centerOffset))
        const shiftX =
          clamped * cfg.dir * 210 * cfg.speed +
          cfg.baseOffset * Math.abs(clamped)
        const opacity = Math.max(0.22, 1 - Math.abs(clamped) * 0.62)
        const scale = cfg.scaleEffect
          ? Math.max(0.88, 1 - Math.abs(clamped) * 0.14)
          : 1

        el.style.transform = `translate3d(${shiftX.toFixed(1)}px, 0, 0) scale(${scale})`
        el.style.opacity = opacity.toFixed(2)
      })
    }

    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(updateStreams)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    updateStreams()

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section
      aria-label="Teknoloji ve Mimari Akışı"
      className="relative overflow-hidden border-b border-white/10 bg-zinc-950 py-20 text-zinc-100 md:py-28"
    >
      <div className="container mx-auto mb-10 flex flex-wrap items-center justify-between gap-4 px-6">
        <div>
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-amber-400">
            01 / KİNETİK TEKNOLOJİ AKIŞI
          </p>
          <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
            Uçtan uca mimari yetkinlikler
          </h2>
        </div>
        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-zinc-400">
          REACT 19 · SPRING BOOT 3.5 · KUBERNETES
        </span>
      </div>

      <div className="select-none space-y-4 overflow-hidden py-2 sm:space-y-6">
        {kineticTracks.map((track, idx) => (
          <div
            key={track.id}
            ref={el => {
              trackRefs.current[idx] = el
            }}
            className={`gpu-kinetic flex items-center gap-4 whitespace-nowrap px-6 ${
              track.dir === 1 ? 'justify-end' : 'justify-start'
            }`}
          >
            <span className="rounded-full border border-white/15 bg-white/5 px-3 py-1 font-mono text-xs uppercase tracking-wider text-zinc-300">
              {track.tag}
            </span>
            <span
              className={`text-2xl font-black tracking-tighter sm:text-4xl md:text-5xl ${
                track.accent ? 'text-amber-400' : 'text-zinc-100'
              }`}
            >
              {track.primary}
            </span>
            <span className="text-xl font-light text-zinc-600 sm:text-3xl">
              {'///'}
            </span>
            <span className="text-lg font-semibold text-zinc-400 sm:text-2xl md:text-3xl">
              {track.secondary}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="overflow-hidden border-b bg-card py-16">
      <div className="container mx-auto px-6">
        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-2 gap-12 md:grid-cols-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              variants={idx % 2 === 0 ? slideFromLeft : slideFromRight}
              className="text-center"
            >
              <div className="mb-2 text-5xl font-black text-primary">
                {isInView && <CountUp end={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-muted/30 overflow-hidden py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid gap-20 md:grid-cols-2 md:items-center"
          >
            <motion.div
              variants={slideFromLeft}
              className="flex justify-center"
            >
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
                <div className="animate-badge-up absolute -bottom-3 -right-3 rounded-2xl bg-amber-400 px-4 py-2 text-xs font-bold text-zinc-950 shadow-lg">
                  10+ yıl deneyim
                </div>
                <div className="animate-badge-down absolute -left-3 top-10 rounded-2xl bg-emerald-500 px-4 py-2 text-xs font-bold text-zinc-950 shadow-lg">
                  Full Stack
                </div>
              </div>
            </motion.div>

            <motion.div variants={stagger} className="space-y-6">
              <motion.div variants={slideFromRight}>
                <p className="mb-1 font-mono text-xs uppercase tracking-widest text-primary">
                  02 / KARİYER &amp; MİMARİ
                </p>
                <h2 className="text-gradient mb-3 text-3xl font-extrabold md:text-4xl">
                  Hakkımda
                </h2>
                <div className="h-1 w-16 rounded-full bg-gradient-to-r from-amber-500 to-orange-500" />
              </motion.div>

              <motion.p
                variants={slideFromRight}
                className="leading-relaxed text-muted-foreground"
              >
                2011 yılında Projesoft&apos;ta başladığım frontend yolculuğu,
                bugün{' '}
                <strong className="text-foreground">10+ yıllık deneyime</strong>{' '}
                dönüştü. E-ticaret&apos;ten fintech&apos;e, medya
                platformlarından kurumsal uygulamalara kadar çeşitli sektörlerde
                çalıştım. jQuery ve PHP&apos;den React ve Next.js&apos;e,
                monolitik yapılardan mikroservis mimarilerine kadar teknolojinin
                evrimini bizzat yaşadım.
              </motion.p>

              <motion.p
                variants={slideFromLeft}
                className="leading-relaxed text-muted-foreground"
              >
                React ekosisteminde uzmanlaşmanın yanı sıra, son yıllarda{' '}
                <strong className="text-foreground">Java Spring Boot</strong>{' '}
                ile backend geliştirme,{' '}
                <strong className="text-foreground">Kubernetes</strong> ile
                DevOps altyapısı ve{' '}
                <strong className="text-foreground">React Native</strong> ile
                mobil uygulama geliştirme alanlarında da derinleşiyorum.
              </motion.p>

              <motion.p
                variants={slideFromRight}
                className="leading-relaxed text-muted-foreground"
              >
                <strong className="text-foreground">
                  Hangikredi&apos;de takım lideri
                </strong>{' '}
                olarak teknik kararların yanı sıra junior geliştiricilerin
                mentorluğunu yapıyor, code review süreçlerini yönetiyor ve CI/CD
                pipeline&apos;larını optimize ediyorum.
              </motion.p>

              <motion.div
                variants={fadeInUp}
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
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="overflow-hidden bg-card py-28">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <motion.div variants={fadeInUp} className="mb-16 text-center">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-primary">
                03 / MÜHENDİSLİK İLKELERİ
              </p>
              <h2 className="text-gradient mb-4 text-3xl font-extrabold md:text-4xl">
                Çalışma Yaklaşımım
              </h2>
              <p className="mx-auto max-w-2xl text-muted-foreground">
                Her projede kaliteyi, performansı ve ekip iletişimini ön planda
                tutuyorum.
              </p>
            </motion.div>

            <motion.div
              className="grid gap-8 md:grid-cols-3"
              variants={stagger}
            >
              {values.map((value, idx) => (
                <motion.div
                  key={value.title}
                  variants={idx % 2 === 0 ? slideFromLeft : slideFromRight}
                >
                  <Card className="border-border/60 group h-full overflow-hidden border p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                    <div
                      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.color} shadow-lg`}
                    >
                      <value.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="mb-3 text-xl font-bold">{value.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
