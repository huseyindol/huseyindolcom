# Error Handling Guide

Bu projede kullanılan error handling stratejileri ve best practices.

## 📋 İçindekiler

1. [Error Boundaries](#error-boundaries)
2. [Next.js Error Pages](#nextjs-error-pages)
3. [API Error Handling](#api-error-handling)
4. [Client-Side Error Handling](#client-side-error-handling)
5. [BFF Action Error Handling](#bff-action-error-handling)

---

## Error Boundaries

### ErrorBoundary Component

**Dosya:** `src/components/ErrorBoundary.tsx`

React component hatalarını yakalayan ve kullanıcı dostu UI gösteren boundary.

**Kullanım:**

```tsx
import { ErrorBoundary } from '@/components/ErrorBoundary'

export default function Page() {
  return (
    <ErrorBoundary>
      <YourComponent />
    </ErrorBoundary>
  )
}
```

**Custom Fallback:**

```tsx
<ErrorBoundary
  fallback={<div>Özel hata mesajı</div>}
  onError={(error, errorInfo) => {
    // Custom error handling
    console.error('Caught error:', error)
  }}
>
  <YourComponent />
</ErrorBoundary>
```

**Özellikler:**

- ✅ Automatic error catching
- ✅ Custom fallback UI
- ✅ Error callback for logging
- ✅ Reset functionality
- ✅ Development vs Production mode

---

## Next.js Error Pages (Pages Router)

### 1. 404 Not Found (`src/pages/404.tsx`)

**Dosya:** `src/pages/404.tsx`

Bulunamayan rotalar veya `getStaticProps` / `getServerSideProps` içinden `{ notFound: true }` döndürüldüğünde gösterilen özel 404 sayfası.

```tsx
import Link from 'next/link'

export default function NotFoundPage() {
  return (
    <div>
      <h2>Sayfa Bulunamadı</h2>
      <Link href="/">Ana Sayfaya Dön</Link>
    </div>
  )
}
```

**Veri Çekme Sırasında 404 Döndürme:**

```tsx
import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const data = await fetchData(String(params?.id))

  if (!data) {
    return { notFound: true }
  }

  return { props: { data } }
}
```

### 2. 500 Server Error (`src/pages/500.tsx`)

**Dosya:** `src/pages/500.tsx`

Sunucu tarafında yakalanamayan hatalarda gösterilen statik 500 hata sayfası.

```tsx
import Link from 'next/link'

export default function ServerErrorPage() {
  return (
    <div>
      <h2>Sunucu Hatası (500)</h2>
      <Link href="/">Ana Sayfaya Dön</Link>
    </div>
  )
}
```

---

## API Error Handling

### Standard Error Response

```typescript
// src/types/APITypes.ts
export type APIResponseErrorType = {
  success: false
  error: string
  message: unknown
  status: number
}
```

### API Route Error Handling (`src/pages/api/`)

```typescript
// src/pages/api/example.ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  try {
    const body = req.body

    // Validation
    if (!body?.email) {
      return res
        .status(400)
        .json({ success: false, error: 'Email is required' })
    }

    // Business logic
    const result = await doSomething(body)

    return res.status(200).json({ success: true, data: result })
  } catch (error) {
    console.error('API Error:', error)

    return res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    })
  }
}
```

### Error Status Codes

```typescript
// 4xx Client Errors
400 // Bad Request - Invalid input
401 // Unauthorized - Authentication required
403 // Forbidden - Permission denied
404 // Not Found - Resource not found
429 // Too Many Requests - Rate limit exceeded

// 5xx Server Errors
500 // Internal Server Error - Generic server error
503 // Service Unavailable - Service down/maintenance
```

---

## Client-Side Error Handling

### Fetch with Error Handling

```typescript
// src/utils/services/fetcher.ts
export const fetcher = async <T>(
  url: string,
  options: RequestInit = {},
): Promise<T> => {
  try {
    const response = await fetch(url, options)

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    if (response.status === 204) {
      return null as T
    }

    return response.json() as Promise<T>
  } catch (error) {
    console.error('Fetch error:', error)
    throw error
  }
}
```

### React Query Error Handling

```typescript
import { useQuery } from '@tanstack/react-query'

function Component() {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetcher('/api/posts'),
    retry: 3,
    onError: (error) => {
      console.error('Query failed:', error)
      // Show toast notification
    }
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return <div>{/* Render data */}</div>
}
```

### Form Error Handling

```typescript
import { useState } from 'react'

function ContactForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message)
      }

      // Success

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error">{error}</div>}
      {/* Form fields */}
    </form>
  )
}
```

---

## BFF Action Error Handling

### Client BFF Wrapper (`src/actions/auth/`)

Pages Router'da auth aksiyonları `src/pages/api/auth/*` BFF endpoint'lerini çağıran istemci sarmalayıcılarıdır ve hataları standart `BaseSimpleResponse` formatında döndürür:

```typescript
// src/actions/auth/login.ts
export const loginAction = async (
  payload: LoginRequest,
): Promise<LoginResponse> => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  return res.json()
}
```

---

## Best Practices

### 1. ✅ Always Handle Errors

```typescript
// ❌ Bad
async function fetchData() {
  const response = await fetch('/api/data')
  return response.json()
}

// ✅ Good
async function fetchData() {
  try {
    const response = await fetch('/api/data')

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }

    return response.json()
  } catch (error) {
    console.error('Fetch failed:', error)
    throw error
  }
}
```

### 2. ✅ Provide User-Friendly Messages

```typescript
// ❌ Bad
throw new Error('ERR_NETWORK_FAILED_500')

// ✅ Good
throw new Error('Sunucuya bağlanılamadı. Lütfen tekrar deneyin.')
```

### 3. ✅ Log Errors in Production

```typescript
if (process.env.NODE_ENV === 'production') {
  // Send to Sentry, DataDog, etc.
  Sentry.captureException(error)
}
```

### 4. ✅ Clean Up on Error

```typescript
try {
  const handle = await openResource()
  await doSomething(handle)
} catch (error) {
  console.error(error)
  throw error
} finally {
  // Always clean up
  await closeResource()
}
```

### 5. ✅ Specific Error Types

```typescript
class ValidationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ValidationError'
  }
}

class NetworkError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'NetworkError'
  }
}

// Usage
try {
  // ...
} catch (error) {
  if (error instanceof ValidationError) {
    // Handle validation error
  } else if (error instanceof NetworkError) {
    // Handle network error
  } else {
    // Handle unknown error
  }
}
```

---

## Testing Error Handling

### Component Error Test

```typescript
// Throw error in component
function BuggyComponent() {
  throw new Error('Test error')
}

// Should be caught by ErrorBoundary
```

### API Error Test

```bash
# Test 400 error
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{}'

# Test rate limit (429)
for i in {1..65}; do
  curl http://localhost:3000/api/contact
done
```

---

## Monitoring & Alerts

### Sentry Integration (Recommended)

```bash
bun add @sentry/nextjs
```

```typescript
// instrumentation.ts
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./sentry.server.config')
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    await import('./sentry.edge.config')
  }
}
```

---

## Özet

| Error Type       | Handler                       | Dosya                              |
| ---------------- | ----------------------------- | ---------------------------------- |
| Component Errors | ErrorBoundary                 | `src/components/ErrorBoundary.tsx` |
| 404 Errors       | Custom 404 Page               | `src/pages/404.tsx`                |
| 500 Errors       | Custom 500 Page               | `src/pages/500.tsx`                |
| API Errors       | try/catch + `NextApiResponse` | `src/pages/api/*.ts`               |
| BFF Actions      | fetch `/api/auth/*`           | `src/actions/auth/*.ts`            |
| Client Fetch     | try/catch + state             | Components                         |

---

## Kaynaklar

- [Next.js Pages Router Error Handling](https://nextjs.org/docs/pages/building-your-application/routing/custom-error)
- [React Error Boundaries](https://react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)
- [MDN Error Handling](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling)
