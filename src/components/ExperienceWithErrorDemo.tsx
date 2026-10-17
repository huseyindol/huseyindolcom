import { ErrorBoundary } from '@/components/ErrorBoundary'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertTriangle, Building, Calendar, MapPin } from 'lucide-react'
import { useState } from 'react'

/**
 * 🎯 ERROR BOUNDARY DEMO COMPONENT
 * Bu component, ErrorBoundary'nin nasıl çalıştığını göstermek için hazırlanmıştır.
 */

// Farklı hata tipleri
enum ErrorType {
  NONE = 'none',
  RENDER_ERROR = 'render',
  NULL_REFERENCE = 'null',
  ASYNC_ERROR = 'async',
  NETWORK_ERROR = 'network',
}

const mockExperiences = [
  {
    id: 1,
    company: 'Tech Company',
    position: 'Senior Developer',
    period: '2023 - Günümüz',
    location: 'İstanbul',
    industry: 'Tech',
  },
  {
    id: 2,
    company: 'Another Company',
    position: 'Developer',
    period: '2020 - 2023',
    location: 'İstanbul',
    industry: 'Tech',
  },
]

// Experience Card Component
function ExperienceCard({ exp }: { exp: (typeof mockExperiences)[0] }) {
  const [errorType, setErrorType] = useState<ErrorType>(ErrorType.NONE)

  // 🔴 Hata Fırlatma Senaryoları
  if (errorType === ErrorType.RENDER_ERROR) {
    throw new Error(`🚨 Render Error: ${exp.company} kartında hata oluştu!`)
  }

  if (errorType === ErrorType.NULL_REFERENCE) {
    // @ts-expect-error - Intentional error for testing
    const result = exp.nonExistentProperty.someMethod()
    return <div>{result}</div>
  }

  if (errorType === ErrorType.ASYNC_ERROR) {
    throw new Error('🚨 Async Error: API çağrısı başarısız!')
  }

  return (
    <Card className="p-6">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="mb-2 text-xl font-bold text-primary">
            {exp.position}
          </h3>
          <div className="mb-2 flex flex-wrap gap-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Building className="h-4 w-4" />
              <span>{exp.company}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{exp.period}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{exp.location}</span>
            </div>
          </div>
          <Badge variant="secondary">{exp.industry}</Badge>
        </div>
      </div>

      {/* 🧪 Test Butonları */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-4 space-y-2 rounded-lg border border-orange-300 bg-orange-50 p-3 dark:border-orange-800 dark:bg-orange-950">
          <p className="mb-2 flex items-center gap-2 text-xs font-semibold text-orange-600 dark:text-orange-400">
            <AlertTriangle className="h-3 w-3" />
            Test Hataları (Bu kartı kıracak)
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setErrorType(ErrorType.RENDER_ERROR)}
            >
              Render Error
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setErrorType(ErrorType.NULL_REFERENCE)}
            >
              Null Reference
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => setErrorType(ErrorType.ASYNC_ERROR)}
            >
              Async Error
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

// Custom Error Fallback
function CustomErrorFallback({ error }: { error: Error }) {
  return (
    <Card className="bg-destructive/5 border-destructive p-6">
      <div className="flex items-start gap-3">
        <AlertTriangle className="h-6 w-6 flex-shrink-0 text-destructive" />
        <div className="flex-1">
          <h3 className="mb-2 text-lg font-bold text-destructive">
            Bu Kart Hata Verdi!
          </h3>
          <p className="mb-3 text-sm text-muted-foreground">
            ErrorBoundary bu hatayı yakaladı ve özel bir UI gösteriyor.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="rounded bg-muted p-2">
              <summary className="cursor-pointer text-xs font-semibold">
                Hata Detayları
              </summary>
              <pre className="mt-2 overflow-auto text-xs">{error.message}</pre>
            </details>
          )}
        </div>
      </div>
    </Card>
  )
}

// Ana Component
export default function ExperienceWithErrorDemo() {
  const [globalError, setGlobalError] = useState(false)

  // 🔴 Global Error (Tüm component'i kıracak)
  if (globalError) {
    throw new Error('🚨 Global Error: Tüm Experience section hatası!')
  }

  return (
    <section id="experience-demo" className="bg-muted/30 py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <h2 className="text-gradient mb-4 text-4xl font-bold">
            🧪 ErrorBoundary Demo
          </h2>
          <p className="mb-6 text-lg text-muted-foreground">
            Bu bölümde ErrorBoundary'nin nasıl çalıştığını test edebilirsiniz
          </p>

          {/* 🔴 Global Error Button */}
          {process.env.NODE_ENV === 'development' && (
            <Card className="border-destructive/50 mx-auto max-w-2xl p-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-6 w-6 flex-shrink-0 text-destructive" />
                <div className="flex-1 text-left">
                  <h3 className="mb-2 font-bold">
                    🚨 Global Error (Tüm Section)
                  </h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Bu butona tıklarsan tüm Experience section'ı kıracak ve
                    page.tsx'teki ErrorBoundary devreye girecek!
                  </p>
                  <Button
                    variant="destructive"
                    onClick={() => setGlobalError(true)}
                    className="w-full sm:w-auto"
                  >
                    💥 Global Error Fırlat
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        <div className="mx-auto max-w-4xl space-y-6">
          <h3 className="mb-4 text-xl font-semibold">
            💡 Scenario 1: ErrorBoundary Olmadan
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Bu kartlar ErrorBoundary ile SARILI DEĞİL. Hata olursa tüm sayfa
            kırılır.
          </p>

          {/* WITHOUT ErrorBoundary */}
          <div className="space-y-4 rounded-lg border-2 border-dashed border-red-500 p-4">
            <Badge variant="destructive">❌ ErrorBoundary YOK</Badge>
            <ExperienceCard exp={mockExperiences[0]} />
          </div>

          <h3 className="mb-4 mt-12 text-xl font-semibold">
            💚 Scenario 2: ErrorBoundary İle (Her Kart Ayrı)
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Her kart kendi ErrorBoundary'si ile sarılı. Bir kart hata verse
            diğeri çalışmaya devam eder.
          </p>

          {/* WITH Individual ErrorBoundary */}
          <div className="space-y-4 rounded-lg border-2 border-dashed border-green-500 p-4">
            <Badge variant="default">✅ Her Kart Ayrı ErrorBoundary</Badge>

            <ErrorBoundary
              fallback={<CustomErrorFallback error={new Error('Card 1')} />}
            >
              <ExperienceCard exp={mockExperiences[0]} />
            </ErrorBoundary>

            <ErrorBoundary
              fallback={<CustomErrorFallback error={new Error('Card 2')} />}
            >
              <ExperienceCard exp={mockExperiences[1]} />
            </ErrorBoundary>
          </div>

          <h3 className="mb-4 mt-12 text-xl font-semibold">
            💙 Scenario 3: Tek ErrorBoundary (Tüm Liste)
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Tüm liste tek ErrorBoundary ile sarılı. Bir kart hata verse tüm
            liste gider.
          </p>

          {/* WITH Single ErrorBoundary */}
          <div className="rounded-lg border-2 border-dashed border-blue-500 p-4">
            <Badge variant="default" className="mb-4">
              ✅ Tek ErrorBoundary (Tüm Liste)
            </Badge>
            <ErrorBoundary>
              <div className="space-y-4">
                <ExperienceCard exp={mockExperiences[0]} />
                <ExperienceCard exp={mockExperiences[1]} />
              </div>
            </ErrorBoundary>
          </div>
        </div>

        {/* Açıklama */}
        <Card className="mx-auto mt-12 max-w-4xl p-6">
          <h3 className="mb-4 text-lg font-bold">📚 ErrorBoundary Notları</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>
              ✅ <strong>ErrorBoundary ile:</strong> Hata olan kısım fallback UI
              gösterir, diğerleri çalışmaya devam eder
            </li>
            <li>
              ❌ <strong>ErrorBoundary olmadan:</strong> Bir hata tüm sayfayı
              kırar
            </li>
            <li>
              💡 <strong>Strateji:</strong> Kritik component'leri ayrı ayrı
              ErrorBoundary ile sarın
            </li>
            <li>
              🎯 <strong>Production:</strong> Test butonları sadece development
              ortamında görünür
            </li>
          </ul>
        </Card>
      </div>
    </section>
  )
}
