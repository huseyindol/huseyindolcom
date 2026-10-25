import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { siteInfo } from '@/data/mockData'
import { sendGTMEvent } from '@next/third-parties/google'
import { motion, useInView } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { Code2, Download, Mail, MapPin, Users, Zap } from 'lucide-react'
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isInView) return
    const duration = 1400
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
  {
    value: 10,
    suffix: '+',
    label: 'Yıl Deneyim',
    detail: '2011’den bugüne kesintisiz üretim',
  },
  {
    value: 7,
    suffix: '+',
    label: 'Şirket',
    detail: 'Fintech, E-ticaret, Medya & Ajans',
  },
  {
    value: 50,
    suffix: '+',
    label: 'Proje',
    detail: 'Kurumsal platformlar & açık kaynak',
  },
  {
    value: 23,
    suffix: '',
    label: 'Teknoloji',
    detail: 'Frontend, Backend, Mobil & DevOps',
  },
]

interface ArchitectureLayer {
  id: string
  tab: string
  headline: string
  metric: string
  metricLabel: string
  summary: string
  stack: string[]
  productionProof: string
}

const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: 'frontend',
    tab: 'Frontend Mimari',
    headline: 'Next.js 16 & React 19 ile Yüksek Trafikli Web Sistemleri',
    metric: '%40',
    metricLabel: 'Core Web Vitals & LCP İyileştirmesi',
    summary:
      'SSR, SSG ve ISR stratejileri, BFF API katmanları, mikro-frontend geçişleri ve sıfır çalışma zamanı ek yüklü bileşen mimarileri.',
    stack: [
      'React 19',
      'Next.js 16',
      'TypeScript',
      'Tailwind CSS 4',
      'TanStack Query 5',
      'Zustand',
    ],
    productionProof: 'Hangikredi Squad Team Lead & Defacto E-Ticaret Mimarisi',
  },
  {
    id: 'backend',
    tab: 'Backend & API',
    headline: 'Java 21 & Spring Boot 3.5 Multi-Tenant Headless CMS',
    metric: 'DB / Tenant',
    metricLabel: 'İzole PostgreSQL & JWE Güvenlik Katmanı',
    summary:
      'Database-per-tenant veri izolasyonu, AES-256-GCM JWE kimlik doğrulama, 4 seviyeli RBAC izin sistemi, Redis önbellekleme ve RabbitMQ asenkron kuyruklar.',
    stack: [
      'Java 21',
      'Spring Boot 3.5',
      'PostgreSQL',
      'Redis',
      'RabbitMQ',
      'STOMP / WebSocket',
    ],
    productionProof:
      'Elly Headless CMS Backend & Kurumsal REST / WS Sözleşmesi',
  },
  {
    id: 'mobile',
    tab: 'Mobil & Gerçek Zamanlı',
    headline: 'Flutter 3 & React Native ile Çoklu Platform Yönetim',
    metric: '2.147',
    metricLabel: 'Otomatize Widget & Entegrasyon Testi',
    summary:
      'Web yönetim paneliyle %100 modül eşleniği sağlayan mobil yönetim uygulaması, WebRTC sesli/görüntülü görüşme ve canlı STOMP sohbet altyapısı.',
    stack: ['Flutter 3', 'Dart', 'React Native', 'WebRTC', 'STOMP', '2FA TOTP'],
    productionProof:
      'Elly Mobile App (7 CRUD + Form Şema Editörü + Canlı Arama)',
  },
  {
    id: 'devops',
    tab: 'DevOps & AI',
    headline: 'Kubernetes, CI/CD & Merkezileştirilmiş Gemini AI Hub',
    metric: '%65',
    metricLabel: 'Tek Aşamalı AI Prompt ile Token Tasarrufu',
    summary:
      'Kubernetes StatefulSet/HPA, Docker multi-stage imajlar, Jenkins & GitHub Actions boru hatları ve kota/telemetri kontrollü Gemini AI içerik motoru.',
    stack: [
      'Kubernetes',
      'Docker',
      'GitHub Actions',
      'Jenkins',
      'Gemini AI API',
      'Prometheus & Zipkin',
    ],
    productionProof: 'Bulut tabanlı çoklu ortam dağıtımı & AI Kota/Telemetri',
  },
]

const ELLY_ECOSYSTEM = [
  {
    repo: 'elly-backend',
    role: 'Sözleşme & API Kaynağı',
    stack: 'Spring Boot 3.5 · Java 21 · PG · Redis · RabbitMQ',
    url: '/projects/elly',
  },
  {
    repo: 'elly-admin',
    role: 'Yönetim Paneli (App Router)',
    stack: 'Next.js 16 · Zustand · TanStack Query · TipTap 3',
    url: '/projects/elly',
  },
  {
    repo: 'elly-tenant',
    role: 'Vitrin & Blog (Pages Router)',
    stack: 'Next.js 16 · MDX · BFF API · SSR/ISR',
    url: '/projects',
  },
  {
    repo: 'elly-mobile-app',
    role: 'Mobil Yönetim (Flutter 3)',
    stack: 'Dart · Provider · WebRTC · 2FA TOTP',
    url: '/projects/elly',
  },
]

const values: Array<{
  icon: LucideIcon
  title: string
  description: string
  tag: string
}> = [
  {
    icon: Code2,
    title: 'Temiz Kod',
    tag: 'SOLID & Mimari Disiplin',
    description:
      'Okunabilir, sürdürülebilir ve iyi yapılandırılmış kod yazmak en önemli önceliğim. SOLID prensiplerine ve kapsamlı code review süreçlerine büyük önem veriyorum.',
  },
  {
    icon: Zap,
    title: 'Performans Odaklı',
    tag: 'Core Web Vitals & LCP',
    description:
      'Core Web Vitals, lazy loading, code splitting ve bundle optimizasyonu ile kullanıcı deneyimini her zaman merkeze alıyorum. Her ms önemlidir.',
  },
  {
    icon: Users,
    title: 'Ekip & Mentorluk',
    tag: 'Mühendislik Kültürü',
    description:
      'Code review, bilgi paylaşımı ve junior geliştirici mentorluğu ile ekibin büyümesine ve teknik kültürün güçlenmesine katkıda bulunuyorum.',
  },
]

const MARQUEE_ITEMS = [
  'HÜSEYİN DOL',
  'SENIOR FULL STACK DEVELOPER & TEAM LEAD',
  'REACT 19 & NEXT.JS 16',
  'JAVA 21 & SPRING BOOT 3.5',
  'MULTI-TENANT HEADLESS CMS',
  'FLUTTER 3 & REACT NATIVE',
  'KUBERNETES & DOCKER',
]

export default function Hero() {
  return (
    <div className="px-2 pb-2 md:px-3">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-2">
        <HeroBanner />
        <StatsSection />
        <AboutSection />
        <ValuesSection />
      </div>
    </div>
  )
}

function HeroBanner() {
  const [activeLayerId, setActiveLayerId] = useState<string>('frontend')
  const activeLayer =
    ARCHITECTURE_LAYERS.find(l => l.id === activeLayerId) ??
    ARCHITECTURE_LAYERS[0]

  return (
    <section aria-label="Giriş ve Mimari Pano" className="flex flex-col gap-2">
      {/* Row 1: Monumental Name & Statement Band + Quick Identity Tiles */}
      <div className="grid grid-cols-12 gap-2">
        {/* Main Monumental Headline Tile (Cols 1-8) */}
        <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:col-span-8 md:p-9">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <Badge className="rounded-sm border-0 bg-primary px-3 py-1 text-xs font-extrabold text-primary-foreground">
              {siteInfo.sayHi}
            </Badge>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" />
              İstanbul · Squad Team Lead @ Hangikredi
            </span>
          </div>

          <h1
            className="mb-6 font-extrabold leading-[0.94] tracking-[-0.04em] text-foreground"
            style={{ fontSize: 'clamp(2.25rem, 1.1rem + 4.4vw, 5.25rem)' }}
          >
            <span className="block text-primary">
              {siteInfo.title.highlight}
            </span>
            <span className="block text-foreground">{siteInfo.title.rest}</span>
          </h1>

          <p
            className="max-w-[68ch] text-base leading-[1.6] text-muted-foreground md:text-lg [&_strong]:font-semibold [&_strong]:text-foreground"
            dangerouslySetInnerHTML={{ __html: siteInfo.description }}
          />
        </div>

        {/* Right Identity & Action Column (Cols 9-12) */}
        <div className="col-span-12 grid grid-cols-12 gap-2 md:col-span-4">
          {/* Portrait Tile */}
          <div className="relative col-span-5 min-h-[210px] overflow-hidden rounded-md bg-card sm:col-span-4 md:col-span-5">
            <Image
              src="https://github.com/huseyindol.png"
              alt="Hüseyin DOL"
              fill
              priority
              className="object-cover"
            />
            <div className="bg-background/90 absolute bottom-2 left-2 right-2 rounded-sm px-2.5 py-1.5">
              <p className="truncate text-xs font-extrabold text-foreground">
                Hüseyin DOL
              </p>
              <p className="truncate text-[13px] text-muted-foreground">
                10+ Yıl Deneyim
              </p>
            </div>
          </div>

          {/* 5 Facts Desk Tile */}
          <div className="col-span-7 flex flex-col justify-between rounded-md bg-card p-4 sm:col-span-8 md:col-span-7">
            <p className="text-xs font-bold text-primary">Mühendislik Özeti</p>
            <dl className="my-3 space-y-2 text-[13px]">
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Odak</dt>
                <dd className="font-bold text-foreground">
                  Full Stack & Cloud
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Frontend</dt>
                <dd className="font-bold text-foreground">
                  React / Next.js 16
                </dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Backend</dt>
                <dd className="font-bold text-foreground">Java 21 / Spring</dd>
              </div>
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted-foreground">Mobil</dt>
                <dd className="font-bold text-foreground">Flutter & RN</dd>
              </div>
            </dl>
            <div className="flex items-center gap-1.5">
              {siteInfo.socialLinks.map(link => (
                <Link
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  aria-label={link.platform}
                  className="flex h-9 flex-1 items-center justify-center rounded-sm bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
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

          {/* Primary Action Tile (Safety Orange) */}
          <div className="col-span-12 flex flex-col justify-between gap-4 rounded-md bg-primary p-5 text-primary-foreground">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold">
                Hızlı İletişim & Özgeçmiş
              </span>
              <span className="bg-background/15 rounded-sm px-2 py-0.5 text-xs font-bold">
                2026 CV
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Button
                size="lg"
                className="h-12 w-full rounded-sm border-0 bg-foreground px-4 text-sm font-extrabold text-background transition-colors hover:bg-background hover:text-foreground"
                onClick={() => {
                  sendGTMEvent({ event: 'buttonClick', platform: 'email' })
                  window.open(siteInfo.email, '_blank')
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                İletişime Geç
              </Button>
              <Button
                size="lg"
                className="h-12 w-full rounded-sm border-0 bg-background px-4 text-sm font-extrabold text-foreground transition-colors hover:bg-foreground hover:text-background"
                onClick={() => {
                  sendGTMEvent({
                    event: 'buttonClick',
                    platform: 'cv-download',
                  })
                  window.open(siteInfo.cvUrl, '_blank')
                }}
              >
                <Download className="mr-2 h-4 w-4" />
                CV İndir
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Interactive 4-Layer Architecture Console Tile + Marquee Band */}
      <div className="grid grid-cols-12 gap-2">
        {/* Interactive Layer Switcher (Cols 1-4) */}
        <div className="col-span-12 flex flex-col justify-between rounded-md bg-foreground p-6 text-background md:col-span-4">
          <div>
            <p className="mb-1 text-xs font-bold text-primary">
              Canlı Mimari İnceleyici
            </p>
            <h2 className="mb-4 text-xl font-extrabold tracking-tight text-background md:text-2xl">
              Uçtan Uca Mühendislik Katmanları
            </h2>
            <p className="text-background/75 mb-5 text-sm leading-relaxed">
              Bir katman seçerek gerçek üretim metriklerini, mimari kararları ve
              aktif teknoloji yığınını inceleyin.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
            {ARCHITECTURE_LAYERS.map(layer => {
              const active = layer.id === activeLayer.id
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`flex items-center justify-between rounded-sm px-4 py-3 text-left text-sm font-bold transition-colors ${
                    active
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-background/10 text-background/85 hover:bg-background/20'
                  }`}
                >
                  <span>{layer.tab}</span>
                  <span aria-hidden="true">{active ? '●' : '→'}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Layer Live Specimen Tile (Cols 5-12) */}
        <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:col-span-8 md:p-8">
          <div className="grid gap-6 md:grid-cols-12 md:items-start">
            <div className="md:col-span-8">
              <span className="mb-2 inline-block rounded-sm bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
                {activeLayer.productionProof}
              </span>
              <h3 className="mb-3 text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
                {activeLayer.headline}
              </h3>
              <p className="max-w-[62ch] text-base leading-relaxed text-muted-foreground">
                {activeLayer.summary}
              </p>
            </div>

            <div className="flex flex-col justify-between rounded-md bg-secondary p-5 md:col-span-4">
              <span className="text-xs font-bold text-muted-foreground">
                Üretim Etkisi
              </span>
              <p
                className="my-2 font-extrabold leading-none tracking-tight text-primary"
                style={{ fontSize: 'clamp(2rem, 1.2rem + 2vw, 3rem)' }}
              >
                {activeLayer.metric}
              </p>
              <span className="text-xs font-semibold text-foreground">
                {activeLayer.metricLabel}
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4">
            <div className="flex flex-wrap gap-2">
              {activeLayer.stack.map(item => (
                <span
                  key={item}
                  className="rounded-sm bg-secondary px-3 py-1.5 text-xs font-bold text-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 rounded-sm bg-foreground px-4 py-2 text-xs font-extrabold text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <span>Projeleri İncele</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 3: Signature Edge-to-Edge Marquee Band Tile */}
      <div className="overflow-hidden rounded-md bg-card py-3.5">
        <div className="flex w-max animate-slide-infinite items-center gap-10 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-10 text-sm font-extrabold tracking-tight text-foreground md:text-base"
            >
              <span>{item}</span>
              <span className="h-2 w-2 rounded-full bg-primary" />
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} aria-label="Rakamlarla Kariyer">
      <motion.div
        className="grid grid-cols-2 gap-2 md:grid-cols-4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className={`flex flex-col justify-between rounded-md p-6 md:p-7 ${
              idx === 0
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-foreground'
            }`}
          >
            <div className="flex items-baseline justify-between gap-2">
              <span
                className={`font-extrabold leading-none tracking-tight ${
                  idx === 0 ? 'text-primary-foreground' : 'text-primary'
                }`}
                style={{ fontSize: 'clamp(2.5rem, 1.4rem + 3vw, 4.25rem)' }}
              >
                {isInView && <CountUp end={stat.value} suffix={stat.suffix} />}
              </span>
              <span
                className={`text-xs font-extrabold ${
                  idx === 0
                    ? 'text-primary-foreground/80'
                    : 'text-muted-foreground'
                }`}
              >
                {stat.label}
              </span>
            </div>
            <p
              className={`mt-4 text-xs font-medium ${
                idx === 0
                  ? 'text-primary-foreground/90'
                  : 'text-muted-foreground'
              }`}
            >
              {stat.detail}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} aria-label="Hakkımda ve Elly Ekosistemi">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
        className="grid grid-cols-12 gap-2"
      >
        {/* Left Tile: Engineering Story (Cols 1-7) */}
        <motion.div
          variants={fadeInUp}
          className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:p-9 lg:col-span-7"
        >
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-bold text-primary">
                2011 – 2026 Mühendislik Yolculuğu
              </span>
              <span className="text-xs font-semibold text-muted-foreground">
                İstanbul, Türkiye
              </span>
            </div>

            <h2
              className="mb-6 font-extrabold tracking-tight text-foreground"
              style={{ fontSize: 'clamp(1.75rem, 1.1rem + 2vw, 2.75rem)' }}
            >
              Hakkımda
            </h2>

            <div className="space-y-4 text-base leading-[1.68] text-muted-foreground">
              <p>
                2011 yılında Projesoft&apos;ta başladığım frontend yolculuğu,
                bugün{' '}
                <strong className="font-semibold text-foreground">
                  10+ yıllık deneyime
                </strong>{' '}
                dönüştü. E-ticaret&apos;ten fintech&apos;e, medya
                platformlarından kurumsal uygulamalara kadar çeşitli sektörlerde
                çalıştım. jQuery ve PHP&apos;den React ve Next.js&apos;e,
                monolitik yapılardan mikroservis mimarilerine kadar teknolojinin
                evrimini bizzat yaşadım.
              </p>

              <p>
                React ekosisteminde uzmanlaşmanın yanı sıra, son yıllarda{' '}
                <strong className="font-semibold text-foreground">
                  Java Spring Boot
                </strong>{' '}
                ile backend geliştirme,{' '}
                <strong className="font-semibold text-foreground">
                  Kubernetes
                </strong>{' '}
                ile DevOps altyapısı ve{' '}
                <strong className="font-semibold text-foreground">
                  React Native
                </strong>{' '}
                ile mobil uygulama geliştirme alanlarında da derinleşiyorum.
              </p>

              <p>
                <strong className="font-semibold text-foreground">
                  Hangikredi&apos;de takım lideri
                </strong>{' '}
                olarak teknik kararların yanı sıra junior geliştiricilerin
                mentorluğunu yapıyor, code review süreçlerini yönetiyor ve CI/CD
                pipeline&apos;larını optimize ediyorum.
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2">
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
                className="rounded-sm border-0 bg-secondary px-3 py-1.5 text-xs font-bold text-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Right Tile: Elly Studio 4-Repo Multi-Tenant Ecosystem Board (Cols 8-12) */}
        <motion.div
          variants={fadeInUp}
          className="col-span-12 flex flex-col justify-between rounded-md bg-foreground p-6 text-background md:p-9 lg:col-span-5"
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-sm bg-primary px-2.5 py-1 text-xs font-extrabold text-primary-foreground">
                Açık Kaynak & Ürün Mimarisi
              </span>
              <Link
                href="/projects/elly"
                className="text-background/80 text-xs font-bold transition-colors hover:text-primary"
              >
                Mimariyi Gör ↗
              </Link>
            </div>

            <h3 className="mb-2 text-2xl font-extrabold tracking-tight text-background">
              Elly Studio — 4 Repoluk Ekosistem
            </h3>
            <p className="text-background/75 mb-6 text-sm leading-relaxed">
              Tek bir sözleşme (`REST /api/v1` + `STOMP`) etrafında koordine
              edilen, db-per-tenant izolasyonlu uçtan uca içerik ve gerçek
              zamanlı iletişim platformu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
            {ELLY_ECOSYSTEM.map(item => (
              <Link
                key={item.repo}
                href={item.url}
                className="bg-background/10 group flex flex-col justify-between rounded-sm p-3.5 transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-extrabold text-background group-hover:text-primary-foreground">
                    {item.repo}
                  </span>
                  <span className="text-xs font-semibold text-primary group-hover:text-primary-foreground">
                    {item.role}
                  </span>
                </div>
                <p className="text-background/70 group-hover:text-primary-foreground/90 mt-1 text-xs">
                  {item.stack}
                </p>
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} aria-label="Çalışma Yaklaşımım">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
        className="grid grid-cols-12 gap-2"
      >
        {/* Header Tile (Cols 1-3) */}
        <motion.div
          variants={fadeInUp}
          className="col-span-12 flex flex-col justify-between rounded-md bg-secondary p-6 md:p-8 lg:col-span-3"
        >
          <div>
            <span className="mb-2 inline-block text-xs font-bold text-primary">
              Mühendislik İlkeleri
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground md:text-3xl">
              Çalışma Yaklaşımım
            </h2>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Her projede kaliteyi, performansı ve ekip iletişimini ön planda
            tutuyorum.
          </p>
        </motion.div>

        {/* 3 Pillar Tiles (Cols 4-12) */}
        {values.map(value => (
          <motion.div
            key={value.title}
            variants={fadeInUp}
            className="col-span-12 md:col-span-4 lg:col-span-3"
          >
            <Card className="group flex h-full flex-col justify-between rounded-md border-0 bg-card p-6 transition-colors duration-200 hover:bg-foreground hover:text-background md:p-8">
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-sm bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <span className="group-hover:text-background/70 text-xs font-bold text-muted-foreground transition-colors">
                    {value.tag}
                  </span>
                </div>
                <h3 className="mb-2.5 text-xl font-extrabold tracking-tight">
                  {value.title}
                </h3>
                <p className="group-hover:text-background/80 text-sm leading-relaxed text-muted-foreground transition-colors">
                  {value.description}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
