/**
 * GSAP Configuration
 * ------------------
 * - Registers GSAP plugins at module load time (runs once).
 * - Exports syncLenisWithScrollTrigger() for frame-perfect Lenis ↔ ScrollTrigger sync.
 * - Import this module before creating any GSAP animations or ScrollTriggers.
 */

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

// Register plugins once at module level
gsap.registerPlugin(ScrollTrigger)

/**
 * Synchronizes a Lenis smooth-scroll instance with GSAP ScrollTrigger.
 *
 * How it works:
 *  1. GSAP ticker drives Lenis's RAF loop — single, coordinated frame budget.
 *  2. lagSmoothing(0) prevents GSAP from "catching up" on missed frames,
 *     which would fight Lenis's easing and cause judder.
 *  3. lenis.on('scroll') calls ScrollTrigger.update() so trigger positions
 *     are recalculated based on Lenis's virtual scroll position.
 *
 * @param {import('lenis').default} lenis - An initialized Lenis instance.
 * @returns {() => void} Cleanup function — call on component unmount.
 */
export function syncLenisWithScrollTrigger(lenis) {
  // Named callbacks so they can be removed precisely during cleanup
  const rafCallback = (time) => {
    // GSAP ticker time is in seconds; Lenis.raf() expects milliseconds
    lenis.raf(time * 1000)
  }

  const scrollUpdateCallback = () => {
    ScrollTrigger.update()
  }

  // Drive Lenis from GSAP's ticker instead of requestAnimationFrame
  gsap.ticker.add(rafCallback)

  // Disable GSAP's lag smoothing — it conflicts with Lenis's smooth easing
  gsap.ticker.lagSmoothing(0)

  // Keep ScrollTrigger in sync with every Lenis scroll event
  lenis.on('scroll', scrollUpdateCallback)

  // Return cleanup function for useEffect teardown
  return () => {
    gsap.ticker.remove(rafCallback)
    lenis.off('scroll', scrollUpdateCallback)
  }
}

export { gsap, ScrollTrigger }
