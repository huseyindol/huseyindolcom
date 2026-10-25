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
    <footer
      ref={ref}
      className="relative mt-12 border-t border-slate-200/70 px-4 pb-8 pt-12 sm:px-6 lg:px-8 dark:border-white/[0.08]"
    >
      {/* Top 1px Linear Horizon Beam */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
      />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto flex max-w-6xl flex-col gap-6"
      >
        {/* Row 1: Specular Glass CTA Horizon Card */}
        <div className="glass-panel relative overflow-hidden p-6 sm:p-8 md:p-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 right-10 h-56 w-56 rounded-full bg-gradient-to-br from-cyan-500/25 to-emerald-500/20 blur-3xl"
          />
          <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-700 dark:text-cyan-300">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                Yeni Proje & Kurumsal Mimari Danışmanlık
              </span>
              <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-slate-900 md:text-3xl dark:text-white">
                Birlikte Yüksek Ölçekli Ürünler Üretelim
              </h2>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                huseyindol@gmail.com üzerinden veya sosyal ağlardan doğrudan
                ulaşabilirsiniz.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="mailto:huseyindol@gmail.com"
                className="inline-flex h-11 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 px-6 text-sm font-bold text-slate-950 shadow-[0_0_24px_rgba(6,182,212,0.35)] transition-all hover:scale-[1.02]"
              >
                E-posta Gönder ↗
              </a>
              <a
                href="/assets/files/Huseyin_DOL_CV_2026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full border border-slate-300/80 bg-white/75 px-5 text-sm font-bold text-slate-900 backdrop-blur-xl transition-all hover:border-cyan-400/50 dark:border-white/15 dark:bg-white/[0.06] dark:text-white"
              >
                CV İndir (PDF) →
              </a>
            </div>
          </div>
        </div>

        {/* Row 2: 4 Glass Info Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* Identity */}
          <div className="glass-panel flex flex-col justify-between p-6 md:col-span-4">
            <Link href="/" className="mb-4 flex items-center gap-3">
              <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-cyan-500/30 bg-slate-900">
                <Image
                  src="/assets/img/huseyindol.png"
                  alt="Hüseyin DOL"
                  width={36}
                  height={36}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                Hüseyin DOL
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              Senior Full Stack Developer & Team Lead. React, Next.js ve
              TypeScript ile frontend; Java ve Spring Boot ile backend; uçtan
              uca modern web ve mobil uygulamalar geliştiriyorum.
            </p>
          </div>

          {/* Navigation */}
          <div className="glass-panel p-6 md:col-span-2">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
              Sayfalar
            </h3>
            <ul className="space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-slate-600 transition-colors hover:text-cyan-500 dark:text-slate-300 dark:hover:text-cyan-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="glass-panel flex flex-col justify-between p-6 md:col-span-3">
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                Bu Site
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {techStack.map(tech => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200/80 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:border-white/[0.08] dark:bg-white/[0.05] dark:text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href="https://github.com/huseyindol/huseyindolcom"
              target="_blank"
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-cyan-600 transition-colors hover:text-cyan-400 dark:text-cyan-300"
            >
              <Github className="h-4 w-4" />
              Açık Kaynak Kodları ↗
            </Link>
          </div>

          {/* Social & Copyright */}
          <div className="glass-panel flex flex-col justify-between p-6 md:col-span-3">
            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
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
                    className="flex h-10 flex-1 items-center justify-center rounded-xl border border-slate-200/80 bg-white/70 text-slate-700 transition-all hover:-translate-y-0.5 hover:border-cyan-400/50 hover:text-cyan-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-slate-200 dark:hover:text-cyan-300"
                  >
                    <s.icon className="h-4 w-4" />
                  </Link>
                ))}
              </div>
            </div>
            <p className="mt-6 text-xs font-medium text-slate-500 dark:text-slate-400">
              © {currentYear} Hüseyin DOL · İstanbul
            </p>
          </div>
        </div>

        {/* Row 3: Luminous Oversized Wordmark */}
        <div className="glass-panel overflow-hidden px-4 py-5">
          <div
            aria-hidden="true"
            className="select-none bg-gradient-to-r from-slate-900 via-cyan-600 to-emerald-500 bg-clip-text text-center font-extrabold leading-[0.86] tracking-[-0.045em] text-transparent opacity-90 dark:from-white dark:via-cyan-300 dark:to-emerald-400"
            style={{ fontSize: 'clamp(2.6rem, 10.5vw, 10rem)' }}
          >
            HÜSEYİN DOL
          </div>
        </div>
      </motion.div>
    </footer>
  )
}
