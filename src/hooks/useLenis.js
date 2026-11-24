/**
 * useLenis
 * --------
 * Initializes Lenis smooth scroll and synchronizes it with GSAP ScrollTrigger.
 *
 * Rules:
 *  - Lenis is NOT initialized when the user prefers reduced motion.
 *  - GSAP ticker drives Lenis's RAF loop (not requestAnimationFrame directly).
 *  - Cleanup removes the ticker callback and destroys the Lenis instance.
 *
 * @param {boolean} prefersReducedMotion - From useReducedMotion().
 * @returns {React.RefObject} - Ref to the Lenis instance (null if not active).
 */

import { useRef, useEffect } from 'react'
import Lenis from 'lenis'
import { syncLenisWithScrollTrigger } from '../animations/gsap.config.js'

export default function useLenis(prefersReducedMotion = false) {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Sync Lenis with GSAP ScrollTrigger — returns a cleanup function
    const cleanupSync = syncLenisWithScrollTrigger(lenis)

    return () => {
      cleanupSync()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [prefersReducedMotion])

  return lenisRef
}
