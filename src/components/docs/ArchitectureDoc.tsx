import React from 'react'
import { motion } from 'framer-motion'
import { ZapIcon, GlobeIcon, CheckCircle2Icon, LockIcon } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

const ArchitectureDoc = () => {
  const sections = [
    { id: 'entity', title: 'Entity Hiyerarşisi' },
    { id: 'composition', title: 'Composition Kuralları' },
    { id: 'architecture', title: 'Katman Mimarisi' },
    { id: 'crud', title: 'CRUD Sayfa Yapısı' },
    { id: 'auth', title: 'Kimlik Doğrulama' },
  ]

  return (
    <div className="space-y-20 pb-20">
      {/* Navigation */}
      <nav className="bg-background/80 border-border/50 sticky top-16 z-40 w-full border-b backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-6">
          <span className="bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text font-bold text-transparent">
            Elly Architecture
          </span>
          <div className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2">
            {sections.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:bg-muted hover:text-foreground"
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <div className="container mx-auto max-w-5xl px-6">
        {/* Hero */}
        <header className="space-y-6 pt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="bg-linear-to-br from-white to-white/50 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
              Elly CMS Mimarisi
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Headless CMS admin panelinin mimari yapısı, entity ilişkileri,
              katman organizasyonu ve teknik tasarım dokümantasyonu.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Badge
                variant="outline"
                className="border-violet-500/30 bg-violet-500/5 text-violet-400"
              >
                Next.js 16
              </Badge>
              <Badge
                variant="outline"
                className="border-blue-500/30 bg-blue-500/5 text-blue-400"
              >
                React 19
              </Badge>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
              >
                TypeScript 5.9
              </Badge>
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/5 text-amber-400"
              >
                Tailwind CSS 4
              </Badge>
            </div>
          </motion.div>
        </header>

        {/* Section 1: Entity Hierarchy */}
        <section id="entity" className="scroll-mt-32 pt-20">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-linear-to-br flex h-12 w-12 items-center justify-center rounded-xl from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
              1
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Entity Hiyerarşisi
              </h2>
              <p className="text-sm text-muted-foreground">
                Veri modelleri arasındaki yapısal ilişkiler
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <p className="leading-relaxed text-muted-foreground">
              Elly CMS'in temel veri modeli hiyerarşik bir yapıdadır. En üst
              düzey <code>Page</code> entity'si, içine <code>Component</code>{' '}
              alır. Her component tipine göre <code>Banner</code>,{' '}
              <code>Widget</code> veya <code>Form</code> içerebilir.
            </p>

            <Card className="border-border/50 group overflow-hidden bg-[#0d0e12] p-8">
              <div className="relative aspect-video">
                <Image
                  src="/docs/images/entity-hierarchy.png"
                  alt="Entity Hierarchy Diagram"
                  fill
                  className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Page (Sayfa)',
                  color: 'bg-violet-500',
                  desc: 'En üst düzey entity. title, slug, status, template, seoInfo alanları içerir.',
                },
                {
                  title: 'Component',
                  color: 'bg-violet-400',
                  desc: 'Sayfanın yapı taşları. 3 tipi var: BANNER, WIDGET, FORM.',
                },
                {
                  title: 'Banner',
                  color: 'bg-amber-500',
                  desc: 'Görsel içerik birimi. Desktop, tablet, mobile için ayrı image destekler.',
                },
                {
                  title: 'Widget',
                  color: 'bg-emerald-500',
                  desc: '2 tipi var: BANNER (banner listesi) ve POST (post listesi).',
                },
                {
                  title: 'Post (Yazı)',
                  color: 'bg-blue-500',
                  desc: 'İçerik yazısı. Rich text content, slug, SEO bilgileri içerir.',
                },
                {
                  title: 'Form',
                  color: 'bg-pink-500',
                  desc: 'Schema-driven form. JSON olarak fields, steps ve config saklar.',
                },
              ].map(item => (
                <Card
                  key={item.title}
                  className="border-border/50 bg-muted/30 p-5 transition-colors hover:border-border"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <h3 className="text-sm font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-linear-to-r via-border/50 my-20 h-px w-full from-transparent to-transparent" />

        {/* Section 2: Composition Rules */}
        <section id="composition" className="scroll-mt-32">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-linear-to-br flex h-12 w-12 items-center justify-center rounded-xl from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
              2
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Composition Kuralları
              </h2>
              <p className="text-sm text-muted-foreground">
                Entity kompozisyon standartları
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 group overflow-hidden bg-[#0d0e12] p-8">
              <div className="relative aspect-video">
                <Image
                  src="/docs/images/composition-rules.png"
                  alt="Composition Rules"
                  fill
                  className="object-contain"
                />
              </div>
            </Card>

            <div className="border-border/50 overflow-hidden rounded-xl border">
              <table className="w-full text-left text-sm text-white">
                <thead className="bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Container</th>
                    <th className="px-6 py-4">İçerebileceği Entity'ler</th>
                    <th className="px-6 py-4">Açıklama</th>
                  </tr>
                </thead>
                <tbody className="divide-border/50 divide-y">
                  {[
                    {
                      c: 'Page',
                      i: 'Component[]',
                      d: 'Bir sayfa N adet component içerir',
                    },
                    {
                      c: 'Component (BANNER)',
                      i: 'Banner[]',
                      d: 'Banner tipindeki component direkt banner içerir',
                    },
                    {
                      c: 'Component (WIDGET)',
                      i: 'Widget[]',
                      d: 'Widget tipindeki component widget içerir',
                    },
                    {
                      c: 'Component (FORM)',
                      i: 'Form[]',
                      d: 'Form tipindeki component form içerir',
                    },
                  ].map(row => (
                    <tr
                      key={row.c}
                      className="hover:bg-muted/20 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-violet-400">
                        {row.c}
                      </td>
                      <td className="px-6 py-4 font-mono text-violet-300/70">
                        {row.i}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {row.d}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <div className="bg-linear-to-r via-border/50 my-20 h-px w-full from-transparent to-transparent" />

        {/* Section 3: Layer Architecture */}
        <section id="architecture" className="scroll-mt-32">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-linear-to-br flex h-12 w-12 items-center justify-center rounded-xl from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
              3
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Katman Mimarisi</h2>
              <p className="text-sm text-muted-foreground">
                Uygulama katmanları ve sorumluluklar
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 overflow-hidden bg-[#0d0e12] p-8">
              <div className="relative aspect-video">
                <Image
                  src="/docs/images/layer-architecture.png"
                  alt="Layer Architecture"
                  fill
                  className="object-contain"
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: 'Route Layer',
                  color: 'bg-indigo-500',
                  desc: 'src/app/(baseLayout)/ altındaki CRUD sayfaları.',
                },
                {
                  title: 'Layout Layer',
                  color: 'bg-violet-500',
                  desc: 'BaseAdminLayout (Sidebar + Header) ve LayoutLess.',
                },
                {
                  title: 'Component Layer',
                  color: 'bg-violet-400',
                  desc: 'app/_components/ altında colocated UI parçaları.',
                },
                {
                  title: 'Service Layer',
                  color: 'bg-blue-500',
                  desc: 'app/_services/ altında her entity için CRUD servisleri.',
                },
                {
                  title: 'Shared Infra',
                  color: 'bg-slate-500',
                  desc: 'Zod şemaları, TypeScript tipleri, utility fonksiyonları.',
                },
                {
                  title: 'External APIs',
                  color: 'bg-red-500',
                  desc: 'Backend REST API ve Google Gemini AI.',
                },
              ].map(item => (
                <Card
                  key={item.title}
                  className="border-border/50 bg-muted/30 p-5 transition-colors hover:border-border"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full ${item.color}`} />
                    <h3 className="text-sm font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-[11px] leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-linear-to-r via-border/50 my-20 h-px w-full from-transparent to-transparent" />

        {/* Section 4: CRUD Pattern */}
        <section id="crud" className="scroll-mt-32">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-linear-to-br flex h-12 w-12 items-center justify-center rounded-xl from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
              4
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                CRUD Sayfa Yapısı
              </h2>
              <p className="text-sm text-muted-foreground">
                Standartlaştırılmış sayfa desenleri
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 overflow-hidden bg-[#0d0e12] p-8">
              <div className="relative aspect-video">
                <Image
                  src="/docs/images/crud-pattern.png"
                  alt="CRUD Pattern"
                  fill
                  className="object-contain"
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Card className="border-border/50 bg-muted/20 p-6">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold text-white">
                  <GlobeIcon className="h-4 w-4 text-violet-400" />
                  Standart CRUD Rotaları
                </h3>
                <ul className="space-y-3">
                  {[
                    { path: '/entity', label: 'Liste (DataTable + Search)' },
                    {
                      path: '/entity/new',
                      label: 'Oluşturma (Form + Validation)',
                    },
                    {
                      path: '/entity/[id]/edit',
                      label: 'Düzenleme (Prefill + Update)',
                    },
                  ].map(item => (
                    <li
                      key={item.path}
                      className="border-border/30 flex items-center justify-between border-b py-2 text-sm last:border-0"
                    >
                      <code className="font-mono text-[10px] text-violet-400">
                        {item.path}
                      </code>
                      <span className="text-[10px] text-muted-foreground">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="border-border/50 bg-muted/20 p-6 text-white">
                <h3 className="mb-4 flex items-center gap-2 text-sm font-bold">
                  <ZapIcon className="h-4 w-4 text-amber-400" />
                  Ortak Componentler
                </h3>
                <div className="grid grid-cols-2 gap-2 text-[9px] font-bold uppercase text-muted-foreground">
                  <div className="bg-background/50 flex items-center gap-2 rounded-lg p-2">
                    DataTable
                  </div>
                  <div className="bg-background/50 flex items-center gap-2 rounded-lg p-2">
                    SearchInput
                  </div>
                  <div className="bg-background/50 flex items-center gap-2 rounded-lg p-2">
                    DualListbox
                  </div>
                  <div className="bg-background/50 flex items-center gap-2 rounded-lg p-2">
                    ConfirmDialog
                  </div>
                  <div className="bg-background/50 flex items-center gap-2 rounded-lg p-2">
                    StatusBadge
                  </div>
                  <div className="bg-background/50 flex items-center gap-2 rounded-lg p-2">
                    ImageUpload
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <div className="bg-linear-to-r via-border/50 my-20 h-px w-full from-transparent to-transparent" />

        {/* Section 5: Auth Flow */}
        <section id="auth" className="scroll-mt-32">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-linear-to-br flex h-12 w-12 items-center justify-center rounded-xl from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
              5
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Kimlik Doğrulama Akışı
              </h2>
              <p className="text-sm text-muted-foreground">
                JWT ve Refresh Token mekanizması
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Card className="border-border/50 overflow-hidden bg-[#0d0e12] p-8">
              <div className="relative aspect-video">
                <Image
                  src="/docs/images/auth-flow.png"
                  alt="Auth Flow"
                  fill
                  className="object-contain"
                />
              </div>
            </Card>

            <div className="grid grid-cols-1 gap-6 text-white md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
                    <CheckCircle2Icon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-emerald-400">
                      Login Akışı
                    </h4>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Kullanıcı email + şifre gönderir. Server Action backend
                      API'ye istek atar. Dönen token'lar httpOnly cookie'ye
                      yazılır.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                    <ZapIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-sm font-bold text-amber-400">
                      Token Refresh
                    </h4>
                    <p className="text-[11px] leading-relaxed text-muted-foreground">
                      Access token süresi dolunca Middleware fark eder. Refresh
                      token ile yeni access token istenir ve cookie güncellenir.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-muted/30 border-border/50 space-y-4 rounded-xl border p-6">
                <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-violet-400">
                  <LockIcon className="h-3 w-3" /> Security Headers
                </div>
                <div className="grid grid-cols-1 gap-2 font-mono text-[10px]">
                  <div className="bg-background/50 border-border/30 rounded border p-2">
                    Set-Cookie: token=...; HttpOnly; Secure
                  </div>
                  <div className="bg-background/50 border-border/30 rounded border p-2">
                    Authorization: Bearer [JWT]
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-border/50 mt-40 space-y-2 border-t pb-10 pt-10 text-center text-[10px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Elly CMS Documentation</p>
          <p>
            Created by <strong>Hüseyin Dol</strong>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default ArchitectureDoc
