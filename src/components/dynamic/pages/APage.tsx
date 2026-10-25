import { ErrorBoundary } from '@/components/ErrorBoundary'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import Hero from '@/components/Hero'
import SkillsContent from '@/components/SkillsContent'
import type {
  ExperienceSectionData,
  SkillsSectionData,
} from '@/lib/section-data'
import { Page } from '@/types/BaseResponse'
import dynamic from 'next/dynamic'

/**
 * Şablon props'u. Bölüm verileri (skills/experience) artık bileşenin İÇİNDE
 * çekilmiyor — Pages Router'da server component olmadığı için getStaticProps
 * tarafından yüklenip props olarak geçiliyor.
 */
export interface PageTemplateProps {
  pageInfo: Page
  skills?: SkillsSectionData
  experience?: ExperienceSectionData
}

export default function APage({
  pageInfo,
  skills,
  experience,
}: Readonly<PageTemplateProps>) {
  const DynamicComponent = pageInfo.components.map(component => ({
    ...component,
    component: dynamic(
      () => import(`@/components/dynamic/components/${component.template}`),
    ),
  }))

  return (
    <main className="min-h-screen">
      <ErrorBoundary>
        <Hero />
      </ErrorBoundary>
      {skills && (
        <ErrorBoundary>
          <SkillsContent
            skills={skills.skills}
            title={skills.title}
            description={skills.description}
          />
        </ErrorBoundary>
      )}
      {experience && (
        <ErrorBoundary>
          <ExperienceTimeline
            experiences={experience.experiences}
            title={experience.title}
            description={experience.description}
          />
        </ErrorBoundary>
      )}
      {DynamicComponent.map(Component => {
        const { component: ComponentName, template, ...rest } = Component
        return <ComponentName key={Component.id} {...rest} />
      })}
    </main>
  )
}
