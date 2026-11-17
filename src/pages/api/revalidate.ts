import type { NextApiRequest, NextApiResponse } from 'next'

type RevalidateBody = {
  tag?: string
  path?: string
  type?: 'page' | 'layout'
}

/**
 * Yetkilendirme FAIL-CLOSED'dur: `REVALIDATE_SECRET` (server-only, NEXT_PUBLIC
 * öneksiz — istemci bundle'ına sızmaz) yapılandırılmamışsa istek reddedilir.
 * Secret yalnız `Authorization: Bearer <secret>` header'ından kabul edilir;
 * body/query üzerinden secret gönderimi kaldırıldı (log/referans sızıntısı).
 */
function isAuthorized(req: NextApiRequest): boolean {
  const configuredSecret = process.env.REVALIDATE_SECRET
  if (!configuredSecret) return false
  const authHeader = req.headers.authorization || ''
  if (!authHeader.startsWith('Bearer ')) return false
  return authHeader.slice(7) === configuredSecret
}

/**
 * On-demand ISR yenileme (backend CMS içerik değişince çağırır).
 *
 * App Router'daki `revalidateTag`/`revalidatePath` ikilisinin Pages Router
 * karşılığı yalnız `res.revalidate(path)`'tir (tag bazlı yenileme yok). Bu yüzden:
 *  - `path` verilirse doğrudan o rota yenilenir.
 *  - `tag` verilirse bilinen tag'ler path'e EŞLENİR:
 *      cms-pages           → '/' (ana sayfa)
 *      cms-page-<slug>     → '/<slug>' ve '/'
 *    Eşleşmeyen tag sessizce yok sayılır (getServerSideProps sayfaları zaten her
 *    istekte taze; ISR sayfaları path ile yenilenir).
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
  }

  const body = (req.body ?? {}) as RevalidateBody
  if (!isAuthorized(req)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  const paths = new Set<string>()
  if (body.path) paths.add(body.path)
  if (body.tag) {
    if (body.tag === 'cms-pages') paths.add('/')
    else if (body.tag.startsWith('cms-page-')) {
      paths.add('/')
      paths.add(`/${body.tag.slice('cms-page-'.length)}`)
    }
  }

  if (paths.size === 0) {
    return res.status(400).json({
      ok: false,
      error: 'Provide at least one of: { tag, path }',
    })
  }

  const revalidated: string[] = []
  const failed: { path: string; error: string }[] = []
  for (const p of paths) {
    try {
      await res.revalidate(p)
      revalidated.push(p)
    } catch (e) {
      // Statik olmayan (getServerSideProps) yollar revalidate edilemez — sorun değil.
      failed.push({ path: p, error: (e as Error).message })
    }
  }

  return res.status(200).json({ ok: true, revalidated, failed })
}
