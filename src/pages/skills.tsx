import { ErrorBoundary } from '@/components/ErrorBoundary'
import SkillsContent from '@/components/SkillsContent'
import { loadSkillsSection, type SkillsSectionData } from '@/lib/section-data'
import { Seo } from '@/lib/seo'
import type { GetStaticProps } from 'next'

type SkillsPageProps = SkillsSectionData

export default function SkillsPage({
  skills,
  title,
  description,
}: SkillsPageProps) {
  return (
    <>
      <Seo
        title="Yetenekler"
        description="Hüseyin DOL teknik yetenekleri: React, Next.js, TypeScript, Node.js, Docker ve daha fazlası. 10+ yıllık deneyimle uzman seviyesinde frontend teknolojileri."
        canonical="/skills"
        keywords={[
          'Hüseyin DOL',
          'Teknik Yetenekler',
          'React',
          'Next.js',
          'TypeScript',
          'JavaScript',
          'Node.js',
          'Docker',
          'Frontend Teknolojileri',
          'Yazılım',
          'Web Geliştirme',
        ]}
      />
      <main className="min-h-screen">
        <ErrorBoundary>
          <SkillsContent
            skills={skills}
            title={title}
            description={description}
          />
        </ErrorBoundary>
      </main>
    </>
  )
}

/**
 * App Router'daki async `Skills` server component'inin karşılığı: veri build'de
 * çekilir, sayfa statik HTML olarak servis edilir ve ISR ile tazelenir.
 */
export const getStaticProps: GetStaticProps<SkillsPageProps> = async () => ({
  props: await loadSkillsSection(),
  revalidate: 3600,
})
