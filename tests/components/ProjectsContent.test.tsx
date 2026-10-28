import ProjectsContent from '@/components/ProjectsContent'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/link', () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => <a {...props}>{children}</a>,
}))

vi.mock('@/components/AdSenseAd', () => ({
  default: () => <div data-testid="adsense-ad" />,
}))

vi.mock('@/hooks/useUrlQueryParam', () => ({
  useUrlQueryParam: () => undefined,
}))

describe('ProjectsContent Component', () => {
  it('renders Skill Studio spotlight and VulnGuardian project', () => {
    render(<ProjectsContent />)

    expect(
      screen.getByText(/AI AGENT SKILL ÇALIŞMALARI \(SKILL STUDIO\)/i),
    ).toBeInTheDocument()
    expect(
      screen.getAllByText(/huseyindol\/vuln-guardian/i).length,
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole('link', {
        name: /VulnGuardian Mimari & Tanıtım Sayfası/i,
      }),
    ).toHaveAttribute('href', '/projects/vuln-guardian')
  })

  it('filters projects by category tab (AI & Agent Skills, Elly Ekosistemi, Web Oyunları)', () => {
    render(<ProjectsContent />)

    // Click AI & Agent Skills category tab
    const skillsTab = screen.getByRole('button', {
      name: /AI & Agent Skills/i,
    })
    fireEvent.click(skillsTab)

    expect(screen.getByText(/Gösterilen:/i).textContent).toContain('1 / 13')

    // Click Elly Ekosistemi category tab
    const ecoTab = screen.getByRole('button', {
      name: /Elly Ekosistemi/i,
    })
    fireEvent.click(ecoTab)

    expect(screen.getByText(/Gösterilen:/i).textContent).toContain('4 / 13')
  })

  it('filters projects by search query and resets cleanly', () => {
    render(<ProjectsContent />)

    const searchInput = screen.getByPlaceholderText(
      /Proje, teknoloji veya motor ara/i,
    )
    fireEvent.change(searchInput, { target: { value: 'OSV.dev' } })

    expect(screen.getByText(/Gösterilen:/i).textContent).toContain('1 / 13')

    const resetBtn = screen.getByRole('button', { name: /Filtreleri Sıfırla/i })
    fireEvent.click(resetBtn)

    expect(screen.getByText(/Gösterilen:/i).textContent).toContain('13 / 13')
  })

  it('toggles between compact grid and list view modes', () => {
    render(<ProjectsContent />)

    const listBtn = screen.getByRole('button', {
      name: /Geniş Liste Görünümü/i,
    })
    fireEvent.click(listBtn)

    const gridBtn = screen.getByRole('button', {
      name: /Kompakt Grid Görünümü/i,
    })
    fireEvent.click(gridBtn)

    expect(gridBtn).toBeInTheDocument()
  })
})
