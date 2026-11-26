/**
 * Section Entrance Animations
 * ----------------------------
 * Reusable GSAP + ScrollTrigger entrance helpers for portfolio sections.
 * Individual animations are created per section in Stages 6–11.
 *
 * Usage:
 *   import { fadeUpOnScroll, staggerOnScroll } from '@/animations/entrance.animation.js'
 *
 *   useEffect(() => {
 *     const cleanup = fadeUpOnScroll(containerRef.current)
 *     return cleanup
 *   }, [])
 */

import { gsap, ScrollTrigger } from './gsap.config.js'

/**
 * Fades and slides an element up when it enters the viewport.
 *
 * @param {Element|string} target - DOM element or GSAP selector string.
 * @param {Object} options
 * @param {number} options.y          - Starting Y offset in px. Default 40.
 * @param {number} options.duration   - Animation duration in seconds. Default 0.8.
 * @param {string} options.start      - ScrollTrigger start. Default 'top 85%'.
 * @param {number} options.delay      - Animation delay in seconds. Default 0.
 * @returns {() => void} Cleanup function.
 */
export function fadeUpOnScroll(target, options = {}) {
  const {
    y = 40,
    duration = 0.8,
    start = 'top 85%',
    delay = 0,
  } = options

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start,
      toggleActions: 'play reverse play reverse',
    },
  })

  tl.fromTo(
    target,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease: 'power3.out' }
  )

  return () => {
    tl.kill()
    ScrollTrigger.getAll()
      .filter((st) => st.trigger === target)
      .forEach((st) => st.kill())
  }
}

/**
 * Staggers a list of child elements into view on scroll.
 *
 * @param {Element|string} parent     - Parent container.
 * @param {string}         childSelector - CSS selector for children.
 * @param {Object}         options
 * @returns {() => void} Cleanup function.
 */
export function staggerOnScroll(parent, childSelector, options = {}) {
  const {
    y = 30,
    duration = 0.6,
    stagger = 0.1,
    start = 'top 80%',
  } = options

  const children = parent.querySelectorAll(childSelector)

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: parent,
      start,
      toggleActions: 'play reverse play reverse',
    },
  })

  tl.fromTo(
    children,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, stagger, ease: 'power3.out' }
  )

  return () => {
    tl.kill()
    ScrollTrigger.getAll()
      .filter((st) => st.trigger === parent)
      .forEach((st) => st.kill())
  }
}
