import { ErrorBoundary } from '@/components/ErrorBoundary'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import {
  loadExperienceSection,
  type ExperienceSectionData,
} from '@/lib/section-data'
import { Seo } from '@/lib/seo'
import type { GetStaticProps } from 'next'

export default function ExperiencePage({
  experiences,
  title,
  description,
}: ExperienceSectionData) {
  return (
    <>
      <Seo
        title="Deneyim"
        description="Hüseyin DOL profesyonel deneyimi: 10+ yıllık yazılım geliştirme kariyeri. Frontend ve backend projelerinde takım liderliği, mentorluk ve uçtan uca geliştirme."
        canonical="/experience"
        keywords={[
          'Hüseyin DOL',
          'Deneyim',
          'Kariyer',
          'Software Developer',
          'Team Lead',
          'Frontend Developer',
          'Backend Developer',
          'İş Deneyimi',
          'Özgeçmiş',
        ]}
      />
      <main className="min-h-screen">
        <ErrorBoundary>
          <ExperienceTimeline
            experiences={experiences}
            title={title}
            description={description}
          />
        </ErrorBoundary>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps<
  ExperienceSectionData
> = async () => ({
  props: await loadExperienceSection(),
  revalidate: 3600,
})
