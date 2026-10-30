import { getServerSideProps, renderAmpDocument } from '@/pages/amp'
import { createApiMocks } from '@tests/utils/test-utils'
import type { GetServerSidePropsContext } from 'next'
import { describe, expect, it } from 'vitest'

/**
 * /amp — ana sayfanın AMP kopyası. App Router route handler'ından Pages Router'a
 * taşındı: HTML `renderAmpDocument()` ile üretilir, `getServerSideProps` `res`'e yazar.
 * İçerik doğrulaması renderAmpDocument çıktısı üzerinden, header/status ise
 * getServerSideProps üzerinden yapılır.
 */
describe('/amp (Pages Router)', () => {
  it('getServerSideProps sets 200 text/html and writes body', async () => {
    const { req, res, state } = createApiMocks({ method: 'GET' })
    // res.write / res.end mock'la (createApiMocks json/end sağlıyor, write ekleyelim)
    let written = ''
    ;(res as unknown as { write: (s: string) => void }).write = (s: string) => {
      written += s
    }
    await getServerSideProps({
      req,
      res,
    } as unknown as GetServerSidePropsContext)
    expect(state.headers['content-type']).toContain('text/html')
    expect(state.headers['cache-control']).toContain('s-maxage=3600')
    expect(written.startsWith('<!doctype html>')).toBe(true)
  })

  it('is a valid AMP document skeleton', () => {
    const html = renderAmpDocument()
    expect(html.startsWith('<!doctype html>')).toBe(true)
    expect(html).toContain('<html ⚡ lang="tr">')
    expect(html).toContain('<meta charset="utf-8">')
    expect(html).toContain('<link rel="canonical"')
    expect(html).toContain('width=device-width')
    expect(html).toContain('https://cdn.ampproject.org/v0.js')
    expect(html).toContain('<style amp-boilerplate>')
    expect(html).toContain('<noscript><style amp-boilerplate>')
    expect(html.match(/<style amp-custom>/g)?.length).toBe(1)
  })

  it('obeys AMP restrictions (no custom JS, no !important, no external stylesheet)', () => {
    const html = renderAmpDocument()
    const scriptSrcs = [...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g)].map(
      m => m[1],
    )
    expect(scriptSrcs).toEqual(['https://cdn.ampproject.org/v0.js'])
    expect(html).not.toContain('!important')
    expect(html).not.toContain('rel="stylesheet"')
    expect(html).toContain('<amp-img')
    expect(html).not.toMatch(/<img\s/)
  })

  it('mirrors the homepage content (hero, stats, values)', () => {
    const html = renderAmpDocument()
    expect(html).toContain('Modern Web')
    expect(html).toContain('Hakkımda')
    expect(html).toContain('Çalışma Yaklaşımım')
    expect(html).toContain('Yıl Deneyim')
    expect(html).toMatch(/<link rel="canonical" href="https?:\/\/[^"]+\/">/)
  })

  it('emits rich-results structured data (@graph)', () => {
    const html = renderAmpDocument()
    const match = html.match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/,
    )
    expect(match).not.toBeNull()
    const data = JSON.parse(match![1]) as {
      '@graph': Array<Record<string, unknown>>
    }
    const types = data['@graph'].map(node => node['@type'])
    expect(types).toContain('BreadcrumbList')
    expect(types).toContain('FAQPage')
    expect(types).toContain('ProfilePage')
    expect(types).toContain('Person')
    expect(types).toContain('WebSite')
    const faq = data['@graph'].find(n => n['@type'] === 'FAQPage') as {
      mainEntity: unknown[]
    }
    expect(faq.mainEntity.length).toBeGreaterThanOrEqual(3)
  })

  it('renders visible breadcrumb + FAQ matching the structured data', () => {
    const html = renderAmpDocument()
    expect(html).toContain('class="breadcrumb"')
    expect(html).toContain('Ana Sayfa')
    expect(html).toContain('Sıkça Sorulan Sorular')
    expect(html).toContain('Hüseyin DOL kimdir?')
    expect(html).toContain('property="og:title"')
    expect(html).toContain('name="twitter:card"')
    expect(html).toContain('/assets/logos/og-phoenix-v1.png')
    expect(html).toContain('/assets/logos/favicon-32x32-v1.png')
  })
})
