import { Seo } from '@/lib/seo'
import { motion } from 'framer-motion'
import {
  ServerIcon,
  SmartphoneIcon,
  LayoutDashboardIcon,
  GlobeIcon,
  DatabaseIcon,
  ShieldCheckIcon,
  ZapIcon,
  LayersIcon,
} from 'lucide-react'
import { useRef } from 'react'
import { useInView } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const ecosystemFeatures = [
  {
    icon: DatabaseIcon,
    title: 'Database-per-Tenant',
    description: 'Her tenant kendi PostgreSQL veritabanında izole çalışır',
  },
  {
    icon: ShieldCheckIcon,
    title: 'Merkezi Auth',
    description: 'JWT + OAuth2 ile tüm istemciler tek noktadan doğrulanır',
  },
  {
    icon: ZapIcon,
    title: 'Redis Cache',
    description: 'Tenant-aware önbellekleme ile milisaniye altı yanıt süreleri',
  },
  {
    icon: LayersIcon,
    title: 'API-First',
    description: 'Admin, web ve mobil aynı RESTful API üzerinden beslenir',
  },
]

export default function EllyEcosystemPage() {
  const ecoRef = useRef(null)
  const ecoInView = useInView(ecoRef, { once: true, margin: '-80px' })

  return (
    <>
      <Seo
        rawTitle="Elly Ekosistemi | Hüseyin DOL"
        description="Elly: multi-tenant headless CMS ekosistemi. Java 21 + Spring Boot backend, Next.js admin panel ve tenant sitesi; WebSocket chat, WebRTC görüntülü görüşme, Kubernetes üzerinde deploy."
        canonical="/projects/elly"
        keywords={[
          'Elly',
          'Headless CMS',
          'Multi-tenant',
          'Spring Boot',
          'Next.js',
          'Kubernetes',
          'WebRTC',
          'Hüseyin DOL',
        ]}
      />
      <div className="min-h-screen bg-background pt-12">
        <section className="py-20" id="elly-ecosystem">
          <div className="container mx-auto px-6">
            <motion.div
              ref={ecoRef}
              initial="hidden"
              animate={ecoInView ? 'visible' : 'hidden'}
              variants={stagger}
              className="mx-auto max-w-5xl"
            >
              <motion.div variants={fadeInUp} className="mb-12 text-center">
                <h2 className="mb-3 text-4xl font-extrabold md:text-5xl">
                  Elly Ekosistemi
                </h2>
                <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                  Tüm platformlar tek bir güçlü altyapıdan beslenir. Mimari
                  tasarımımız ile sürdürülebilir büyüme sağlıyoruz.
                </p>
              </motion.div>

              {/* Architecture diagram */}
              <motion.div
                variants={fadeInUp}
                className="mb-12 overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 p-8 text-zinc-100 md:p-16"
              >
                <div className="flex flex-col items-center gap-8">
                  {/* Backend node */}
                  <div className="flex items-center gap-4 rounded-2xl border border-emerald-400/30 bg-emerald-500/10 px-8 py-4 backdrop-blur-md">
                    <ServerIcon className="h-8 w-8 text-emerald-400" />
                    <div>
                      <p className="text-xl font-bold text-emerald-300">
                        Elly Backend
                      </p>
                      <p className="text-sm text-slate-400">
                        Spring Boot 3.5 · Java 21 · PostgreSQL · Redis ·
                        RabbitMQ
                      </p>
                    </div>
                  </div>

                  {/* Connectors */}
                  <div className="flex w-full max-w-3xl items-start justify-center gap-0">
                    <div className="flex flex-1 flex-col items-center">
                      <div className="h-10 w-px bg-slate-600" />
                      <div className="h-px w-full bg-slate-600" />
                    </div>
                    <div className="flex flex-1 flex-col items-center">
                      <div className="h-10 w-px bg-slate-600" />
                      <div className="h-px w-full bg-slate-600" />
                    </div>
                    <div className="flex flex-1 flex-col items-center">
                      <div className="h-10 w-px bg-slate-600" />
                      <div className="h-px w-full bg-slate-600" />
                    </div>
                  </div>

                  {/* Client nodes */}
                  <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
                    {[
                      {
                        icon: LayoutDashboardIcon,
                        label: 'Admin Panel',
                        sub: 'Next.js 16',
                        color: 'blue',
                      },
                      {
                        icon: GlobeIcon,
                        label: 'Portfolio Site',
                        sub: 'Next.js 16',
                        color: 'violet',
                      },
                      {
                        icon: SmartphoneIcon,
                        label: 'Mobile App',
                        sub: 'React Native',
                        color: 'pink',
                      },
                    ].map(item => (
                      <div
                        key={item.label}
                        className={`flex flex-col items-center gap-3 rounded-2xl border p-6 text-center transition-all hover:scale-105 ${
                          item.color === 'blue'
                            ? 'border-blue-400/30 bg-blue-500/10'
                            : item.color === 'violet'
                              ? 'border-violet-400/30 bg-violet-500/10'
                              : 'border-pink-400/30 bg-pink-500/10'
                        }`}
                      >
                        <item.icon
                          className={`h-8 w-8 ${
                            item.color === 'blue'
                              ? 'text-blue-400'
                              : item.color === 'violet'
                                ? 'text-violet-400'
                                : 'text-pink-400'
                          }`}
                        />
                        <div>
                          <p className="text-lg font-bold">{item.label}</p>
                          <p className="text-sm text-slate-400">{item.sub}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Ecosystem features */}
              <motion.div
                variants={stagger}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              >
                {ecosystemFeatures.map(f => (
                  <motion.div
                    key={f.title}
                    variants={fadeInUp}
                    className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <f.icon className="mb-4 h-8 w-8 text-primary" />
                    <h3 className="mb-2 text-xl font-bold">{f.title}</h3>
                    <p className="text-muted-foreground">{f.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  )
}
