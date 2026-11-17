/**
 * Security utility functions
 */

/**
 * Generate a secure random token
 */
export function generateSecureToken(length: number = 32): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''

  // Use Web Crypto API (works in both browser and Edge Runtime)
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const array = new Uint32Array(length)
    crypto.getRandomValues(array)

    for (let i = 0; i < length; i++) {
      token += characters[array[i] % characters.length]
    }
  } else {
    // Fallback for Node.js (only in non-edge environments)
    try {
      // Dynamic import for Node.js crypto
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { randomBytes } = require('node:crypto')
      const buffer = randomBytes(length)

      for (let i = 0; i < length; i++) {
        token += characters[buffer[i] % characters.length]
      }
    } catch {
      // If crypto is not available, use Math.random (less secure, but works everywhere)
      for (let i = 0; i < length; i++) {
        token += characters[Math.floor(Math.random() * characters.length)]
      }
    }
  }

  return token
}

/**
 * Sanitize user input to prevent XSS
 * Note: This is a basic implementation. For production, use a library like DOMPurify
 */
export function sanitizeInput(input: string): string {
  return input
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;')
    .replaceAll('/', '&#x2F;')
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Check if a string contains only alphanumeric characters
 */
export function isAlphanumeric(str: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(str)
}

/**
 * Generate Content Security Policy header value
 *
 * Google AdSense / Ad Manager için tüm alt alan adlarını wildcard ile
 * tanımlıyoruz. Böylece `ep1`, `ep2` (sodar2.js) gibi farklı endpoint'ler
 * ve gelecekte eklenebilecek yeni Google reklam alt alan adları otomatik
 * olarak izinli olur.
 */
export function generateCSP(): string {
  // Google AdSense / Ad Manager / Ad Traffic Quality alan adları
  const googleAdsDomains = [
    'https://*.googlesyndication.com', // pagead2, tpc, *.safeframe vs.
    'https://*.googleadservices.com',
    'https://*.doubleclick.net', // googleads.g.doubleclick.net
    'https://*.adtrafficquality.google', // ep1, ep2 (sodar2.js) vs.
    'https://*.google.com', // csi, adservice
    'https://fundingchoicesmessages.google.com',
    'https://www.googletagmanager.com',
    'https://*.google-analytics.com',
    'https://*.googletagmanager.com',
  ].join(' ')

  const clarityDomains = [
    'https://www.clarity.ms',
    'https://*.clarity.ms',
  ].join(' ')

  // AMP runtime (/amp sayfası): v0.js + eklentiler cdn.ampproject.org'dan yüklenir
  // ve çalışma anında aynı origin'e istek atar. Eksikse tarayıcı v0.js'i bloklar.
  const ampDomains = 'https://cdn.ampproject.org'

  // Flutter Web CanvasKit and Fonts
  const flutterDomains =
    'https://www.gstatic.com https://fonts.gstatic.com https://fonts.googleapis.com'

  const policies = [
    "default-src 'self'",
    `script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com ${ampDomains} ${clarityDomains} ${googleAdsDomains} ${flutterDomains}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: https: blob:",
    `connect-src 'self' https://vercel.live https://*.vercel-insights.com https://raw.githubusercontent.com https://avatars.githubusercontent.com http://localhost:8080 ws://localhost:8080 https://api.huseyindol.com wss://api.huseyindol.com ${ampDomains} ${clarityDomains} ${googleAdsDomains} ${flutterDomains}`,
    `frame-src 'self' https://vercel.live ${googleAdsDomains}`,
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'self'",
    'upgrade-insecure-requests',
  ]

  return policies.join('; ')
}

/**
 * Private/reserved IP mi? (IPv4 özel aralıkları + IPv6 loopback/ULA/link-local).
 * Köşeli parantezli `[::1]` ve IPv4-mapped `::ffff:10.0.0.1` formları da normalize edilir.
 */
function isPrivateIp(ip: string): boolean {
  const normalized = ip
    .trim()
    .toLowerCase()
    .replace(/^\[/, '')
    .replace(/\]$/, '')
    .replace(/^::ffff:/, '')
  return (
    normalized === '::1' ||
    normalized.startsWith('fe80:') || // link-local
    normalized.startsWith('fc') || // fc00::/7 unique-local (fc/fd)
    normalized.startsWith('fd') ||
    normalized === '0.0.0.0' ||
    /^10\./.test(normalized) ||
    /^127\./.test(normalized) ||
    /^169\.254\./.test(normalized) ||
    /^192\.168\./.test(normalized) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(normalized)
  )
}

/**
 * XFF zincirinde sağdan sola (sunucuya en yakından istemciye) ilk PUBLIC IP'yi bul.
 *
 * Güven modeli: zincirin SOLUNDAKİ değerler istemci tarafından sahte edilebilir
 * (`X-Forwarded-For: 1.2.3.4` ile ilk değer spoof edilir); buna karşılık EN SAĞDAKI
 * değer doğrudan bize bakan güvenilir proxy tarafından eklenir. Bu yüzden sağdan
 * başlanır ve ilk public (private/reserved olmayan) IP istemci kabul edilir;
 * sağdaki değerler private ise (iç LB zinciri) soldaki ilk public'e geçilir.
 */
function firstPublicIpFromRight(forwardedFor: string): string | null {
  const parts = forwardedFor
    .split(',')
    .map(part => part.trim())
    .filter(Boolean)
  for (let i = parts.length - 1; i >= 0; i--) {
    if (!isPrivateIp(parts[i])) return parts[i]
  }
  return null
}

/**
 * Get client IP address from request headers
 *
 * Öncelik: Vercel'de `x-vercel-forwarded-for` (Vercel LB zinciri) → `x-forwarded-for`
 * (sağdan sola ilk public IP) → `x-real-ip` (proxy'nin tek değer set ettiği ortamlar).
 * Hiçbiri yoksa loopback varsayılır.
 */
export function getClientIp(headers: Headers): string {
  // Vercel: yük dengeleyici zincirinin tamamını taşır; sağdan-sola tarama ile
  // istemcinin eklediği sahte sol girişler etkisizleşir.
  const vercelForwarded = headers.get('x-vercel-forwarded-for')
  if (vercelForwarded) {
    const ip = firstPublicIpFromRight(vercelForwarded)
    if (ip) return ip
  }

  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) {
    const ip = firstPublicIpFromRight(forwarded)
    if (ip) return ip
  }

  const realIp = headers.get('x-real-ip')
  if (realIp?.trim()) {
    return realIp.trim()
  }

  // Fallback to a default value
  return '127.0.0.1'
}

/**
 * Check if request is from a bot
 */
export function isBot(userAgent: string | null): boolean {
  if (!userAgent) return false

  const botPatterns = [
    /bot/i,
    /spider/i,
    /crawl/i,
    /slurp/i,
    /mediapartners/i,
    /google/i,
    /bing/i,
    /yahoo/i,
    /duckduckbot/i,
  ]

  return botPatterns.some(pattern => pattern.test(userAgent))
}

/**
 * Validate CSRF token
 */
export function validateCSRFToken(
  token: string | null,
  expectedToken: string,
): boolean {
  if (!token) return false
  return token === expectedToken
}

/**
 * Hash a string using SHA-256
 */
export async function hashString(input: string): Promise<string> {
  // Use Web Crypto API (works in browser, Edge Runtime, and Node.js 19+)
  if (typeof crypto !== 'undefined' && crypto.subtle) {
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  } else {
    // Fallback for older Node.js versions
    try {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { createHash } = require('node:crypto')
      return createHash('sha256').update(input).digest('hex')
    } catch {
      // If crypto is not available, throw an error
      throw new Error('Crypto API not available')
    }
  }
}
