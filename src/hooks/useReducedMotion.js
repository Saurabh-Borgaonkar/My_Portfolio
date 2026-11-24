/**
 * useReducedMotion
 * ----------------
 * Reads the prefers-reduced-motion media query.
 * Returns true if the user has requested reduced motion.
 *
 * Used to:
 *  - Skip Lenis initialization
 *  - Skip GSAP intro animation
 *  - Disable Framer Motion variants
 *  - Use CSS fallback for the 3D hero scene
 */

import { useState, useEffect } from 'react'

export default function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Initialize synchronously to avoid a flash on first render
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const listener = (event) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', listener)
    return () => mediaQuery.removeEventListener('change', listener)
  }, [])

  return prefersReducedMotion
}
