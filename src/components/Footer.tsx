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
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <footer ref={ref} className="bg-foreground text-background">
      <div className="container mx-auto flex min-h-[75svh] flex-col justify-between px-6 py-16 md:py-24">
        {/* Top Row: 4 Editorial Columns */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-12 md:grid-cols-12"
        >
          {/* Column 1: Identity */}
          <div className="md:col-span-4">
            <Link href="/" className="mb-5 flex items-center gap-3">
              <div className="bg-background/10 relative h-10 w-10 shrink-0 overflow-hidden">
                <Image
                  src="/assets/img/huseyindol.png"
                  alt="Hüseyin DOL"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-base font-extrabold tracking-tight text-background">
                Hüseyin DOL
              </span>
            </Link>
            <p className="text-background/70 max-w-sm text-sm leading-relaxed">
              Software Developer. React, Next.js ve TypeScript ile frontend,
              Java ve Spring Boot ile backend; uçtan uca web uygulamaları
              geliştiriyorum.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="md:col-span-2">
            <h3 className="mb-4 text-sm font-bold text-background">Sayfalar</h3>
            <ul className="space-y-2.5">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-sm transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Architecture & Stack */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-bold text-background">Bu Site</h3>
            <div className="flex flex-wrap gap-1.5">
              {techStack.map(tech => (
                <span
                  key={tech}
                  className="bg-background/10 text-background/80 px-2.5 py-1 text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <Link
                href="https://github.com/huseyindol/huseyindolcom"
                target="_blank"
                className="text-background/75 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <Github className="h-4 w-4" />
                Açık kaynak kodları
              </Link>
            </div>
          </div>

          {/* Column 4: Direct Contact & Social */}
          <div className="md:col-span-3">
            <h3 className="mb-4 text-sm font-bold text-background">İletişim</h3>
            <div className="mb-6">
              <a
                href="mailto:huseyindol@gmail.com"
                className="text-background/80 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary"
              >
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                huseyindol@gmail.com
              </a>
            </div>

            <h4 className="mb-3 text-sm font-bold text-background">
              Bağlantılar
            </h4>
            <div className="flex gap-2">
              {socialLinks.map(s => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  aria-label={s.label}
                  title={s.label}
                  className="bg-background/10 text-background/80 flex h-10 w-10 items-center justify-center transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Row: Full-width Statement Wordmark + Colophon */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-20 pt-8"
        >
          <div
            aria-hidden="true"
            className="mb-6 select-none font-extrabold leading-[0.86] tracking-[-0.045em] text-background"
            style={{ fontSize: 'clamp(3rem, 11.2vw, 10.5rem)' }}
          >
            HÜSEYİN DOL
          </div>

          <div className="text-background/65 flex flex-col items-start justify-between gap-4 text-sm sm:flex-row sm:items-center">
            <p>
              © {currentYear} Hüseyin DOL. React, Next.js & TypeScript ile inşa
              edildi.
            </p>
            <a
              href="/assets/files/Huseyin_DOL_CV_2026.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-background transition-colors hover:text-primary"
            >
              CV İndir →
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
