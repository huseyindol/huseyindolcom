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
    <>
      <Header />
      <main className="flex-1 pt-20">{children}</main>
      <Footer />
    </>
  )
}
