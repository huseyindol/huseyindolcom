import { resCookieStore } from '@/lib/api-cookies'
import { clearAuthCookies } from '@/lib/auth-cookies'
import { CookieEnum } from '@/utils/constant/cookieConstant'
import type { NextApiRequest, NextApiResponse } from 'next'

const ELLY_API_URL =
  process.env.NEXT_PUBLIC_ELLY_API_URL ?? 'https://api.huseyindol.com'

/**
 * Tenant-site çıkışı. accessToken httpOnly cookie'den SUNUCUDA okunur ve
 * backend `POST /api/v1/auth/logout`'a Bearer ile gider (public prefix YOK —
 * o yol POST allowlist'inde değildir) → tüm oturumlar sunucu tarafında iptal
 * edilir (refresh sil + tokenVersion++). 401/403/ağ hatası yoksayılır: token
 * zaten ölmüş olabilir; yerel cookie temizliği her koşulda yapılır.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ ok: boolean }>,
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false })
  }

  const accessToken = req.cookies[CookieEnum.ACCESS_TOKEN]
  if (accessToken) {
    try {
      await fetch(`${ELLY_API_URL}/api/v1/auth/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${accessToken}` },
        cache: 'no-store',
      })
    } catch {
      // Ağ hatası → sunucu tarafı iptal başarısız; yerel temizlik yine yapılır.
    }
  }

  clearAuthCookies(resCookieStore(res))
  return res.status(200).json({ ok: true })
}
