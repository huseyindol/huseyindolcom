import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { motion } from 'framer-motion'
import {
  CheckCircle2Icon,
  DatabaseIcon,
  GaugeIcon,
  LayersIcon,
  LockIcon,
  MailIcon,
  RocketIcon,
  ServerIcon,
  ShieldCheckIcon,
  ZapIcon,
} from 'lucide-react'
import React from 'react'

const sections = [
  { id: 'overview', title: 'Elly Nedir?' },
  { id: 'auth', title: 'Auth Mimarisi' },
  { id: 'form', title: 'Form Sistemi' },
  { id: 'email', title: 'E-posta Sistemi' },
  { id: 'architecture', title: 'Katmanlı Mimari' },
  { id: 'tenancy', title: 'Multi-Tenancy' },
  { id: 'security', title: 'Güvenlik' },
  { id: 'performance', title: 'Performans' },
  { id: 'infra', title: 'Altyapı' },
  { id: 'summary', title: 'Özet' },
]

const SectionHeader = ({
  num,
  title,
  subtitle,
}: {
  num: number
  title: string
  subtitle: string
}) => (
  <div className="mb-8 flex items-center gap-4">
    <div className="bg-linear-to-br flex h-12 w-12 items-center justify-center rounded-xl from-violet-600 to-indigo-600 text-xl font-bold text-white shadow-lg shadow-violet-500/20">
      {num}
    </div>
    <div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-sm text-muted-foreground">{subtitle}</p>
    </div>
  </div>
)

const Divider = () => (
  <div className="bg-linear-to-r via-border/50 my-20 h-px w-full from-transparent to-transparent" />
)

const SunumDoc = () => {
  return (
    <div className="space-y-20 pb-20">
      <nav className="bg-background/80 border-border/50 sticky top-16 z-40 w-full border-b backdrop-blur-md">
        <div className="container mx-auto flex h-14 items-center justify-between gap-4 px-6">
          <span className="bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text font-bold text-transparent">
            Elly Sunum
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
        <header className="space-y-6 pt-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-violet-400">
              CMS Platformu · Spring Boot 3.5 · Java 21
            </p>
            <h1 className="bg-linear-to-br from-white to-white/50 bg-clip-text text-5xl font-extrabold leading-normal tracking-tight text-transparent md:text-7xl">
              Elly
            </h1>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Hız, izolasyon ve ölçeklenebilirlik için tasarlanmış güçlü bir çok
              kiracılı İçerik Yönetim Sistemi.
            </p>
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              <Badge
                variant="outline"
                className="border-violet-500/30 bg-violet-500/5 text-violet-400"
              >
                PostgreSQL · DB-per-Tenant
              </Badge>
              <Badge
                variant="outline"
                className="border-blue-500/30 bg-blue-500/5 text-blue-400"
              >
                Redis Cache
              </Badge>
              <Badge
                variant="outline"
                className="border-amber-500/30 bg-amber-500/5 text-amber-400"
              >
                RabbitMQ
              </Badge>
              <Badge
                variant="outline"
                className="border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
              >
                JWT + OAuth2
              </Badge>
              <Badge
                variant="outline"
                className="border-pink-500/30 bg-pink-500/5 text-pink-400"
              >
                Kubernetes-ready
              </Badge>
            </div>
          </motion.div>
        </header>

        {/* 1: Overview */}
        <section id="overview" className="scroll-mt-32 pt-20">
          <SectionHeader
            num={1}
            title="Elly Nedir?"
            subtitle="Genel bakış ve dört temel"
          />
          <div className="space-y-8">
            <p className="leading-relaxed text-muted-foreground">
              Elly, Spring Boot 3.5 üzerine inşa edilmiş headless bir CMS ve
              hızlı MVP platformudur. Sayfalar, bileşenler, dinamik formlar,
              asenkron e-posta ve kullanıcı kimlik doğrulaması — hepsi kiracı
              bazında izole.
            </p>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {[
                {
                  label: 'İçerik',
                  flow: 'Page → Component → Banner / Widget → Post → Comment / Rating',
                  color: 'text-violet-400',
                  icon: LayersIcon,
                },
                {
                  label: 'Auth',
                  flow: 'User → Role → Permission · Login · Register · RefreshToken · OAuth2',
                  color: 'text-cyan-400',
                  icon: ShieldCheckIcon,
                },
                {
                  label: 'Form',
                  flow: 'FormDefinition (JSONB) → ConditionEvaluator → FormSubmission',
                  color: 'text-pink-400',
                  icon: ZapIcon,
                },
                {
                  label: 'E-posta',
                  flow: 'MailAccount → Async Queue → Thymeleaf → Gmail SMTP',
                  color: 'text-amber-400',
                  icon: MailIcon,
                },
              ].map(p => (
                <Card
                  key={p.label}
                  className="border-border/50 bg-muted/30 p-5 transition-colors hover:border-border"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <p.icon className={`h-4 w-4 ${p.color}`} />
                    <h3 className={`font-mono text-sm font-bold ${p.color}`}>
                      {p.label}
                    </h3>
                  </div>
                  <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {p.flow}
                  </p>
                </Card>
              ))}
            </div>

            <div>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Tüm Alan Varlıkları
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Page',
                  'Component',
                  'Banner',
                  'Widget',
                  'Post',
                  'Form',
                  'User',
                  'Permission',
                  'Comment',
                  'Rating',
                  'Assets',
                  'Email',
                  'MailAccount',
                  'RefreshToken',
                  'SeoInfo',
                  'Role',
                  'FormDefinition',
                  'FormSubmission',
                ].map(e => (
                  <span
                    key={e}
                    className="border-border/50 bg-muted/20 rounded-full border px-3 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {e}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* 2: Auth */}
        <section id="auth" className="scroll-mt-32">
          <SectionHeader
            num={2}
            title="Auth Mimarisi"
            subtitle="JWT akışı, OAuth2 ve Refresh Token"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-border/50 bg-muted/20 p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-violet-400">
                JWT Giriş Akışı
              </h3>
              <ol className="space-y-3">
                {[
                  {
                    code: 'POST /api/auth/login',
                    desc: 'AdminLoginInterceptor · TenantLoginInterceptor',
                  },
                  {
                    code: 'JWT Üretimi',
                    desc: 'Access + Refresh · loginSource & tenantId claim',
                  },
                  {
                    code: 'POST /api/auth/refresh',
                    desc: 'RefreshToken doğrula · revoke kontrol · yeni Access',
                  },
                ].map((s, i) => (
                  <li
                    key={i}
                    className="border-border/30 bg-background/50 rounded-lg border p-3"
                  >
                    <div className="font-mono text-xs text-violet-400">
                      {s.code}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {s.desc}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="border-border/50 bg-muted/20 p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-cyan-400">
                Kayıt &amp; OAuth2
              </h3>
              <ol className="space-y-3">
                {[
                  {
                    code: 'POST /api/auth/register',
                    desc: 'Kullanıcı oluştur · Rol ata · doğrulama maili',
                  },
                  {
                    code: 'OAuth2 Sağlayıcılar',
                    desc: 'Google · Facebook · GitHub → SuccessHandler → JWT',
                  },
                  {
                    code: 'Redis Auth Önbelleği',
                    desc: 'auth:user:{username} · TTL 30dk · 3 SQL → 1 GET',
                  },
                ].map((s, i) => (
                  <li
                    key={i}
                    className="border-border/30 bg-background/50 rounded-lg border p-3"
                  >
                    <div className="font-mono text-xs text-cyan-400">
                      {s.code}
                    </div>
                    <div className="mt-1 text-[11px] text-muted-foreground">
                      {s.desc}
                    </div>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          <div className="border-border/50 mt-6 overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm text-white">
              <thead className="bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-4">Alan</th>
                  <th className="px-6 py-4">Açıklama</th>
                </tr>
              </thead>
              <tbody className="divide-border/50 divide-y">
                {[
                  { f: 'token', d: 'UUID · oturum başına benzersiz' },
                  { f: 'expiryDate', d: 'LocalDateTime' },
                  { f: 'revoked', d: 'Boolean · çıkış işareti' },
                  { f: 'user', d: 'ManyToOne → User' },
                ].map(row => (
                  <tr
                    key={row.f}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-3 font-mono text-violet-400">
                      {row.f}
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{row.d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider />

        {/* 3: Form */}
        <section id="form" className="scroll-mt-32">
          <SectionHeader
            num={3}
            title="Form Sistemi"
            subtitle="JSONB şema, doğrulama stratejisi, koşullu alanlar"
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-border/50 bg-muted/20 p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-violet-400">
                FormDefinition (JSONB)
              </h3>
              <ul className="space-y-2 text-[11px]">
                {[
                  ['id', 'UUID · Birincil Anahtar'],
                  ['version', 'Integer · şema versiyonlama'],
                  ['schema', 'JSONB → FormSchema (alanlar + config)'],
                  ['active', 'Boolean · yayın durumu'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3">
                    <span className="w-24 shrink-0 font-mono text-violet-400">
                      {k}
                    </span>
                    <span className="text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mb-3 mt-6 font-mono text-xs uppercase tracking-widest text-cyan-400">
                FieldDefinition
              </h3>
              <ul className="space-y-2 text-[11px]">
                {[
                  ['type', 'text · select · number'],
                  ['validation', 'min · max · regex deseni'],
                  ['condition', 'ConditionRule: alan · operatör · değer'],
                  ['operatörler', 'EQUALS · NOT_EQUALS · GT · LT'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3">
                    <span className="w-24 shrink-0 font-mono text-cyan-400">
                      {k}
                    </span>
                    <span className="text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <div className="space-y-6">
              <Card className="border-border/50 bg-muted/20 p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-pink-400">
                  Strateji Deseni
                </h3>
                <div className="space-y-2">
                  {[
                    ['TextFieldValidator', 'min/max uzunluk, regex'],
                    ['NumberFieldValidator', 'aralık, tam sayı kontrolü'],
                    ['SelectFieldValidator', 'izin verilen değerler'],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="border-border/30 bg-background/50 rounded-lg border p-3 text-[11px]"
                    >
                      <span className="font-mono text-pink-400">{k}</span>
                      <span className="text-muted-foreground"> → {v}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="border-border/50 bg-muted/20 p-6">
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-violet-400">
                  Gönderim Akışı
                </h3>
                <ol className="space-y-2 text-[11px] text-muted-foreground">
                  {[
                    'FormDefinition çek',
                    'Alanları iterate et → ConditionEvaluator',
                    "Görünmez → payload'dan anahtarı temizle",
                    'Görünür → FieldValidator stratejisini çalıştır',
                    'Temizlenmiş → FormSubmission kaydet (JSONB)',
                  ].map((s, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-mono text-violet-400">
                        {i + 1}.
                      </span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>
          </div>
        </section>

        <Divider />

        {/* 4: Email */}
        <section id="email" className="scroll-mt-32">
          <SectionHeader
            num={4}
            title="E-posta Sistemi"
            subtitle="Asenkron mesajlaşma, retry & DLQ"
          />
          <Card className="border-border/50 bg-muted/20 mb-6 p-6">
            <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-violet-400">
              Asenkron Mail Akışı
            </h3>
            <ol className="space-y-2 text-[11px]">
              {[
                [
                  'POST /api/v1/emails/send',
                  'JWT korumalı endpoint',
                  'text-violet-400',
                ],
                [
                  'EmailLog PENDING',
                  "DB'ye kaydedilir · 202 Accepted hemen döner",
                  'text-violet-400',
                ],
                [
                  'RabbitMQ email-queue',
                  'Sadece emailLogId yayınlanır',
                  'text-cyan-400',
                ],
                [
                  'Consumer',
                  'Log çek → Thymeleaf render → TenantMailSenderFactory → Gmail SMTP',
                  'text-cyan-400',
                ],
                [
                  'Başarı / Hata',
                  'SENT · retry-queue TTL 30sn · max 3× → FAILED + DLQ',
                  'text-pink-400',
                ],
              ].map(([code, desc, color], i) => (
                <li
                  key={i}
                  className="border-border/30 bg-background/50 flex flex-col gap-1 rounded-lg border p-3"
                >
                  <span className={`font-mono ${color}`}>
                    {i + 1}. {code}
                  </span>
                  <span className="text-muted-foreground">{desc}</span>
                </li>
              ))}
            </ol>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card className="border-border/50 bg-muted/20 p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-violet-400">
                MailAccount (Kiracı Başına)
              </h3>
              <ul className="space-y-2 text-[11px]">
                {[
                  ['smtpHost', 'smtp.gmail.com'],
                  ['smtpPort', '587 (TLS)'],
                  ['password', 'AES-256 şifreli'],
                  ['verify', 'Göndermeden SMTP testi'],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-3">
                    <span className="w-24 shrink-0 font-mono text-violet-400">
                      {k}
                    </span>
                    <span className="text-muted-foreground">{v}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="border-border/50 bg-muted/20 p-6">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-widest text-cyan-400">
                EmailLog &amp; Rescue Job
              </h3>
              <p className="text-[11px] leading-relaxed text-muted-foreground">
                <strong className="text-white">EmailLog alanları:</strong>{' '}
                recipient · subject · templateName · payloadJson · status ·
                retryCount · errorMessage · sentAt
              </p>
              <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
                <strong className="text-white">EmailRescueJob:</strong>{' '}
                @Scheduled her 5 dakika · 5dk'dan eski PENDING kayıtları parti
                50 ile yeniden kuyruğa alır.
              </p>
            </Card>
          </div>
        </section>

        <Divider />

        {/* 5: Architecture */}
        <section id="architecture" className="scroll-mt-32">
          <SectionHeader
            num={5}
            title="Katmanlı Mimari"
            subtitle="Controller → Service → Repository → Entity"
          />
          <div className="space-y-3">
            {[
              {
                num: 1,
                name: 'IController',
                desc: 'Arayüz kontratları, endpoint imzaları',
                tags: ['@RestController'],
              },
              {
                num: 2,
                name: 'Controller',
                desc: 'HTTP katmanı, istek ayrıştırma, yanıt sarmalama',
                tags: ['RootEntityResponse<T>'],
              },
              {
                num: 3,
                name: 'IService → Service',
                desc: 'İş mantığı, önbellek, kiracı bağlamı',
                tags: ['@Cacheable', '@Transactional'],
              },
              {
                num: 4,
                name: 'Repository',
                desc: 'Spring Data JPA, Entity Graph sorguları',
                tags: ['@EntityGraph'],
              },
              {
                num: 5,
                name: 'Entity + DTO',
                desc: "MapStruct eşleme, entity API'ye doğrudan açılmaz",
                tags: ['MapStruct', 'Lombok'],
              },
            ].map(layer => (
              <div
                key={layer.num}
                className="border-border/50 bg-muted/20 flex items-center gap-4 rounded-xl border p-4 transition-colors hover:border-border"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/10 font-mono text-xs text-violet-400">
                  {layer.num}
                </div>
                <div className="w-44 shrink-0 font-mono text-sm font-bold text-violet-300">
                  {layer.name}
                </div>
                <div className="flex-1 text-sm text-muted-foreground">
                  {layer.desc}
                </div>
                <div className="hidden gap-1 md:flex">
                  {layer.tags.map(t => (
                    <span
                      key={t}
                      className="border-border/40 bg-background/50 rounded border px-2 py-1 font-mono text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-6">
            {[
              ['☕', 'Java', '21 LTS'],
              ['🍃', 'Spring Boot', '3.5.7'],
              ['🐘', 'PostgreSQL', 'Multi-DB'],
              ['⚡', 'Redis', 'Cache'],
              ['🐇', 'RabbitMQ', 'Queues'],
              ['☸️', 'Kubernetes', 'K8s'],
            ].map(([icon, name, ver]) => (
              <Card
                key={name}
                className="border-border/50 bg-muted/20 flex flex-col items-center gap-1 p-4 text-center"
              >
                <div className="text-2xl">{icon}</div>
                <div className="text-xs font-bold text-white">{name}</div>
                <div className="font-mono text-[10px] text-muted-foreground">
                  {ver}
                </div>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* 6: Multi-Tenancy */}
        <section id="tenancy" className="scroll-mt-32">
          <SectionHeader
            num={6}
            title="Multi-Tenancy"
            subtitle="Kiracı başına veritabanı izolasyonu"
          />
          <Card className="border-border/50 mb-6 overflow-hidden bg-[#0d0e12] p-8">
            <div className="flex flex-col items-stretch gap-3 text-center md:flex-row md:items-center md:gap-2">
              {[
                { label: 'JWT Token', sub: 'tenantId claim' },
                { label: 'JwtTenantFilter', sub: 'TenantContext.set()' },
                {
                  label: 'TenantDataSourceRouter',
                  sub: 'AbstractRoutingDataSource',
                },
              ].map((n, i) => (
                <React.Fragment key={n.label}>
                  <div className="flex flex-1 flex-col gap-1 rounded-lg border border-violet-500/30 bg-violet-500/5 p-4">
                    <div className="font-mono text-xs font-bold text-violet-300">
                      {n.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      {n.sub}
                    </div>
                  </div>
                  {i < 2 && (
                    <div className="text-center font-mono text-violet-400 md:px-1">
                      →
                    </div>
                  )}
                </React.Fragment>
              ))}
              <div className="text-center font-mono text-violet-400 md:px-1">
                →
              </div>
              <div className="flex flex-1 flex-col gap-1">
                {['elly_basedb', 'elly_tenant1', 'elly_tenant2'].map(db => (
                  <div
                    key={db}
                    className="rounded-md border border-cyan-500/30 bg-cyan-500/5 px-3 py-2 font-mono text-[11px] text-cyan-300"
                  >
                    {db}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                icon: LockIcon,
                title: 'Tam İzolasyon',
                desc: 'Her kiracının kendi PostgreSQL veritabanı vardır. Veri sızıntısı mümkün değildir.',
                color: 'text-violet-400',
              },
              {
                icon: ServerIcon,
                title: 'ThreadLocal Bağlamı',
                desc: 'TenantContext, istek bazlı izolasyon için ThreadLocal kullanır; finally bloklarında garantili temizlik.',
                color: 'text-cyan-400',
              },
              {
                icon: DatabaseIcon,
                title: 'HikariCP Havuzları',
                desc: 'Her kiracı veritabanının kendi optimize edilmiş HikariCP havuzu — kaynak çekişmesi olmaz.',
                color: 'text-amber-400',
              },
              {
                icon: ZapIcon,
                title: 'Redis Önbellek İzolasyonu',
                desc: 'Anahtar öneki: {tenantId}::{cacheName}::{key} — otomatik kiracı bazlı kapsam.',
                color: 'text-pink-400',
              },
            ].map(p => (
              <Card key={p.title} className="border-border/50 bg-muted/20 p-5">
                <div className="mb-2 flex items-center gap-3">
                  <p.icon className={`h-4 w-4 ${p.color}`} />
                  <h3 className="text-sm font-bold text-white">{p.title}</h3>
                </div>
                <p className="text-[11px] leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* 7: Security */}
        <section id="security" className="scroll-mt-32">
          <SectionHeader
            num={7}
            title="Güvenlik &amp; Kimlik Doğrulama"
            subtitle="JWT, OAuth2, RBAC ve granüler izinler"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: 'JWT Auth',
                color: 'text-violet-400',
                items: [
                  'Access + Refresh token çifti',
                  'tenantId & loginSource claim',
                  'Redis auth önbelleği — TTL 30dk',
                  '3 SQL → 1 Redis GET',
                ],
              },
              {
                title: 'OAuth2',
                color: 'text-cyan-400',
                items: [
                  'Google · Facebook · GitHub',
                  'OAuth2AuthenticationSuccessHandler',
                  'Sorunsuz JWT entegrasyonu',
                  'Durumsuz tasarım',
                ],
              },
              {
                title: 'RBAC',
                color: 'text-pink-400',
                items: [
                  'User → Role → Permission (M2M)',
                  'SUPER_ADMIN · ADMIN · EDITOR · VIEWER',
                  '40+ ayrıntılı izin sabiti',
                  '@PreAuthorize · @EnableMethodSecurity',
                ],
              },
            ].map(c => (
              <Card key={c.title} className="border-border/50 bg-muted/20 p-5">
                <h3 className={`mb-3 text-sm font-bold ${c.color}`}>
                  {c.title}
                </h3>
                <ul className="space-y-1.5">
                  {c.items.map(it => (
                    <li
                      key={it}
                      className="flex gap-2 text-[11px] text-muted-foreground"
                    >
                      <CheckCircle2Icon className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500/70" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          <div className="border-border/50 mt-6 overflow-hidden rounded-xl border">
            <table className="w-full text-left text-sm text-white">
              <thead className="bg-muted/50 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-6 py-3">Rol</th>
                  <th className="px-6 py-3">Kapsam</th>
                  <th className="px-6 py-3">Yetkiler</th>
                </tr>
              </thead>
              <tbody className="divide-border/50 divide-y">
                {[
                  [
                    'SUPER_ADMIN',
                    'Tüm kiracılar',
                    'Tam sistem · kiracı yönetimi',
                  ],
                  [
                    'ADMIN',
                    'Kendi kiracısı',
                    'Tüm CMS işlemleri · kullanıcı yönetimi',
                  ],
                  [
                    'EDITOR',
                    'Kendi kiracısı',
                    'İçerik oluştur/güncelle · yayınla',
                  ],
                  ['VIEWER', 'Kendi kiracısı', 'Salt okunur içerik erişimi'],
                ].map(([role, scope, perms]) => (
                  <tr
                    key={role}
                    className="hover:bg-muted/20 transition-colors"
                  >
                    <td className="px-6 py-3">
                      <span className="rounded border border-violet-500/30 bg-violet-500/5 px-2 py-1 font-mono text-[10px] text-violet-300">
                        {role}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-muted-foreground">{scope}</td>
                    <td className="px-6 py-3 text-muted-foreground">{perms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <Divider />

        {/* 8: Performance */}
        <section id="performance" className="scroll-mt-32">
          <SectionHeader
            num={8}
            title="Performans Profili"
            subtitle="Önce/Sonra metrikleri ve optimizasyon öncelikleri"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                label: 'Yanıt Süresi p95',
                before: '2340ms',
                after: '456ms',
              },
              {
                label: 'Verim',
                before: '18 req/s',
                after: '187 req/s',
              },
              {
                label: 'DB Sorgu / İstek',
                before: '47 sorgu',
                after: '1 sorgu',
              },
            ].map(m => (
              <Card key={m.label} className="border-border/50 bg-muted/20 p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-sm text-rose-400 line-through opacity-60">
                    {m.before}
                  </span>
                  <span className="font-mono text-2xl font-bold text-emerald-400">
                    {m.after}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3">
            {[
              {
                p: 'HIGH',
                t: '@EntityGraph ile N+1 Sorgu Düzeltmesi',
                s: '47 sorgu → istek başına 1 sorgu',
                color: 'border-rose-500/30 bg-rose-500/5 text-rose-400',
              },
              {
                p: 'HIGH',
                t: 'HikariCP Havuz Boyutu 10 → 50',
                s: 'Yük altında bağlantı tükenmesini önler',
                color: 'border-rose-500/30 bg-rose-500/5 text-rose-400',
              },
              {
                p: 'HIGH',
                t: 'FK sütunlarında DB İndeksi',
                s: 'Tablo taramalarını ortadan kaldırır — 5–10× hız',
                color: 'border-rose-500/30 bg-rose-500/5 text-rose-400',
              },
              {
                p: 'MID',
                t: "Tüm liste endpoint'lerinde sayfalama",
                s: 'Büyük veri setlerinde OOM önleme',
                color: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
              },
              {
                p: 'MID',
                t: 'Kiracı önekli Redis @Cacheable',
                s: 'Önbellek isabetinde 50–100×',
                color: 'border-amber-500/30 bg-amber-500/5 text-amber-400',
              },
              {
                p: 'LOW',
                t: 'Read replica + CDN (dosya yükleme)',
                s: 'Okuma işlemlerini yatayda ölçekle',
                color:
                  'border-emerald-500/30 bg-emerald-500/5 text-emerald-400',
              },
            ].map((o, i) => (
              <div
                key={i}
                className="border-border/50 bg-muted/20 flex items-center gap-4 rounded-lg border p-4"
              >
                <span
                  className={`w-14 shrink-0 rounded border px-2 py-1 text-center font-mono text-[10px] font-bold ${o.color}`}
                >
                  {o.p}
                </span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">{o.t}</div>
                  <div className="text-[11px] text-muted-foreground">{o.s}</div>
                </div>
                <GaugeIcon className="h-4 w-4 shrink-0 text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* 9: Infrastructure */}
        <section id="infra" className="scroll-mt-32">
          <SectionHeader
            num={9}
            title="Dağıtım &amp; Altyapı"
            subtitle="Kubernetes, izleme, mail sistemi, CI/CD"
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                title: 'Kubernetes Kurulumu',
                color: 'text-violet-400',
                items: [
                  ['App Deployment', '2a-app-deployment.yaml'],
                  ['Burst Config', '2b-app-burst.yaml'],
                  ['HPA Autoscaler', '5-hpa.yaml'],
                  ['Monitoring', '6-monitoring.yaml'],
                ],
              },
              {
                title: 'Servisler & İzleme',
                color: 'text-cyan-400',
                items: [
                  ['PostgreSQL', 'Multi-DB · Backup CronJob'],
                  ['Redis', 'TTL=10min · Graceful fallback'],
                  ['RabbitMQ', 'email-queue · retry · DLQ'],
                  ['Prometheus', 'Spring Actuator metrics'],
                  ['Grafana', 'Real-time dashboards'],
                  ['SonarQube', 'CI kalite kapısı'],
                ],
              },
              {
                title: 'Mail Sistemi',
                color: 'text-pink-400',
                items: [
                  ['Kiracı SMTP', 'AES-256 şifreli kimlik bilgileri'],
                  ['Asenkron gönderim', 'RabbitMQ email-queue'],
                  ['Yeniden deneme', '3× ve 30sn bekleme'],
                  ['Ölü mektup kuyruğu', 'Tükenmede FAILED + DLQ'],
                  ["Doğrulama endpoint'i", 'Göndermeden SMTP doğrulaması'],
                ],
              },
              {
                title: 'CI/CD & Yük Testleri',
                color: 'text-amber-400',
                items: [
                  ['GitHub Actions', 'Derleme → Test → Dağıtım'],
                  ['Docker', 'Dockerfile + docker-compose'],
                  ['k6 Load Tests', 'temel · stres · yazma paketleri'],
                  ['SonarQube', 'CI boru hattında kalite kapısı'],
                ],
              },
            ].map(card => (
              <Card
                key={card.title}
                className="border-border/50 bg-muted/20 p-5"
              >
                <h3 className={`mb-4 text-sm font-bold ${card.color}`}>
                  {card.title}
                </h3>
                <ul className="space-y-2 text-[11px]">
                  {card.items.map(([k, v]) => (
                    <li
                      key={k}
                      className="border-border/30 flex justify-between gap-2 border-b pb-2 last:border-0"
                    >
                      <span className="font-medium text-white">{k}</span>
                      <span className="text-right text-muted-foreground">
                        {v}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <Divider />

        {/* 10: Summary */}
        <section id="summary" className="scroll-mt-32">
          <SectionHeader
            num={10}
            title="Mevcut Durum &amp; Yol Haritası"
            subtitle="Özet metrikler ve sonraki adımlar"
          />
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              ['3', 'Kiracı'],
              ['40+', 'İzin'],
              ['10×', 'Perf. Kazanım'],
              ['K8s', 'Üretime hazır'],
            ].map(([val, label]) => (
              <Card
                key={label}
                className="border-border/50 bg-muted/20 flex flex-col items-center gap-1 p-6 text-center"
              >
                <div className="bg-linear-to-br from-white to-violet-300 bg-clip-text text-3xl font-extrabold text-transparent md:text-4xl">
                  {val}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {label}
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              {
                title: 'Kritik yol · Veri ve liste performansı',
                color: 'text-rose-400',
                icon: RocketIcon,
                items: [
                  'Veritabanı indeksi dağıtımı',
                  'Bağlantı havuzu → 50',
                  'N+1 düzeltmesi için Entity Graph',
                  'Tüm listelerde sayfalama',
                ],
              },
              {
                title: 'Olgunluk · Yaygınlaştırma ve ölçüm',
                color: 'text-amber-400',
                icon: ZapIcon,
                items: [
                  "Her yerde DTO pattern'i",
                  'Redis önbellek yaygınlaştırması',
                  'Asenkron dosya yükleme',
                  "Yük testi baseline'ı + yeniden test",
                ],
              },
              {
                title: 'Kapasite · Okuma ölçeği ve dağıtım',
                color: 'text-emerald-400',
                icon: LayersIcon,
                items: [
                  'Read replica kurulumu',
                  'Dosya yüklemeleri için CDN',
                  'Çok bölgeli K8s',
                  "Dinamik kiracı onboarding'i",
                ],
              },
            ].map(c => (
              <Card key={c.title} className="border-border/50 bg-muted/20 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <c.icon className={`h-4 w-4 ${c.color}`} />
                  <h3 className={`text-sm font-bold ${c.color}`}>{c.title}</h3>
                </div>
                <ul className="space-y-1.5">
                  {c.items.map(it => (
                    <li
                      key={it}
                      className="flex gap-2 text-[11px] text-muted-foreground"
                    >
                      <CheckCircle2Icon className="mt-0.5 h-3 w-3 shrink-0 text-emerald-500/70" />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        <footer className="border-border/50 mt-40 space-y-2 border-t pb-10 pt-10 text-center text-[10px] text-muted-foreground">
          <p>© {new Date().getFullYear()} Elly CMS — Sunum</p>
          <p>
            Created by <strong>Hüseyin Dol</strong>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default SunumDoc
