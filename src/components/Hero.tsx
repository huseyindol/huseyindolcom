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
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
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
      <StatsSection />
      <AboutSection />
      <ValuesSection />
    </div>
  )
}

function HeroBanner() {
  return (
    <section className="bg-background pb-20 pt-16 text-foreground md:pb-28 md:pt-24">
      <div className="container mx-auto px-6">
        {/* Top Editorial Meta Row */}
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Badge className="rounded-none border-0 bg-card px-3.5 py-1.5 text-sm font-semibold text-foreground">
            {siteInfo.sayHi}
          </Badge>
          <span className="text-sm font-medium text-muted-foreground">
            İstanbul · Full Stack & Sistem Mimarisi
          </span>
        </div>

        {/* Masked Two-Line Statement Headline */}
        <h1
          className="mb-14 font-extrabold leading-[0.92] tracking-[-0.04em] text-foreground md:mb-20"
          style={{ fontSize: 'clamp(2.75rem, 1.2rem + 6.2vw, 6.5rem)' }}
        >
          <span className="block overflow-hidden pb-1">
            <span className="animate-line-reveal block text-primary">
              {siteInfo.title.highlight}
            </span>
          </span>
          <span className="block overflow-hidden pb-2 md:pl-[7vw]">
            <span className="animate-line-reveal-delayed block text-foreground">
              {siteInfo.title.rest}
            </span>
          </span>
        </h1>

        {/* Bottom 12-Column Editorial Split: Supporting Copy + Solid Actions */}
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p
              className="max-w-[60ch] text-lg leading-[1.6] text-muted-foreground md:text-xl [&_strong]:font-semibold [&_strong]:text-foreground"
              dangerouslySetInnerHTML={{ __html: siteInfo.description }}
            />
          </div>

          <div className="flex flex-col items-start gap-6 md:col-span-5 md:items-end">
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                size="lg"
                className="rounded-none border-0 bg-primary px-7 py-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-foreground hover:text-background"
                onClick={() => {
                  sendGTMEvent({ event: 'buttonClick', platform: 'email' })
                  window.open(siteInfo.email, '_blank')
                }}
              >
                <Mail className="mr-2 h-5 w-5" />
                İletişime Geç
              </Button>
              <Button
                size="lg"
                className="rounded-none border-0 bg-card px-7 py-6 text-base font-semibold text-foreground transition-colors hover:bg-foreground hover:text-background"
                onClick={() => {
                  sendGTMEvent({
                    event: 'buttonClick',
                    platform: 'cv-download',
                  })
                  window.open(siteInfo.cvUrl, '_blank')
                }}
              >
                <Download className="mr-2 h-5 w-5" />
                CV İndir
              </Button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {siteInfo.socialLinks.map(link => (
                <Link
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  aria-label={link.platform}
                  className="flex h-10 w-10 items-center justify-center bg-card text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
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
      </div>
    </section>
  )
}

function StatsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="bg-foreground py-20 text-background">
      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h2 className="text-2xl font-extrabold tracking-tight text-background md:text-3xl">
            Rakamlarla Üretim
          </h2>
          <p className="text-background/70 max-w-md text-sm">
            Kurumsal ölçekli platformlar, açık kaynak sistemler ve çoklu
            disiplinlerde kesintisiz mühendislik pratiği.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 gap-10 md:grid-cols-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          {stats.map(stat => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="bg-background/5 p-6 md:p-8"
            >
              <div
                className="mb-2 font-extrabold leading-none tracking-tight text-primary"
                style={{ fontSize: 'clamp(2.5rem, 1.5rem + 3.5vw, 4.5rem)' }}
              >
                {isInView && <CountUp end={stat.value} suffix={stat.suffix} />}
              </div>
              <div className="text-background/80 text-sm font-semibold">
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
    <section ref={ref} className="bg-card py-24 text-card-foreground md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
          className="grid gap-14 md:grid-cols-12 md:items-start"
        >
          {/* Left Column: Architectural Portrait + Flat Caption Block */}
          <motion.div variants={fadeInUp} className="md:col-span-5">
            <div className="mx-auto max-w-sm md:mx-0">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-background">
                <Image
                  src="https://github.com/huseyindol.png"
                  alt="Hüseyin DOL"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-background p-6">
                <p className="text-base font-extrabold text-foreground">
                  Hüseyin DOL
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  10+ yıl deneyim · Full Stack Software Developer & Team Lead
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Biography */}
          <motion.div variants={stagger} className="space-y-6 md:col-span-7">
            <motion.div variants={fadeInUp}>
              <h2
                className="mb-2 font-extrabold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3.25rem)' }}
              >
                Hakkımda
              </h2>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="max-w-[65ch] text-base leading-[1.7] text-muted-foreground md:text-lg"
            >
              2011 yılında Projesoft&apos;ta başladığım frontend yolculuğu,
              bugün{' '}
              <strong className="font-semibold text-foreground">
                10+ yıllık deneyime
              </strong>{' '}
              dönüştü. E-ticaret&apos;ten fintech&apos;e, medya platformlarından
              kurumsal uygulamalara kadar çeşitli sektörlerde çalıştım. jQuery
              ve PHP&apos;den React ve Next.js&apos;e, monolitik yapılardan
              mikroservis mimarilerine kadar teknolojinin evrimini bizzat
              yaşadım.
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="max-w-[65ch] text-base leading-[1.7] text-muted-foreground md:text-lg"
            >
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
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="max-w-[65ch] text-base leading-[1.7] text-muted-foreground md:text-lg"
            >
              <strong className="font-semibold text-foreground">
                Hangikredi&apos;de takım lideri
              </strong>{' '}
              olarak teknik kararların yanı sıra junior geliştiricilerin
              mentorluğunu yapıyor, code review süreçlerini yönetiyor ve CI/CD
              pipeline&apos;larını optimize ediyorum.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-wrap gap-2 pt-3"
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
                  className="rounded-none border-0 bg-background px-3.5 py-1.5 text-sm font-semibold text-foreground"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-background py-24 text-foreground md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={stagger}
        >
          <motion.div
            variants={fadeInUp}
            className="mb-16 grid gap-6 md:grid-cols-12 md:items-end"
          >
            <div className="md:col-span-6">
              <h2
                className="font-extrabold tracking-tight text-foreground"
                style={{ fontSize: 'clamp(2rem, 1.2rem + 2.5vw, 3.25rem)' }}
              >
                Çalışma Yaklaşımım
              </h2>
            </div>
            <div className="md:col-span-6">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Her projede kaliteyi, performansı ve ekip iletişimini ön planda
                tutuyorum.
              </p>
            </div>
          </motion.div>

          <motion.div className="grid gap-6 md:grid-cols-3" variants={stagger}>
            {values.map(value => (
              <motion.div key={value.title} variants={fadeInUp}>
                <Card className="group h-full rounded-none border-0 bg-card p-8 transition-colors duration-200 hover:bg-foreground hover:text-background md:p-10">
                  <div className="mb-8 inline-flex h-12 w-12 items-center justify-center bg-background text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-extrabold tracking-tight">
                    {value.title}
                  </h3>
                  <p className="group-hover:text-background/80 leading-relaxed text-muted-foreground transition-colors">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
