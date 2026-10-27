import BrandLogo from '@/components/BrandLogo'
import { motion, useInView } from 'framer-motion'
import { Heart, Mail } from 'lucide-react'
import { FaGithub as Github, FaLinkedin as Linkedin } from 'react-icons/fa'
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
    <footer
      ref={ref}
      className="brand-hero-surface relative overflow-hidden border-t border-white/10 text-zinc-100"
    >
      {/* Architectural grid & subtle brand glow */}
      <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-40" />
      <div className="brand-glow-orb pointer-events-none absolute -top-40 left-1/2 h-80 w-96 -translate-x-1/2 rounded-full blur-3xl" />

      <div className="container relative mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid gap-12 md:grid-cols-4"
        >
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/" className="mb-6 inline-flex items-center gap-3">
              <BrandLogo footer />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              Software Developer. React, Next.js ve TypeScript ile frontend,
              Java ve Spring Boot ile backend; uçtan uca web uygulamaları
              geliştiriyorum.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Sayfalar
            </h3>
            <ul className="space-y-3">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-400 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Bu Site
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map(tech => (
                <span
                  key={tech}
                  className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="mt-5">
              <Link
                href="https://github.com/huseyindol/huseyindolcom"
                target="_blank"
                className="inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Github className="h-4 w-4" />
                Açık kaynak
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
              İletişim
            </h3>
            <div className="mb-6 space-y-3">
              <a
                href="mailto:huseyindol@gmail.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 transition-colors hover:text-white"
              >
                <Mail className="brand-text-accent h-4 w-4 shrink-0" />
                huseyindol@gmail.com
              </a>
            </div>

            <h4 className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
              Sosyal
            </h4>
            <div className="flex gap-3">
              {socialLinks.map(s => (
                <Link
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  aria-label={s.label}
                  title={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:border-white/30 hover:bg-white/10 hover:text-white"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-slate-500 sm:flex-row"
        >
          <p className="flex items-center gap-2">
            © {currentYear} Hüseyin DOL. Made with
            <Heart className="h-3.5 w-3.5 fill-current text-red-500" />
            using React & TypeScript
          </p>
          <a
            href="/assets/files/Huseyin_DOL_CV_2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            CV İndir →
          </a>
        </motion.div>
      </div>
    </footer>
  )
}
