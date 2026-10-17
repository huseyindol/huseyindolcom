import { useReportWebVitals } from 'next/web-vitals'
import { useCallback } from 'react'

interface WebVitalsMetric {
  id: string
  name: string
  value: number
  rating: 'good' | 'needs-improvement' | 'poor'
  delta: number
  navigationType: string
}

/**
 * Web Vitals Reporter Component
 * Tracks and reports Core Web Vitals metrics
 *
 * Metrics tracked:
 * - LCP (Largest Contentful Paint): Loading performance
 * - FID (First Input Delay): Interactivity
 * - CLS (Cumulative Layout Shift): Visual stability
 * - FCP (First Contentful Paint): First render
 * - TTFB (Time to First Byte): Server response time
 * - INP (Interaction to Next Paint): Responsiveness
 */
export function WebVitals() {
  useReportWebVitals(metric => {
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      logMetricToConsole(metric)
    }

    // Send to analytics in production
    if (process.env.NODE_ENV === 'production') {
      sendToAnalytics(metric)
    }
  })

  return null
}

/**
 * Log metric to console with color coding
 */
function logMetricToConsole(metric: WebVitalsMetric) {
  const colors = {
    good: '\x1b[32m', // Green
    'needs-improvement': '\x1b[33m', // Yellow
    poor: '\x1b[31m', // Red
    reset: '\x1b[0m',
  }

  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  }

  const threshold = thresholds[metric.name]
  let rating: 'good' | 'needs-improvement' | 'poor' = 'good'

  if (threshold) {
    if (metric.value > threshold.poor) {
      rating = 'poor'
    } else if (metric.value > threshold.good) {
      rating = 'needs-improvement'
    }
  }

  const color = colors[rating]
  const unit = metric.name === 'CLS' ? '' : 'ms'

  console.log(
    `${color}[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)}${unit} (${rating})${colors.reset}`,
  )
}

/**
 * Send metrics to analytics service
 */
function sendToAnalytics(metric: WebVitalsMetric) {
  // Send to Vercel Analytics (already integrated)
  // Additional custom analytics can be added here

  // Example: Send to Google Analytics
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = window.gtag as (
      command: string,
      action: string,
      params: Record<string, unknown>,
    ) => void
    gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(
        metric.name === 'CLS' ? metric.value * 1000 : metric.value,
      ),
      non_interaction: true,
    })
  }

  // Example: Send to custom endpoint
  // fetch('/api/analytics/vitals', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({
  //     metric: metric.name,
  //     value: metric.value,
  //     rating: metric.rating,
  //     id: metric.id,
  //     page: window.location.pathname,
  //     timestamp: Date.now(),
  //   }),
  // })
}

/**
 * Hook to get Web Vitals with callback
 */
export function useWebVitals(
  onReport?: (metric: WebVitalsMetric) => void,
): void {
  const handleReport = useCallback(
    (metric: WebVitalsMetric) => {
      logMetricToConsole(metric)
      onReport?.(metric)
    },
    [onReport],
  )

  useReportWebVitals(handleReport)
}

/**
 * Get rating for a metric value
 */
export function getMetricRating(
  name: string,
  value: number,
): 'good' | 'needs-improvement' | 'poor' {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
  }

  const threshold = thresholds[name]
  if (!threshold) return 'good'

  if (value > threshold.poor) return 'poor'
  if (value > threshold.good) return 'needs-improvement'
  return 'good'
}
