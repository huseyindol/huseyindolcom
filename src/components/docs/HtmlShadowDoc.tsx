import React, { useEffect, useRef } from 'react'

interface HtmlShadowDocProps {
  url: string
  scripts?: string[]
}

const HtmlShadowDoc = ({ url, scripts = [] }: HtmlShadowDocProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const shadow =
      containerRef.current.shadowRoot ||
      containerRef.current.attachShadow({ mode: 'open' })
    shadow.innerHTML =
      '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#555;font-family:sans-serif;">Yükleniyor...</div>'

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.text()
      })
      .then(html => {
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')

        // Clear shadow root
        shadow.innerHTML = ''

        // Port styles from <head> to shadow root
        const styles = doc.querySelectorAll('style, link[rel="stylesheet"]')
        styles.forEach(s => shadow.appendChild(s.cloneNode(true)))

        // Port body content
        const bodyContent = document.createElement('div')
        bodyContent.style.width = '100%'
        bodyContent.style.height = '100%'
        bodyContent.innerHTML = doc.body.innerHTML
        shadow.appendChild(bodyContent)

        // Load scripts to main document (custom elements registration is global)
        scripts.forEach(src => {
          if (!document.querySelector(`script[src="${src}"]`)) {
            const script = document.createElement('script')
            script.src = src
            script.async = true
            document.head.appendChild(script)
          }
        })
      })
      .catch(err => {
        console.error('HtmlShadowDoc error:', err)
        shadow.innerHTML = `<div style="padding:20px;color:#ef4444;font-family:sans-serif;">Döküman yüklenirken hata oluştu: ${err.message}</div>`
      })
  }, [url, scripts])

  return (
    <div
      ref={containerRef}
      className="h-[calc(100vh-120px)] min-h-[600px] w-full overflow-hidden rounded-xl border border-border bg-[#0d0e12] shadow-2xl"
    />
  )
}

export default HtmlShadowDoc
