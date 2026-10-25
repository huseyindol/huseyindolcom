import Footer from '@/components/Footer'
import Header from '@/components/Header'

/**
 * App Router'daki `(site)/layout.tsx` karşılığı.
 * Pages Router'da layout kavramı olmadığı için `_app` bu bileşenle sarar;
 * layout istemeyen sayfalar (`Page.getLayout`) hariç tutulabilir.
 */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-svh flex-col">
      {/* Konsept A — Linear & Vercel Ambient Radial Spotlights + Grid Matrix */}
      <div
        aria-hidden="true"
        className="linear-bg pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="dark:from-cyan-500/22 dark:via-sky-500/12 dark:to-emerald-500/18 absolute -top-48 left-1/2 h-[540px] w-[960px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-cyan-500/25 via-sky-400/15 to-emerald-500/20 blur-[130px]" />
        <div className="dark:bg-cyan-500/12 absolute -left-40 top-[38%] h-[420px] w-[420px] rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="dark:bg-emerald-500/12 absolute -right-40 top-[65%] h-[440px] w-[440px] rounded-full bg-emerald-500/10 blur-[120px]" />
      </div>

      <Header />
      <main className="relative z-10 flex-1 pt-24 md:pt-28">{children}</main>
      <Footer />
    </div>
  )
}
