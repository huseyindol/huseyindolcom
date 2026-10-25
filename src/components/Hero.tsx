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
  flow: string[]
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
    flow: ['Edge CDN', 'Next.js BFF', 'SSR / ISR Cache', 'Hydrated Glass UI'],
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
    flow: ['X-Tenant-ID', 'JWE Auth Filter', 'Tenant Routing DS', 'Redis AOF'],
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
    flow: ['Biometric / 2FA', 'Provider State', 'STOMP Broker', 'WebRTC P2P'],
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
    flow: ['GitHub CI', 'Multi-Stage Image', 'K8s HPA', 'Prometheus Telemetry'],
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
    title: 'Sözleşme Öncelikli Mimari',
    tag: 'SOLID & Tip Güvenliği',
    description:
      'API şemaları, izin anahtarları ve gerçek zamanlı STOMP başlıkları tek merkezden tanımlanır; web ve mobil istemciler sıfır sürprizle senkronize çalışır.',
  },
  {
    icon: Zap,
    title: 'Sıfır Jenerik Kalıp',
    tag: 'High-Craft Glass UI',
    description:
      'Sıradan şablonlar yerine derinlikli cam yüzeyler, mikro-etkileşimler ve yüksek kontrastlı tipografiyle akılda kalıcı mühendislik arayüzleri.',
  },
  {
    icon: Users,
    title: 'Ölçülebilir Mühendislik',
    tag: 'CWV & Otomatize Test',
    description:
      'Core Web Vitals, %100 tip kontrolü, binlerce birim/entegrasyon testi ve code review disipliniyle sürdürülebilir takım hızı.',
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
    <div className="px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
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
    <section aria-label="Giriş ve Mimari Pano" className="flex flex-col gap-10">
      {/* Row 1: Linear Spotlight Hero Stage */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_80px_-15px_rgba(6,182,212,0.16),inset_0_1px_0_rgba(255,255,255,0.8)] backdrop-blur-2xl sm:p-10 lg:p-12 dark:border-white/[0.1] dark:bg-white/[0.03] dark:shadow-[0_24px_80px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.15)]">
        {/* Overhead Radial Beam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 left-1/2 h-80 w-[760px] -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-500/25 via-sky-400/20 to-emerald-500/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent"
        />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          {/* Left Spotlight Copy (Cols 1-7) */}
          <div className="flex flex-col justify-between lg:col-span-7">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <Badge className="rounded-full border border-cyan-500/30 bg-cyan-500/15 px-3.5 py-1 text-xs font-bold text-cyan-700 shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:text-cyan-300">
                {siteInfo.sayHi}
              </Badge>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-600 backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
                İstanbul · Squad Team Lead @ Hangikredi
              </span>
            </div>

            <h1
              className="mb-6 font-extrabold leading-[1.02] tracking-[-0.035em] text-slate-900 dark:text-white"
              style={{ fontSize: 'clamp(2.35rem, 1.2rem + 3.8vw, 4.5rem)' }}
            >
              <span className="block bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-transparent">
                {siteInfo.title.highlight}
              </span>
              <span className="mt-1 block text-slate-900 dark:text-slate-100">
                {siteInfo.title.rest}
              </span>
            </h1>

            <p
              className="mb-8 max-w-[64ch] text-base leading-[1.7] text-slate-600 md:text-lg dark:text-slate-300 [&_strong]:font-semibold [&_strong]:text-slate-900 dark:[&_strong]:text-white"
              dangerouslySetInnerHTML={{ __html: siteInfo.description }}
            />

            {/* Primary & Secondary Action Buttons + Social Pills */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Button
                size="lg"
                className="h-12 rounded-full border-0 bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 text-sm font-bold text-slate-950 shadow-[0_0_28px_rgba(6,182,212,0.4)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_38px_rgba(6,182,212,0.65)]"
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
                className="h-12 rounded-full border border-slate-300/80 bg-white/75 px-6 text-sm font-bold text-slate-900 shadow-lg backdrop-blur-xl transition-all duration-200 hover:border-cyan-400/50 hover:bg-white dark:border-white/15 dark:bg-white/[0.06] dark:text-white dark:hover:bg-white/[0.12]"
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

              <div className="ml-auto flex items-center gap-2">
                {siteInfo.socialLinks.map(link => (
                  <Link
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    aria-label={link.platform}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/70 text-slate-700 shadow-sm backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-500 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200 dark:hover:text-cyan-300"
                  >
                    {link.platform === 'github' && (
                      <Github className="h-4 w-4" />
                    )}
                    {link.platform === 'linkedin' && (
                      <Linkedin className="h-4 w-4" />
                    )}
                    {link.platform === 'email' && <Mail className="h-4 w-4" />}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sleek Glass Portrait Card + Telemetry Chips (Cols 8-12) */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/70 p-5 shadow-[0_24px_80px_rgba(6,182,212,0.18)] backdrop-blur-2xl dark:border-white/15 dark:bg-white/[0.04]">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-900">
                <Image
                  src="https://github.com/huseyindol.png"
                  alt="Hüseyin DOL"
                  fill
                  priority
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-xl border border-white/15 bg-slate-950/65 px-3.5 py-2.5 text-white backdrop-blur-xl">
                  <div>
                    <p className="text-sm font-bold">Hüseyin DOL</p>
                    <p className="text-xs text-cyan-300">
                      Senior Full Stack Developer & Team Lead
                    </p>
                  </div>
                  <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
                    10+ Yıl
                  </span>
                </div>
              </div>

              {/* Floating Glass Telemetry Chips */}
              <div className="mt-4 grid grid-cols-2 gap-2.5">
                {[
                  { k: 'Odak', v: 'Full Stack & Cloud' },
                  { k: 'Frontend', v: 'React 19 · Next.js 16' },
                  { k: 'Backend', v: 'Java 21 · Spring 3.5' },
                  { k: 'Mobil', v: 'Flutter 3 · RN' },
                ].map(item => (
                  <div
                    key={item.k}
                    className="rounded-xl border border-slate-200/70 bg-white/60 px-3 py-2 backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.03]"
                  >
                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                      {item.k}
                    </p>
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-100">
                      {item.v}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Interactive Linear-Style Elly Architecture Workbench */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-6 shadow-2xl backdrop-blur-2xl sm:p-8 dark:border-white/[0.09] dark:bg-white/[0.03]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent"
        />

        <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Canlı Mimari Konsolu
            </span>
            <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900 md:text-2xl dark:text-white">
              Uçtan Uca Mühendislik Katmanları
            </h2>
          </div>

          {/* 4 Glass Tabs */}
          <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-200/80 bg-slate-100/80 p-1.5 dark:border-white/[0.08] dark:bg-slate-950/60">
            {ARCHITECTURE_LAYERS.map(layer => {
              const active = layer.id === activeLayer.id
              return (
                <button
                  key={layer.id}
                  type="button"
                  onClick={() => setActiveLayerId(layer.id)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-bold transition-all duration-200 sm:text-sm ${
                    active
                      ? 'border border-cyan-500/30 bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 text-cyan-700 shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:text-cyan-300'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {layer.tab}
                </button>
              )
            })}
          </div>
        </div>

        {/* Active Layer Console Body */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200/70 bg-white/60 p-6 backdrop-blur-xl lg:col-span-8 dark:border-white/[0.08] dark:bg-white/[0.02]">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                {activeLayer.productionProof}
              </span>
              <h3 className="mb-3 text-2xl font-bold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                {activeLayer.headline}
              </h3>
              <p className="mb-6 max-w-[62ch] text-sm leading-relaxed text-slate-600 md:text-base dark:text-slate-300">
                {activeLayer.summary}
              </p>
            </div>

            {/* Live Architecture Flow Pills */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {activeLayer.flow.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-700 dark:text-cyan-300">
                      {step}
                    </span>
                    {i < activeLayer.flow.length - 1 && (
                      <span
                        aria-hidden="true"
                        className="text-xs text-slate-400"
                      >
                        →
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {activeLayer.stack.map(item => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200/80 bg-white/80 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Metric Spotlight Panel */}
          <div className="flex flex-col justify-between rounded-2xl border border-cyan-500/25 bg-gradient-to-br from-cyan-500/10 via-slate-900/5 to-emerald-500/10 p-6 backdrop-blur-xl lg:col-span-4 dark:from-cyan-500/15 dark:via-white/[0.02] dark:to-emerald-500/15">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-300">
                Üretim Telemetrisi
              </span>
              <p
                className="my-4 bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text font-extrabold leading-none tracking-tight text-transparent"
                style={{ fontSize: 'clamp(2.5rem, 1.5rem + 2.5vw, 3.75rem)' }}
              >
                {activeLayer.metric}
              </p>
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                {activeLayer.metricLabel}
              </p>
            </div>

            <Link
              href="/projects"
              className="mt-6 inline-flex items-center justify-between rounded-xl border border-cyan-500/30 bg-white/80 px-4 py-3 text-xs font-bold text-slate-900 transition-all hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)] dark:bg-white/[0.06] dark:text-white"
            >
              <span>Tüm Mimari Projeleri İncele</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Row 3: Glass Marquee Ribbon */}
      <div className="overflow-hidden rounded-full border border-slate-200/80 bg-white/70 py-3 shadow-lg backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.02]">
        <div className="flex w-max animate-slide-infinite items-center gap-10 whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, idx) => (
            <span
              key={`${item}-${idx}`}
              className="inline-flex items-center gap-10 text-xs font-bold uppercase tracking-wider text-slate-600 md:text-sm dark:text-slate-300"
            >
              <span>{item}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
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
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
      >
        {stats.map(stat => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-400/40 dark:border-white/[0.08] dark:bg-white/[0.03]"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent opacity-75 transition-opacity group-hover:opacity-100"
            />
            <div className="flex items-baseline justify-between gap-2">
              <span
                className="bg-gradient-to-r from-cyan-500 via-sky-400 to-emerald-400 bg-clip-text font-extrabold leading-none tracking-tight text-transparent"
                style={{ fontSize: 'clamp(2.25rem, 1.3rem + 2.5vw, 3.5rem)' }}
              >
                {isInView && <CountUp end={stat.value} suffix={stat.suffix} />}
              </span>
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                {stat.label}
              </span>
            </div>
            <p className="mt-3 text-xs font-medium text-slate-500 dark:text-slate-400">
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
    <section id="about" ref={ref} aria-label="Hakkımda ve Elly Ekosistemi">
      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={stagger}
        className="grid grid-cols-1 gap-6 lg:grid-cols-12"
      >
        {/* Left Glass Bento: Biography (Cols 1-7) */}
        <motion.div
          variants={fadeInUp}
          className="glass-panel flex flex-col justify-between p-6 sm:p-8 lg:col-span-7"
        >
          <div>
            <div className="mb-4 flex items-center justify-between gap-2">
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                2011 – 2026 Mühendislik Yolculuğu
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                İstanbul, Türkiye
              </span>
            </div>

            <h2
              className="mb-5 font-extrabold tracking-tight text-slate-900 dark:text-white"
              style={{ fontSize: 'clamp(1.75rem, 1.1rem + 2vw, 2.5rem)' }}
            >
              Hakkımda
            </h2>

            <div className="space-y-4 text-base leading-[1.7] text-slate-600 dark:text-slate-300">
              <p>
                2011 yılında Projesoft&apos;ta başladığım frontend yolculuğu,
                bugün{' '}
                <strong className="font-semibold text-slate-900 dark:text-white">
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
                <strong className="font-semibold text-slate-900 dark:text-white">
                  Java Spring Boot
                </strong>{' '}
                ile backend geliştirme,{' '}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  Kubernetes
                </strong>{' '}
                ile DevOps altyapısı ve{' '}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  React Native & Flutter
                </strong>{' '}
                ile mobil uygulama geliştirme alanlarında da derinleşiyorum.
              </p>

              <p>
                <strong className="font-semibold text-slate-900 dark:text-white">
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
              'React 19',
              'Next.js 16',
              'TypeScript',
              'Java 21',
              'Kubernetes',
              'Flutter 3',
            ].map(tech => (
              <Badge
                key={tech}
                variant="secondary"
                className="rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-slate-800 dark:border-white/[0.1] dark:bg-white/[0.05] dark:text-slate-200"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Right Glass Bento: Elly Studio 4-Repo Ecosystem (Cols 8-12) */}
        <motion.div
          variants={fadeInUp}
          className="glass-panel flex flex-col justify-between p-6 sm:p-8 lg:col-span-5"
        >
          <div>
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                Açık Kaynak & Ürün Mimarisi
              </span>
              <Link
                href="/projects/elly"
                className="text-xs font-bold text-cyan-600 transition-colors hover:text-cyan-400 dark:text-cyan-300"
              >
                Mimariyi Gör ↗
              </Link>
            </div>

            <h3 className="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Elly Studio — 4 Repoluk Ekosistem
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Tek bir sözleşme (`REST /api/v1` + `STOMP`) etrafında koordine
              edilen, db-per-tenant izolasyonlu uçtan uca içerik ve gerçek
              zamanlı iletişim platformu.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {ELLY_ECOSYSTEM.map(item => (
              <Link
                key={item.repo}
                href={item.url}
                className="group rounded-2xl border border-slate-200/80 bg-white/60 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-400/50 hover:shadow-[0_8px_30px_rgba(6,182,212,0.15)] dark:border-white/[0.08] dark:bg-white/[0.03]"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-900 group-hover:text-cyan-600 dark:text-white dark:group-hover:text-cyan-300">
                    {item.repo}
                  </span>
                  <span className="text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                    {item.role}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
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
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {values.map(value => (
          <motion.div key={value.title} variants={fadeInUp}>
            <Card className="glass-panel group relative flex h-full flex-col justify-between overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"
              />
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 text-cyan-600 shadow-[0_0_20px_rgba(6,182,212,0.2)] dark:text-cyan-300">
                    <value.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-slate-200/80 bg-white/60 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-300">
                    {value.tag}
                  </span>
                </div>
                <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
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
