import {
  KineticScrollBanner,
  KineticScrollItem,
  type KineticTrackItem,
} from '@/components/KineticScrollBanner'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Seo } from '@/lib/seo'
import {
  ArrowLeftIcon,
  BotIcon,
  CheckCircle2Icon,
  Code2Icon,
  CpuIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  LayersIcon,
  LockIcon,
  RadarIcon,
  RocketIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  SparklesIcon,
  TerminalIcon,
} from 'lucide-react'
import Link from 'next/link'
import { FaGithub as Github } from 'react-icons/fa'

const guardianKineticTracks: KineticTrackItem[] = [
  {
    id: 'vg-intel',
    dir: -1,
    speed: 1.45,
    baseOffset: -50,
    tag: 'VULNERABILITY INTEL',
    primary: 'GOOGLE OSV.DEV · GITHUB GHSA · NVD / CVE · CISA KEV',
    secondary: 'REAL-TIME DEPENDENCY GRAPH SCANNER',
  },
  {
    id: 'vg-batch',
    dir: 1,
    speed: 1.65,
    baseOffset: 75,
    tag: 'SINGLE-BATCH REMEDIATION',
    primary: 'ZERO PR SPAM · SAFE-VERSION AUTO PATCHER',
    secondary: 'PATCH · MINOR · MAJOR UPGRADE IN ONE COMMIT',
    accent: true,
  },
  {
    id: 'vg-gate',
    dir: -1,
    speed: 1.2,
    baseOffset: -30,
    scaleEffect: true,
    tag: 'BREAKING-CHANGE GATE',
    primary: 'PEER COMPAT · TYPE-CHECK · BUILD · HTTP 200 SMOKE',
    secondary: 'AUTO BLOCK BREAKING PACKAGES · PROTECT PROD',
  },
  {
    id: 'vg-skill',
    dir: 1,
    speed: 1.8,
    baseOffset: 90,
    tag: 'AGENT SKILL STUDIO',
    primary: 'GOOGLE ANTIGRAVITY & CLAUDE CODE SKILL',
    secondary: 'NEXT.JS 16 SELF-HOSTED COMMAND CENTER',
    accent: true,
  },
]

const pipelineStages = [
  {
    step: '01',
    code: 'BRANCH_ISOLATION',
    title: 'Toplu Hazırlık & İzole Canary Dalı',
    description:
      'Her paket için ayrı PR açılmaz! Projedeki tüm zafiyetli paketler (SAFE_PATCH, MINOR_VERIFY ve BREAKING_MAJOR dahil) tek manifest üzerinde güvenli sürümlerine çekilir ve canlı main dalına dokunulmadan geçici security/batch-canary dalına tek commit olarak gönderilir.',
    icon: GitBranchIcon,
    badge: '0 PR Mail Spam',
  },
  {
    step: '02',
    code: 'DEPENDENCY_COMPAT',
    title: 'Bağımlılık & Peer Uyumluluk Kontrolü',
    description:
      'Manifest sözdizimi, geçişli bağımlılık ezmeleri (overrides / dependency_overrides / Maven BOM) ve birbirine bağlı ekosistem paketlerinin (react ↔ react-dom, next ↔ eslint-config-next) major sürüm uyumluluğu doğrulanır.',
    icon: LayersIcon,
    badge: 'Semver & Peer Analizi',
  },
  {
    step: '03',
    code: 'BUILD_AND_TEST',
    title: 'Derleme, Type-Check & Lint Test Kapısı',
    description:
      'Projenin doğrulama komutu (bun run lint && bun run type-check && bun run test:ci, ./mvnw compile, flutter analyze) ve GitHub Check Runs sonuçları kontrol edilerek breaking-change olup olmadığı denetlenir.',
    icon: CpuIcon,
    badge: 'Tam CI Doğrulaması',
  },
  {
    step: '04',
    code: 'SMOKE_HEALTH_CHECK',
    title: 'Site Çalışabilirlik (HTTP 200) & OSV Sıfır-CVE Kapısı',
    description:
      'Güncellenen hedef versiyonlarda OSV.dev üzerinde 0 aktif zafiyet kaldığı ve Preview URL yanıtının 500 hatası vermeden sağlıklı açıldığı (smoke check) doğrulanır.',
    icon: ShieldCheckIcon,
    badge: 'Zero-CVE + Smoke Test',
  },
  {
    step: '05',
    code: 'AUTO_MERGE_DEPLOY',
    title: 'Tek Seferde main Merge & Canlı Deploy',
    description:
      'Tüm kontroller hatasızsa GitHub Branch Merge API ile geçici dal PR açılmadan tek seferde main dalına birleştirilir ve canlı deploy tetiklenir. Kırılma yaratan paket varsa yalnız o paket BLOCKED_BREAKING olarak ayrılır; canlı site asla bozulmaz.',
    icon: RocketIcon,
    badge: 'Otonom Canlıya Çıkış',
  },
]

const ecosystems = [
  {
    name: 'TypeScript / Node.js',
    manager: 'npm · Bun · Yarn',
    manifest: 'package.json',
    details:
      'dependencies, devDependencies ve geçişli alt paketler için overrides / resolutions bloklarını otomatik günceller.',
  },
  {
    name: 'Java / Spring Boot',
    manager: 'Maven',
    manifest: 'pom.xml',
    details:
      'Açık <version> etiketlerini ve parent Spring Boot starter BOM mirasından gelen alt kütüphaneleri güvenli sürüme pinler.',
  },
  {
    name: 'Flutter / Dart',
    manager: 'Pub',
    manifest: 'pubspec.yaml',
    details:
      'dependencies, dev_dependencies ve çakışan alt paketler için dependency_overrides bloklarını güvenli versiyona taşır.',
  },
  {
    name: 'Python',
    manager: 'PyPI · pip · uv',
    manifest: 'requirements.txt / pyproject.toml',
    details:
      'Sabitlenmiş (==) veya esnek (>=) paket aralıklarını PyPI ve OSV.dev verilerine göre güvenli sürüme yükseltir.',
  },
  {
    name: 'Go',
    manager: 'Go Modules',
    manifest: 'go.mod',
    details:
      'require bloklarındaki doğrudan ve indirect modül versiyonlarını güvenli yamalı sürümlere çeker.',
  },
  {
    name: 'Rust',
    manager: 'Cargo / crates.io',
    manifest: 'Cargo.toml',
    details:
      'Cargo bağımlılık ağacındaki güvenlik bültenlerini (RustSec / OSV) tarayarak güvenli crate versiyonlarını uygular.',
  },
]

const cliCommands = [
  {
    cmd: 'git clone https://github.com/huseyindol/vuln-guardian.git && cd vuln-guardian && bun install',
    desc: '1. Repoyu klonla ve bağımlılıkları kur',
  },
  {
    cmd: 'bun run skill:install',
    desc: '2. Antigravity (~/.gemini/config/skills) ve Claude Code (~/.claude/skills) için global kur',
  },
  {
    cmd: 'bun run guardian:scan',
    desc: '3. Tüm kayıtlı projeleri canlı OSV.dev / GHSA / CVE veritabanına karşı tara',
  },
  {
    cmd: 'bun run guardian:remediate -- --project elly-tenant --apply --deploy',
    desc: '4. Zafiyetli paketleri tek seferde güvenli versiyona çek, doğrula ve deploy çık',
  },
  {
    cmd: 'bun run guardian:discover -- --dir ~/Documents/projects',
    desc: '5. Klasördeki tüm çok dilli projeleri (package.json, pom.xml, pubspec.yaml vb.) otomatik keşfet',
  },
]

export default function VulnGuardianProjectPage() {
  return (
    <>
      <Seo
        rawTitle="VulnGuardian — AI Agent Skill & Zafiyet Komut Merkezi | Hüseyin DOL"
        description="Çok dilli projelerde (npm, Maven, Pub, PyPI, Go, Cargo) canlı OSV.dev/CVE/GHSA zafiyet taraması, breaking-change kontrolü ve PR spam'i olmadan tek seferde güvenli versiyon güncellemesi yapan AI Agent Skill ve Next.js 16 Komut Merkezi."
        canonical="/projects/vuln-guardian"
        keywords={[
          'VulnGuardian',
          'AI Agent Skill',
          'Google Antigravity Skill',
          'Claude Code Skill',
          'OSV.dev',
          'CVE Scanner',
          'Auto Remediation',
          'DevSecOps',
          'Hüseyin DOL',
        ]}
      />

      <div className="min-h-screen overflow-hidden">
        {/* Hero */}
        <section className="brand-hero-surface relative -mt-20 overflow-hidden border-b border-white/10 py-28 pt-32 text-zinc-100 md:py-36 md:pt-40">
          <div className="editorial-grid-bg pointer-events-none absolute inset-0 opacity-50" />
          <div className="brand-glow-orb pointer-events-none absolute left-1/2 top-0 h-80 w-[640px] -translate-x-1/2 rounded-full blur-3xl" />

          <div className="container relative mx-auto px-6">
            <div className="mx-auto max-w-4xl">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold text-zinc-300 transition-colors hover:border-teal-400/40 hover:text-white"
                >
                  <ArrowLeftIcon className="h-3.5 w-3.5" />
                  Tüm Projelere Dön
                </Link>
                <Badge className="brand-badge border px-3.5 py-1 text-xs font-semibold">
                  <SparklesIcon className="mr-1.5 inline h-3.5 w-3.5" />
                  Skill Studio · AI Agent Skill &amp; Web Command Center
                </Badge>
              </div>

              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="mb-3 inline-flex items-center gap-2.5 rounded-2xl border border-teal-400/30 bg-teal-500/10 px-3.5 py-1.5 text-xs font-bold text-teal-300">
                    <ShieldAlertIcon className="h-4 w-4" />
                    <span>VULNGUARDIAN v1.0 · OPEN SOURCE</span>
                  </div>
                  <h1 className="mb-4 text-4xl font-black tracking-tight md:text-6xl">
                    Vuln<span className="brand-text-accent">Guardian</span>
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-zinc-300 md:text-lg">
                    Çok dilli yazılım projelerinizin bağımlılıklarını canlı{' '}
                    <strong className="text-white">
                      Google OSV.dev, GitHub GHSA ve NVD/CVE
                    </strong>{' '}
                    veritabanlarına karşı tarayan; zafiyetli paketlerin tamamını
                    tek seferde güvenli versiyona çeken,{' '}
                    <strong className="text-white">
                      Breaking-Change ve Site Çalışabilirlik
                    </strong>{' '}
                    kontrollerini çalıştıran ve PR mail spam&apos;i üretmeden{' '}
                    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-xs text-teal-300">
                      main
                    </code>{' '}
                    dalına birleştirip deploy eden otonom{' '}
                    <strong className="text-white">
                      AI Agent Skill (Antigravity &amp; Claude Code)
                    </strong>{' '}
                    ve <strong className="text-white">Web Komut Merkezi</strong>
                    .
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="https://skillstudio-zeta.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brand-pill-btn inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg transition-all hover:scale-105"
                >
                  <RadarIcon className="h-4 w-4" />
                  Canlı Web Komut Merkezi
                  <ExternalLinkIcon className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="https://github.com/huseyindol/vuln-guardian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:border-teal-400/40 hover:bg-white/10"
                >
                  <Github className="h-4 w-4" />
                  GitHub Repo (huseyindol/vuln-guardian)
                </Link>
              </div>

              {/* Stats Grid */}
              <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {[
                  {
                    value: '6 Ekosistem',
                    label: 'npm · Maven · Pub · PyPI · Go · Cargo',
                  },
                  {
                    value: '5 Aşama',
                    label: 'Breaking-Change & Smoke Gate',
                  },
                  {
                    value: '0 PR Spam',
                    label: 'Single-Batch Canary → main Merge',
                  },
                  {
                    value: 'Çift Platform',
                    label: 'Antigravity & Claude Code Skill',
                  },
                ].map(item => (
                  <div
                    key={item.value}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
                  >
                    <p className="brand-text-accent text-xl font-black md:text-2xl">
                      {item.value}
                    </p>
                    <p className="mt-1 text-xs text-zinc-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Kinetic Stream */}
        <KineticScrollBanner
          kicker="01 / OTONOM DEVSECOPS & AGENT SKILL MİMARİSİ"
          title="Zafiyet tespitinden güvenli canlı deploy'a kesintisiz akış"
          badge="OSV.DEV · SINGLE-BATCH · ZERO DOWNTIME"
          tracks={guardianKineticTracks}
          ariaLabel="VulnGuardian Kinetik Akışı"
        />

        {/* 5-Stage Pipeline Section */}
        <section className="bg-muted/20 overflow-hidden py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <p className="brand-text-accent mb-2 font-mono text-xs font-bold uppercase tracking-widest">
                  02 / SINGLE-BATCH SAFE-VERSION PIPELINE
                </p>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  5 Aşamalı Breaking-Change &amp; Canlı Koruma Kapısı
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                  Dependabot veya Renovate gibi her paket için ayrı PR ve
                  yüzlerce bildirim e-postası üretmez; tüm güncellemeleri tek
                  bir izole canary dalında doğrulayıp hatasızsa tek seferde
                  birleştirir.
                </p>
              </div>

              <div className="space-y-5">
                {pipelineStages.map((stage, idx) => {
                  const Icon = stage.icon
                  return (
                    <KineticScrollItem
                      key={stage.code}
                      side={idx % 2 === 0 ? 'left' : 'right'}
                    >
                      <Card className="border-border/60 overflow-hidden border p-6 transition-all hover:border-teal-500/40 hover:shadow-lg">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-600 text-white shadow-md">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1.5 flex flex-wrap items-center gap-2">
                              <span className="brand-text-accent font-mono text-xs font-bold">
                                AŞAMA {stage.step} · {stage.code}
                              </span>
                              <Badge className="border-0 bg-teal-500/15 text-xs font-semibold text-teal-600 dark:text-teal-300">
                                {stage.badge}
                              </Badge>
                            </div>
                            <h3 className="mb-2 text-lg font-extrabold">
                              {stage.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted-foreground">
                              {stage.description}
                            </p>
                          </div>
                        </div>
                      </Card>
                    </KineticScrollItem>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* 6 Ecosystems Grid */}
        <section className="overflow-hidden py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <p className="brand-text-accent mb-2 font-mono text-xs font-bold uppercase tracking-widest">
                  03 / ÇOKLU MANİFEST AYRIŞTIRICI
                </p>
                <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                  6 Dil ve Paket Ekosistemi Desteği
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">
                  Doğrudan bağımlılıkların yanı sıra geçişli (transitive) alt
                  paketleri ve framework BOM yapılarını ekosistem kurallarına
                  göre güvenli sürüme taşır.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {ecosystems.map((eco, idx) => (
                  <KineticScrollItem
                    key={eco.name}
                    side={idx % 2 === 0 ? 'left' : 'right'}
                  >
                    <Card className="border-border/60 flex h-full flex-col justify-between border p-6 transition-all hover:border-teal-500/40 hover:shadow-md">
                      <div>
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <Code2Icon className="brand-text-accent h-6 w-6" />
                          <span className="rounded-md border border-border bg-muted px-2.5 py-0.5 font-mono text-xs font-semibold text-foreground">
                            {eco.manifest}
                          </span>
                        </div>
                        <h3 className="mb-1 text-lg font-extrabold">
                          {eco.name}
                        </h3>
                        <p className="brand-text-accent mb-3 font-mono text-xs font-semibold">
                          {eco.manager}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          {eco.details}
                        </p>
                      </div>
                    </Card>
                  </KineticScrollItem>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CLI & Agent Skill Runbook */}
        <section className="bg-muted/20 overflow-hidden py-20">
          <div className="container mx-auto px-6">
            <div className="mx-auto max-w-5xl">
              <KineticScrollItem side="left">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-6 text-zinc-100 shadow-2xl md:p-10">
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500/15 text-teal-300">
                        <TerminalIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h2 className="text-xl font-extrabold text-white md:text-2xl">
                          Hızlı Kurulum &amp; Agent Skill CLI
                        </h2>
                        <p className="text-xs text-zinc-400">
                          Self-Hosted kurulum ile kendi yerel ortamınızda veya
                          Vercel hesabınızda çalıştırın
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="border border-teal-500/30 bg-teal-500/10 text-xs text-teal-300">
                        <BotIcon className="mr-1 inline h-3.5 w-3.5" />
                        SKILL.md Standardı
                      </Badge>
                      <Badge className="border border-white/15 bg-white/5 text-xs text-zinc-300">
                        <LockIcon className="mr-1 inline h-3.5 w-3.5" />
                        Self-Hosted Token
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cliCommands.map(item => (
                      <div
                        key={item.cmd}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                      >
                        <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-teal-300">
                          <CheckCircle2Icon className="h-3.5 w-3.5 shrink-0" />
                          <span>{item.desc}</span>
                        </div>
                        <pre className="overflow-x-auto font-mono text-xs text-zinc-200 sm:text-sm">
                          <code>$ {item.cmd}</code>
                        </pre>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <p className="text-xs text-zinc-400">
                      Her akşam{' '}
                      <strong className="text-white">20:30 TSİ</strong> otomatik
                      cron taraması veya istediğim zaman{' '}
                      <code className="text-teal-300">/vuln-guardian</code>{' '}
                      komutuyla otonom yama.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href="https://skillstudio-zeta.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="brand-pill-btn inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold"
                      >
                        <ExternalLinkIcon className="h-3.5 w-3.5" />
                        Canlı Dashboard&apos;u Aç
                      </Link>
                      <Link
                        href="https://github.com/huseyindol/vuln-guardian"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-xs font-bold text-white hover:bg-white/10"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Kaynak Kodu İncele
                      </Link>
                    </div>
                  </div>
                </div>
              </KineticScrollItem>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
