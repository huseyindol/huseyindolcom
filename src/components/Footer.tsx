import { motion, useInView } from 'framer-motion'
import { Mail } from 'lucide-react'
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'

const currentYear = new Date().getFullYear()

const navLinks = [
  { href: '/about', label: 'Hakkında' },
  { href: '/skills', label: 'Yetenekler' },
  { href: '/experience', label: 'Deneyim' },
  { href: '/projects', label: 'Projeler' },
  { href: '/blog', label: 'Makalelerim' },
]

const techStack = [
  'Next.js 16',
  'React 19',
  'TypeScript',
  'Tailwind CSS 4',
  'Framer Motion',
  'Shadcn UI',
  'Spring Boot',
  'Vercel',
]

const socialLinks = [
  {
    href: 'https://github.com/huseyindol',
    icon: Github,
    label: 'GitHub',
  },
  {
    href: 'https://www.linkedin.com/in/huseyindol/',
    icon: Linkedin,
    label: 'LinkedIn',
  },
  {
    href: 'mailto:huseyindol@gmail.com',
    icon: Mail,
    label: 'E-posta',
  },
]

export default function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <footer ref={ref} className="px-2 pb-2 md:px-3">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-[1680px] flex-col gap-2"
      >
        {/* Row 1: Action Tile Band (dense-tiles §7.3 CTA row) */}
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:col-span-3">
            <span className="text-xs font-extrabold text-primary">
              Yeni Proje & Danışmanlık
            </span>
            <p className="mt-4 text-sm font-semibold text-foreground">
              Kurumsal mimari, ekip liderliği ve uçtan uca ürün geliştirme için
              iletişime geçin.
            </p>
          </div>

          <div className="col-span-12 flex flex-col justify-between gap-6 rounded-md bg-primary p-6 text-primary-foreground md:col-span-6 md:flex-row md:items-center md:p-8">
            <div>
              <h2 className="mb-1 text-2xl font-extrabold tracking-tight md:text-3xl">
                Birlikte Üretelim
              </h2>
              <p className="text-primary-foreground/90 text-sm font-medium">
                huseyindol@gmail.com üzerinden doğrudan ulaşabilirsiniz.
              </p>
            </div>
            <a
              href="mailto:huseyindol@gmail.com"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-sm bg-foreground px-6 text-sm font-extrabold text-background transition-colors hover:bg-background hover:text-foreground"
            >
              E-posta Gönder ↗
            </a>
          </div>

          <div className="col-span-12 flex flex-col justify-between rounded-md bg-foreground p-6 text-background md:col-span-3">
            <span className="text-xs font-extrabold text-primary">
              Özgeçmiş (2026)
            </span>
            <div className="mt-4 flex items-end justify-between">
              <span className="text-background/85 text-sm font-bold">
                Hüseyin DOL · PDF
              </span>
              <a
                href="/assets/files/Huseyin_DOL_CV_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-sm bg-primary px-3.5 py-2 text-xs font-extrabold text-primary-foreground transition-colors hover:bg-background hover:text-foreground"
              >
                CV İndir →
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: 4 Info Tiles + Monumental Block Wordmark Tile */}
        <div className="grid grid-cols-12 gap-2">
          {/* Identity Tile */}
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:col-span-4">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-sm bg-secondary">
                <Image
                  src="/assets/img/huseyindol.png"
                  alt="Hüseyin DOL"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-base font-extrabold tracking-tight text-foreground">
                Hüseyin DOL
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Software Developer. React, Next.js ve TypeScript ile frontend,
              Java ve Spring Boot ile backend; uçtan uca web uygulamaları
              geliştiriyorum.
            </p>
          </div>

          {/* Navigation Tile */}
          <div className="col-span-6 rounded-md bg-card p-6 md:col-span-2">
            <h3 className="mb-3 text-sm font-extrabold text-foreground">
              Sayfalar
            </h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Tile */}
          <div className="col-span-6 flex flex-col justify-between rounded-md bg-card p-6 md:col-span-3">
            <div>
              <h3 className="mb-3 text-sm font-extrabold text-foreground">
                Bu Site
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map(tech => (
                  <span
                    key={tech}
                    className="rounded-sm bg-secondary px-2.5 py-1 text-xs font-bold text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="https://github.com/huseyindol/huseyindolcom"
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 text-xs font-extrabold text-primary transition-colors hover:text-foreground"
            >
              <Github className="h-4 w-4" />
              Açık Kaynak Kodları ↗
            </Link>
          </div>

          {/* Social & Copyright Tile */}
          <div className="col-span-12 flex flex-col justify-between rounded-md bg-card p-6 md:col-span-3">
            <div>
              <h3 className="mb-3 text-sm font-extrabold text-foreground">
                Bağlantılar
              </h3>
              <div className="flex gap-2">
                {socialLinks.map(s => (
                  <Link
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    aria-label={s.label}
                    title={s.label}
                    className="flex h-10 flex-1 items-center justify-center rounded-sm bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <s.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            <p className="mt-6 text-xs font-semibold text-muted-foreground">
              © {currentYear} Hüseyin DOL · İstanbul
            </p>
          </div>
        </div>

        {/* Row 3: Monumental Block Wordmark Tile (dense-tiles §7.4) */}
        <div className="overflow-hidden rounded-md bg-foreground px-4 py-4 text-background md:px-6 md:py-5">
          <div
            aria-hidden="true"
            className="select-none text-center font-extrabold leading-[0.84] tracking-[-0.045em] text-background"
            style={{ fontSize: 'clamp(2.8rem, 11.4vw, 11.5rem)' }}
          >
            HÜSEYİN DOL
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
