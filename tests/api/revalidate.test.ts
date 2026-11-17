import handler from '@/pages/api/revalidate'
import { createApiMocks } from '@tests/utils/test-utils'
import { describe, expect, it, vi } from 'vitest'

/**
 * NOT: App Router'daki revalidateTag/GET semantiği Pages Router'da yok.
 * Davranış: POST-only, res.revalidate(path). Tag'ler path'e eşlenir
 * (cms-page-<slug> → '/' + '/<slug>'). Yetkilendirme FAIL-CLOSED'dur:
 * REVALIDATE_SECRET yapılandırılmamışsa veya Bearer header eşleşmezse 401.
 */
describe('Revalidate API (pages/api/revalidate)', () => {
  it('405 for non-POST', async () => {
    const { req, res, state } = createApiMocks({ method: 'GET' })
    await handler(req, res)
    expect(state.statusCode).toBe(405)
  })

  it('401 when secret is not configured (fail-closed)', async () => {
    const { req, res, state } = createApiMocks({
      method: 'POST',
      headers: { authorization: 'Bearer anything' },
      body: { path: '/blog' },
    })
    await handler(req, res)
    expect(state.statusCode).toBe(401)
  })

  it('401 when Bearer header is missing or wrong', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 'secret-key')

    const noHeader = createApiMocks({ method: 'POST', body: { path: '/' } })
    await handler(noHeader.req, noHeader.res)
    expect(noHeader.state.statusCode).toBe(401)

    const wrongHeader = createApiMocks({
      method: 'POST',
      headers: { authorization: 'Bearer wrong' },
      body: { path: '/' },
    })
    await handler(wrongHeader.req, wrongHeader.res)
    expect(wrongHeader.state.statusCode).toBe(401)

    vi.unstubAllEnvs()
  })

  it('400 when no tag or path', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 'secret-key')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      headers: { authorization: 'Bearer secret-key' },
      body: {},
    })
    await handler(req, res)
    expect(state.statusCode).toBe(400)
    expect((state.jsonBody as { ok: boolean }).ok).toBe(false)
    vi.unstubAllEnvs()
  })

  it('revalidates by path', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 'secret-key')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      headers: { authorization: 'Bearer secret-key' },
      body: { path: '/blog' },
    })
    const spy = vi.spyOn(res, 'revalidate')
    await handler(req, res)
    expect(state.statusCode).toBe(200)
    expect(spy).toHaveBeenCalledWith('/blog')
    expect((state.jsonBody as { revalidated: string[] }).revalidated).toContain(
      '/blog',
    )
    vi.unstubAllEnvs()
  })

  it('maps cms-page-<slug> tag to paths', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 'secret-key')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      headers: { authorization: 'Bearer secret-key' },
      body: { tag: 'cms-page-hakkimda' },
    })
    const spy = vi.spyOn(res, 'revalidate')
    await handler(req, res)
    expect(state.statusCode).toBe(200)
    expect(spy).toHaveBeenCalledWith('/hakkimda')
    expect(spy).toHaveBeenCalledWith('/')
    vi.unstubAllEnvs()
  })

  it('accepts Bearer authorization', async () => {
    vi.stubEnv('REVALIDATE_SECRET', 'secret-key')
    const { req, res, state } = createApiMocks({
      method: 'POST',
      headers: { authorization: 'Bearer secret-key' },
      body: { path: '/' },
    })
    await handler(req, res)
    expect(state.statusCode).toBe(200)
    vi.unstubAllEnvs()
  })
})
