import ProjectsContent from '@/components/ProjectsContent'
import { Seo } from '@/lib/seo'

export default function ProjectsPage() {
  return (
    <>
      <Seo
        rawTitle="Projelerim & AI Agent Skill Stüdyosu | Hüseyin DOL"
        description="VulnGuardian AI Agent Skill (Antigravity & Claude Code) ve Zafiyet Komut Merkezi, Elly multi-tenant headless CMS ekosistemi (Spring Boot, Next.js 16, Flutter) ve WebAssembly oyun projelerim."
        canonical="/projects"
        keywords={[
          'VulnGuardian',
          'AI Agent Skill',
          'Skill Studio',
          'Elly CMS',
          'Spring Boot',
          'Java',
          'Next.js',
          'Flutter',
          'Headless CMS',
          'Multitenant',
          'Hüseyin DOL',
          'Projeler',
          'Portfolio',
        ]}
      />
      <ProjectsContent />
    </>
  )
}
