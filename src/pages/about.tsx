import { ErrorBoundary } from '@/components/ErrorBoundary'
import Hero from '@/components/Hero'
import { Seo } from '@/lib/seo'

/**
 * Hero tamamen client bileşeni (veri çekmiyor) → sayfa build'de statik üretilir
 * (getStaticProps'a gerek yok, otomatik statik optimizasyon = en yüksek RPS).
 */
export default function AboutPage() {
  return (
    <>
      <Seo
        title="Hakkımda"
        description="Hüseyin DOL hakkında: 10+ yıllık deneyime sahip Software Developer. React, Next.js, TypeScript ile frontend; Java ve Spring Boot ile backend uzmanlığı, ekip liderliği ve mentorluk deneyimi."
        canonical="/about"
        keywords={[
          'Hüseyin DOL',
          'Hakkımda',
          'Software Developer',
          'Full Stack Developer',
          'Frontend Developer',
          'Backend Developer',
          'Yazılım Geliştirici',
          'React Developer',
          'Next.js Developer',
          'Java Developer',
          'Spring Boot',
          'TypeScript',
          'İstanbul',
          'Biyografi',
        ]}
      />
      <main className="min-h-screen">
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
      </main>
    </>
  )
}
