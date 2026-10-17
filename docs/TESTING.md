# Testing Guide

Bu projede kullanılan test stratejileri ve best practices.

## 🧪 Test Stack

- **Test Framework:** [Vitest](https://vitest.dev/)
- **Testing Library:** [@testing-library/react](https://testing-library.com/react)
- **Coverage:** Vitest Coverage (v8)
- **Mocking:** Vitest built-in mocks
- **CI/CD:** GitHub Actions

---

## 📋 İçindekiler

1. [Kurulum](#kurulum)
2. [Test Çalıştırma](#test-çalıştırma)
3. [Test Yazma](#test-yazma)
4. [Coverage](#coverage)
5. [CI/CD Integration](#cicd-integration)
6. [Best Practices](#best-practices)

---

## Kurulum

### 1. Dependencies Yükleme

```bash
bun install
```

### 2. Test Çalıştırma

```bash
# Tüm testleri çalıştır
bun test

# Watch mode (değişiklikleri izle)
bun test:watch

# UI ile test çalıştır
bun test:ui

# Coverage raporu oluştur
bun test:coverage

# CI için test çalıştır
bun test:ci
```

---

## Test Çalıştırma

### Watch Mode (Geliştirme)

```bash
bun test:watch
```

**Özellikler:**

- ✅ Dosya değişikliklerini otomatik izler
- ✅ Sadece değişen testleri çalıştırır
- ✅ Hızlı geri bildirim

### Single Run (CI/CD)

```bash
bun test:run
```

**Kullanım:**

- ✅ CI/CD pipeline'larında
- ✅ Pre-commit hooks'larında
- ✅ Production build öncesi

### Coverage Report

```bash
bun test:coverage
```

**Çıktılar:**

- `coverage/index.html` - HTML rapor
- `coverage/coverage-final.json` - JSON rapor
- Terminal'de özet rapor

---

## Test Yazma

### Component Tests

```typescript
// tests/components/Button.test.tsx
import { Button } from '@/components/ui/button'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('Button Component', () => {
  it('should render button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should call onClick when clicked', () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Library/Utility Tests

```typescript
// tests/lib/rate-limiter.test.ts
import { RateLimiter } from '@/lib/rate-limiter'
import { describe, expect, it, beforeEach } from 'vitest'

describe('RateLimiter', () => {
  let rateLimiter: RateLimiter

  beforeEach(() => {
    rateLimiter = new RateLimiter({
      windowMs: 1000,
      max: 3,
    })
  })

  it('should allow requests within limit', async () => {
    const result = await rateLimiter.check('test-ip')
    expect(result.success).toBe(true)
  })

  it('should block requests exceeding limit', async () => {
    await rateLimiter.check('test-ip')
    await rateLimiter.check('test-ip')
    await rateLimiter.check('test-ip')

    const result = await rateLimiter.check('test-ip')
    expect(result.success).toBe(false)
  })
})
```

### API Route Tests (`src/pages/api/`)

```typescript
// tests/api/contact.test.ts
import handler from '@/pages/api/contact'
import { createApiMocks } from '@tests/utils/test-utils'
import { describe, expect, it } from 'vitest'

describe('Contact API', () => {
  it('should return 400 for missing fields', async () => {
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: {},
    })

    await handler(req, res)
    expect(state.statusCode).toBe(400)
  })

  it('should return 200 for valid request', async () => {
    const { req, res, state } = createApiMocks({
      method: 'POST',
      body: {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message',
      },
    })

    await handler(req, res)
    expect(state.statusCode).toBe(200)
  })
})
```

### Custom Hooks Tests

```typescript
// tests/hooks/useScrollHeader.test.ts
import { renderHook, act } from '@testing-library/react'
import { useScrollHeader } from '@/utils/hooks'
import { describe, expect, it } from 'vitest'

describe('useScrollHeader', () => {
  it('should return false initially', () => {
    const { result } = renderHook(() => useScrollHeader())
    expect(result.current).toBe(false)
  })

  it('should return true when scrolled', () => {
    const { result } = renderHook(() => useScrollHeader(10))

    act(() => {
      window.scrollY = 20
      window.dispatchEvent(new Event('scroll'))
    })

    expect(result.current).toBe(true)
  })
})
```

---

## Coverage

### Coverage Thresholds

```typescript
// vitest.config.ts
coverage: {
  thresholds: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70
  }
}
```

### Coverage Reports

```bash
# HTML rapor oluştur ve aç
bun test:coverage
open coverage/index.html
```

### Coverage Badge

```markdown
![Coverage](https://codecov.io/gh/username/repo/branch/main/graph/badge.svg)
```

---

## CI/CD Integration

### GitHub Actions

**Dosya:** `.github/workflows/ci.yml`

```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1

      - name: Install dependencies
        run: bun install --frozen-lockfile

      - name: Run tests
        run: bun run test:ci

      - name: Upload coverage
        uses: codecov/codecov-action@v4
```

### Pre-commit Hook

```bash
# .husky/pre-commit
bunx lint-staged
bun run test:run
```

---

## Best Practices

### 1. ✅ Test Naming

```typescript
// ❌ Bad
it('test 1', () => { ... })

// ✅ Good
it('should render error message when validation fails', () => { ... })
```

### 2. ✅ Arrange-Act-Assert Pattern

```typescript
it('should increment counter', () => {
  // Arrange
  const { result } = renderHook(() => useCounter())

  // Act
  act(() => {
    result.current.increment()
  })

  // Assert
  expect(result.current.count).toBe(1)
})
```

### 3. ✅ Test One Thing

```typescript
// ❌ Bad - Testing multiple things
it('should handle everything', () => {
  // Testing rendering
  render(<Button />)

  // Testing click
  fireEvent.click(...)

  // Testing disabled state
  expect(...).toBeDisabled()
})

// ✅ Good - Separate tests
describe('Button', () => {
  it('should render correctly', () => { ... })
  it('should handle click events', () => { ... })
  it('should be disabled when prop is true', () => { ... })
})
```

### 4. ✅ Use Test Utilities

```typescript
// tests/utils/test-utils.tsx
import { render } from '@testing-library/react'

function customRender(ui: ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: ({ children }) => (
      <Providers>{children}</Providers>
    ),
    ...options
  })
}

export { customRender as render }
```

### 5. ✅ Mock External Dependencies

```typescript
// Mock Next.js Pages Router
vi.mock('next/router', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    pathname: '/',
    asPath: '/',
    query: {},
  }),
}))

// Mock API calls
vi.mock('@/lib/api', () => ({
  fetchData: vi.fn().mockResolvedValue({ data: 'test' }),
}))
```

### 6. ✅ Clean Up After Tests

```typescript
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
```

### 7. ✅ Test Edge Cases

```typescript
describe('Input Validation', () => {
  it('should handle empty input', () => { ... })
  it('should handle very long input', () => { ... })
  it('should handle special characters', () => { ... })
  it('should handle whitespace', () => { ... })
})
```

---

## Test Organization

```
tests/
├── setup.ts                    # Test setup and global mocks
├── utils/
│   └── test-utils.tsx         # Custom render and utilities (createApiMocks)
├── components/
│   ├── ErrorBoundary.test.tsx
│   ├── Hero.test.tsx
│   └── ScrollToTop.test.tsx
├── lib/
│   ├── rate-limiter.test.ts
│   └── security.test.ts
├── api/
│   ├── contact.test.ts
│   └── revalidate.test.ts
├── pages/
│   ├── about.test.tsx
│   └── blog-slug.test.tsx
└── hooks/
    └── useScrollHeader.test.ts
```

---

## Debugging Tests

### 1. Debug in VS Code

```json
// .vscode/launch.json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "runtimeExecutable": "bun",
      "runtimeArgs": ["test", "--run"],
      "console": "integratedTerminal"
    }
  ]
}
```

### 2. Console.log in Tests

```typescript
it('should work', () => {
  const result = myFunction()
  console.log('Result:', result)
  expect(result).toBe(expected)
})
```

### 3. Use screen.debug()

```typescript
it('should render', () => {
  render(<Component />)
  screen.debug() // Prints DOM tree
})
```

---

## Common Issues

### Issue 1: Next.js Mocks Not Working

**Solution:**

```typescript
// tests/setup.ts
vi.mock('next/router', () => ({
  useRouter: () => ({ push: vi.fn(), pathname: '/', asPath: '/', query: {} }),
}))
```

### Issue 2: Environment Variables

**Solution:**

```typescript
// tests/setup.ts
beforeAll(() => {
  process.env.NEXT_PUBLIC_HOST = 'http://localhost:3000'
})
```

### Issue 3: Window Not Defined

**Solution:**

```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
})
```

---

## Test Statistics

Current test coverage:

```
File                   | % Stmts | % Branch | % Funcs | % Lines
-----------------------|---------|----------|---------|--------
All files              |   75.5  |   68.2   |   72.1  |   76.3
 components/           |   82.3  |   75.4   |   80.1  |   83.2
 lib/                  |   88.7  |   82.1   |   85.3  |   89.1
 api/                  |   65.2  |   58.9   |   62.4  |   66.1
```

---

## Useful Commands

```bash
# Run specific test file
bun test rate-limiter

# Run tests matching pattern
bun test --grep "RateLimiter"

# Update snapshots
bun test -u

# Show test coverage in browser
bun test:coverage && open coverage/index.html

# Run tests with verbose output
bun test --reporter=verbose

# Run tests in specific file only
bun test tests/components/Hero.test.tsx
```

---

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library](https://testing-library.com/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Test Driven Development](https://martinfowler.com/bliki/TestDrivenDevelopment.html)

---

## Troubleshooting

### Tests Running Slow?

1. Use `--no-coverage` for faster runs
2. Run only changed tests with `--changed`
3. Use `--run` instead of watch mode

### Mock Not Working?

1. Check mock is defined before import
2. Use `vi.clearAllMocks()` in `afterEach`
3. Verify mock path is correct

### Coverage Not Accurate?

1. Check `coverage.exclude` in `vitest.config.ts`
2. Ensure all test files are in `tests/` directory
3. Run `bun test:coverage` with `--reporter=verbose`

---

**Oluşturma Tarihi:** 2024-12-15  
**Versiyon:** 1.0.0  
**Status:** ✅ Tamamlandı
