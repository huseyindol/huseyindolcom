import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

const SCROLL_THRESHOLD = 300

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-24 right-6 z-50 rounded-full bg-[var(--primary)] p-3 text-white shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Yukarı Kaydır"
    >
      <FaArrowUp />
    </button>
  )
}

ScrollToTop.displayName = 'ScrollToTop'
export default ScrollToTop
