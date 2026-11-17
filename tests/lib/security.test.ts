import {
  generateCSP,
  generateSecureToken,
  getClientIp,
  isAlphanumeric,
  isBot,
  isValidEmail,
  isValidUrl,
  sanitizeInput,
  validateCSRFToken,
} from '@/lib/security'
import { describe, expect, it } from 'vitest'

describe('Security Utilities', () => {
  describe('sanitizeInput', () => {
    it('should escape HTML special characters', () => {
      const input = '<script>alert("XSS")</script>'
      const result = sanitizeInput(input)

      expect(result).not.toContain('<script>')
      expect(result).toContain('&lt;script&gt;')
    })

    it('should escape ampersands', () => {
      expect(sanitizeInput('A & B')).toBe('A &amp; B')
    })

    it('should escape quotes', () => {
      expect(sanitizeInput('Say "Hello"')).toContain('&quot;')
      expect(sanitizeInput("It's mine")).toContain('&#x27;')
    })

    it('should escape forward slashes', () => {
      expect(sanitizeInput('path/to/file')).toContain('&#x2F;')
    })
  })

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid')).toBe(false)
      expect(isValidEmail('@example.com')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('test @example.com')).toBe(false)
    })
  })

  describe('isValidUrl', () => {
    it('should validate correct URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true)
      expect(isValidUrl('http://localhost:3000')).toBe(true)
      expect(isValidUrl('https://sub.domain.com/path')).toBe(true)
    })

    it('should reject invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false)
      expect(isValidUrl('ftp://example')).toBe(true) // FTP is valid
      expect(isValidUrl('')).toBe(false)
    })
  })

  describe('isAlphanumeric', () => {
    it('should validate alphanumeric strings', () => {
      expect(isAlphanumeric('abc123')).toBe(true)
      expect(isAlphanumeric('ABC')).toBe(true)
      expect(isAlphanumeric('123')).toBe(true)
    })

    it('should reject non-alphanumeric strings', () => {
      expect(isAlphanumeric('abc-123')).toBe(false)
      expect(isAlphanumeric('abc 123')).toBe(false)
      expect(isAlphanumeric('abc@123')).toBe(false)
    })
  })

  describe('generateSecureToken', () => {
    it('should generate token of specified length', () => {
      const token = generateSecureToken(16)
      expect(token).toHaveLength(16)
    })

    it('should generate different tokens', () => {
      const token1 = generateSecureToken(32)
      const token2 = generateSecureToken(32)

      expect(token1).not.toBe(token2)
    })

    it('should use default length of 32', () => {
      const token = generateSecureToken()
      expect(token).toHaveLength(32)
    })

    it('should only contain alphanumeric characters', () => {
      const token = generateSecureToken(100)
      expect(isAlphanumeric(token)).toBe(true)
    })
  })

  describe('getClientIp', () => {
    it('should pick rightmost public IP from x-forwarded-for (spoof-safe)', () => {
      const headers = new Headers()
      // Soldaki "1.2.3.4" istemci tarafından sahte edilmiş olabilir;
      // en sağdaki güvenilir proxy'nin eklediği public IP seçilir.
      headers.set('x-forwarded-for', '1.2.3.4, 203.0.113.7')

      const ip = getClientIp(headers)
      expect(ip).toBe('203.0.113.7')
    })

    it('should skip private hops from the right', () => {
      const headers = new Headers()
      headers.set('x-forwarded-for', '203.0.113.10, 10.0.0.1, 192.168.1.1')

      const ip = getClientIp(headers)
      expect(ip).toBe('203.0.113.10')
    })

    it('should prefer x-vercel-forwarded-for on Vercel', () => {
      const headers = new Headers()
      headers.set('x-vercel-forwarded-for', '198.51.100.3, 10.0.0.2')
      headers.set('x-forwarded-for', '203.0.113.7')

      const ip = getClientIp(headers)
      expect(ip).toBe('198.51.100.3')
    })

    it('should get IP from x-real-ip header', () => {
      const headers = new Headers()
      headers.set('x-real-ip', '203.0.113.2')

      const ip = getClientIp(headers)
      expect(ip).toBe('203.0.113.2')
    })

    it('should fall back to x-real-ip when XFF has only private IPs', () => {
      const headers = new Headers()
      headers.set('x-forwarded-for', '192.168.1.1, 10.0.0.1')
      headers.set('x-real-ip', '203.0.113.9')

      const ip = getClientIp(headers)
      expect(ip).toBe('203.0.113.9')
    })

    it('should return default IP when no headers', () => {
      const headers = new Headers()
      const ip = getClientIp(headers)

      expect(ip).toBe('127.0.0.1')
    })
  })

  describe('isBot', () => {
    it('should detect common bot user agents', () => {
      expect(isBot('Googlebot/2.1')).toBe(true)
      expect(isBot('Mozilla/5.0 (compatible; bingbot/2.0)')).toBe(true)
      expect(isBot('Yahoo! Slurp')).toBe(true)
      expect(isBot('DuckDuckBot/1.0')).toBe(true)
    })

    it('should not flag regular browsers', () => {
      expect(
        isBot('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'),
      ).toBe(false)
      expect(isBot('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0)')).toBe(false)
    })

    it('should handle null user agent', () => {
      expect(isBot(null)).toBe(false)
    })
  })

  describe('validateCSRFToken', () => {
    it('should validate matching tokens', () => {
      const token = 'secure-token-123'
      expect(validateCSRFToken(token, token)).toBe(true)
    })

    it('should reject non-matching tokens', () => {
      expect(validateCSRFToken('token1', 'token2')).toBe(false)
    })

    it('should reject null tokens', () => {
      expect(validateCSRFToken(null, 'expected-token')).toBe(false)
    })
  })

  describe('generateCSP', () => {
    it('should generate Content Security Policy string', () => {
      const csp = generateCSP()

      expect(csp).toContain("default-src 'self'")
      expect(csp).toContain('script-src')
      expect(csp).toContain('style-src')
      expect(csp).toContain('upgrade-insecure-requests')
    })

    it('should include common security directives', () => {
      const csp = generateCSP()

      expect(csp).toContain('object-src')
      expect(csp).toContain('base-uri')
      expect(csp).toContain('form-action')
      expect(csp).toContain('frame-ancestors')
    })

    it('should allow the AMP CDN in script-src and connect-src (/amp page)', () => {
      const csp = generateCSP()
      const scriptSrc = csp
        .split(';')
        .find(d => d.trim().startsWith('script-src'))
      const connectSrc = csp
        .split(';')
        .find(d => d.trim().startsWith('connect-src'))

      expect(scriptSrc).toContain('https://cdn.ampproject.org')
      expect(connectSrc).toContain('https://cdn.ampproject.org')
    })
  })
})
