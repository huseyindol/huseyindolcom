import Hero from '@/components/Hero'
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

// Mock lucide-react icons — include ALL icons used by Hero
vi.mock('lucide-react', () => ({
  Code2: (props: Record<string, unknown>) => (
    <div data-testid="icon-code2" {...props}>
      Code2 Icon
    </div>
  ),
  Download: (props: Record<string, unknown>) => (
    <div data-testid="icon-download" {...props}>
      Download Icon
    </div>
  ),
  GithubIcon: (props: Record<string, unknown>) => (
    <div data-testid="icon-github" {...props}>
      Github Icon
    </div>
  ),
  LinkedinIcon: (props: Record<string, unknown>) => (
    <div data-testid="icon-linkedin" {...props}>
      Linkedin Icon
    </div>
  ),
  Mail: (props: Record<string, unknown>) => (
    <div data-testid="icon-mail" {...props}>
      Mail Icon
    </div>
  ),
  MapPin: (props: Record<string, unknown>) => (
    <div data-testid="icon-mappin" {...props}>
      MapPin Icon
    </div>
  ),
  Users: (props: Record<string, unknown>) => (
    <div data-testid="icon-users" {...props}>
      Users Icon
    </div>
  ),
  Zap: (props: Record<string, unknown>) => (
    <div data-testid="icon-zap" {...props}>
      Zap Icon
    </div>
  ),
}))

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: new Proxy(
    {},
    {
      get: (_target, prop) => {
        return ({
          children,
          ...props
        }: {
          children?: React.ReactNode
          [key: string]: unknown
        }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const Tag = prop as any
          return <Tag {...props}>{children}</Tag>
        }
      },
    },
  ),
  useInView: () => true,
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

// Mock @next/third-parties/google
vi.mock('@next/third-parties/google', () => ({
  sendGTMEvent: vi.fn(),
}))

// Mock next/image
vi.mock('next/image', () => ({
  // eslint-disable-next-line @next/next/no-img-element
  default: (props: Record<string, unknown>) => <img alt="" {...props} />,
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => <a {...props}>{children}</a>,
}))

// Mock shadcn UI components
vi.mock('@/components/ui/badge', () => ({
  Badge: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => <span {...props}>{children}</span>,
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => <button {...props}>{children}</button>,
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({
    children,
    ...props
  }: {
    children: React.ReactNode
    [key: string]: unknown
  }) => <div {...props}>{children}</div>,
}))

describe('Hero Component', () => {
  it('should render hero section', () => {
    render(<Hero />)

    expect(screen.getByText(/Modern Web/i)).toBeInTheDocument()
  })

  it('should display greeting badge', () => {
    render(<Hero />)

    expect(screen.getByText(/Merhabalar/i)).toBeInTheDocument()
  })

  it('should render contact button', () => {
    render(<Hero />)

    const contactButton = screen.getByRole('button', {
      name: /İletişime Geç/i,
    })
    expect(contactButton).toBeInTheDocument()
  })

  it('should render CV download button', () => {
    render(<Hero />)

    const cvButton = screen.getByRole('button', { name: /CV İndir/i })
    expect(cvButton).toBeInTheDocument()
  })

  it('should render social links', () => {
    render(<Hero />)

    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
  })

  it('should render hero sections', () => {
    const { container } = render(<Hero />)

    // Hero renders multiple sections inside a wrapper div
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThan(0)
  })

  it('should render multi-directional kinetic typography tracks', () => {
    render(<Hero />)

    expect(
      screen.getByRole('region', { name: /Teknoloji ve Mimari Akışı/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/REACT 19 · NEXT\.JS 16 · TYPESCRIPT/i),
    ).toBeInTheDocument()
    expect(screen.getByText(/JAVA 21 & SPRING BOOT 3\.5/i)).toBeInTheDocument()
  })
})
