/**
 * useScrollProgress
 * -----------------
 * Returns the page scroll progress as a value from 0 (top) to 1 (bottom).
 *
 * Used for:
 *  - Monochrome-to-color portrait transition in the Hero section
 *  - Navbar background opacity on scroll
 *  - Any value driven by page scroll position
 */

import { useState, useEffect } from 'react'

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      setProgress(docHeight > 0 ? Math.min(scrollTop / docHeight, 1) : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Set initial value
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return progress
}
