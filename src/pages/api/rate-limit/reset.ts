import { apiRateLimiter, generalRateLimiter } from '@/lib/rate-limiter-store'
import { getClientIp } from '@/lib/security'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Yetkilendirme FAIL-CLOSED'dur (revalidate endpoint'i ile aynı desen):
 * `REVALIDATE_SECRET` (server-only) yapılandırılmamışsa istek reddedilir;
 * secret yalnız `Authorization: Bearer <secret>` header'ından kabul edilir.
 */
function isAuthorized(req: NextApiRequest): boolean {
  const configuredSecret = process.env.REVALIDATE_SECRET
  if (!configuredSecret) return false
  const authHeader = req.headers.authorization || ''
  if (!authHeader.startsWith('Bearer ')) return false
  return authHeader.slice(7) === configuredSecret
}

/** req.headers (düz obje) → getClientIp'in beklediği Headers arayüzü. */
function toHeaders(req: NextApiRequest): Headers {
  const h = new Headers()
  for (const [k, v] of Object.entries(req.headers)) {
    if (typeof v === 'string') h.set(k, v)
    else if (Array.isArray(v)) h.set(k, v.join(','))
  }
  return h
}

/**
 * Rate limit sıfırlama.
 *   GET  ?ip=x  → belirli IP · ?all=true → tümü · (yoksa) çağıranın IP'si
 *   POST        → çağıranın IP'sini sıfırlar
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const q = (k: string) =>
    typeof req.query[k] === 'string' ? (req.query[k] as string) : undefined

  if (!isAuthorized(req)) {
    return res.status(401).json({ ok: false, error: 'Unauthorized' })
  }

  if (req.method === 'GET') {
    const targetIp = q('ip')
    if (q('all') === 'true') {
      apiRateLimiter.clear()
      generalRateLimiter.clear()
      return res.status(200).json({ ok: true, cleared: 'all' })
    }
    const ip = targetIp || getClientIp(toHeaders(req))
    apiRateLimiter.reset(ip)
    generalRateLimiter.reset(ip)
    return res.status(200).json({ ok: true, ip })
  }

  if (req.method === 'POST') {
    const ip = getClientIp(toHeaders(req))
    apiRateLimiter.reset(ip)
    generalRateLimiter.reset(ip)
    return res.status(200).json({ ok: true, ip })
  }

  res.setHeader('Allow', 'GET, POST')
  return res.status(405).json({ ok: false, error: 'Method Not Allowed' })
}
