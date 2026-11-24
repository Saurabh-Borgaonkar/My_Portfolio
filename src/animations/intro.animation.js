/**
 * Intro Animation — Stage 5A
 * ---------------------------
 * Cinematic + Futuristic Signature Brand Introduction (~5.0–5.2s total).
 * Purely visual-only transition — no sound effect words or gimmick text.
 *
 * Storyboard:
 *  - Scene 1 (0.0s – 1.0s): System Initialization (Obsidian canvas, emerald laser sweep, digital grid, telemetry)
 *  - Scene 2 (1.0s – 2.2s): Identity Reveal ("SAURABH." staggered character reveal with emerald glow)
 *  - Scene 3 (2.2s – 3.8s): Engineering Identity ("ENGINEERING THE FUTURE." with kinetic typography & rotating geometry)
 *  - Scene 4 (3.8s – 4.5s): Purely Visual Cinematic Transition:
 *     - Cinematic emerald light burst
 *     - Expanding geometric shapes & concentric energy rings
 *     - Quick radial energy wave
 *     - Subtle screen-wide light sweep
 *     - Seamless scale and depth transition
 *  - Scene 5 (4.5s – 5.2s): Portfolio Reveal ("ENGINEERING THE BACKEND." impact settle, live portfolio interactive)
 *
 * Controls:
 *  - Full keyboard accessibility (ESC) & visible Skip Intro button.
 *  - In-memory session tracking (plays on refresh/reopen, skips on SPA router navigation).
 *  - prefers-reduced-motion skips animation instantly.
 */

import { gsap } from './gsap.config.js'

// In-memory runtime session flag (resets on refresh / reopen, persists during SPA navigation)
let hasPlayedInCurrentSession = false

export function getHasPlayedIntro() {
  return hasPlayedInCurrentSession
}

export function setHasPlayedIntro(value) {
  hasPlayedInCurrentSession = value
}

/**
 * Builds and executes the ~5-second cinematic signature intro.
 *
 * @param {Object} targets - References to DOM elements.
 * @param {Object} options - { onComplete, skipIntro }
 * @returns {gsap.core.Timeline}
 */
export function playSignatureIntro(targets, { onComplete, skipIntro = false } = {}) {
  const {
    overlay,
    grid,
    lightSweep,
    sysTelemetry,
    scene2Container,
    scene2Letters,
    scene3Container,
    scene3Line1,
    scene3Line2,
    geoRing,
    geoPulseRing,
    emeraldGlow,
    shockwave,
    radialEnergyWave,
    burstFlash,
    transitionSweep,
    heroHeadline,
    skipBtn,
  } = targets

  const tl = gsap.timeline({
    defaults: { ease: 'power3.out' },
    onComplete: () => {
      setHasPlayedIntro(true)
      if (overlay) gsap.set(overlay, { display: 'none' })
      if (onComplete) onComplete()
    },
  })

  // Instant skip for internal navigation or reduced motion
  if (skipIntro) {
    setHasPlayedIntro(true)
    if (overlay) gsap.set(overlay, { opacity: 0, display: 'none' })
    if (onComplete) onComplete()
    return tl
  }

  // ── Initial State Preparation ──────────────────────────────────────────────
  gsap.set(overlay, { opacity: 1, display: 'flex' })
  gsap.set(grid, { opacity: 0 })
  gsap.set(lightSweep, { xPercent: -120, opacity: 0 })
  gsap.set(sysTelemetry, { opacity: 0, y: -10 })
  gsap.set(scene2Container, { opacity: 1, display: 'flex' })
  gsap.set(scene2Letters, { opacity: 0, y: 35, scale: 0.92 })
  gsap.set(scene3Container, { opacity: 0, display: 'none' })
  gsap.set(scene3Line1, { opacity: 0, y: 30 })
  gsap.set(scene3Line2, { opacity: 0, y: 30 })
  gsap.set(geoRing, { opacity: 0, scale: 0.7, rotation: 0 })
  if (geoPulseRing) gsap.set(geoPulseRing, { opacity: 0, scale: 0.4 })
  gsap.set(emeraldGlow, { opacity: 0, scale: 0.7 })
  gsap.set(shockwave, { opacity: 0, scale: 0.2 })
  if (radialEnergyWave) gsap.set(radialEnergyWave, { opacity: 0, scale: 0.3 })
  gsap.set(burstFlash, { opacity: 0, scale: 0.5 })
  if (transitionSweep) gsap.set(transitionSweep, { xPercent: -120, opacity: 0 })
  if (skipBtn) gsap.set(skipBtn, { opacity: 0, y: -10 })

  // ── Scene 1: System Initialization (0.0s – 1.0s) ───────────────────────────

  // 0.1s: Skip button appears softly
  if (skipBtn) {
    tl.to(skipBtn, { opacity: 1, y: 0, duration: 0.5 }, 0.1)
  }

  // 0.1s – 0.5s: Digital grid powers on
  tl.to(grid, { opacity: 0.2, duration: 0.6, ease: 'sine.out' }, 0.1)

  // 0.15s – 0.6s: Telemetry status text flickers in
  tl.to(sysTelemetry, { opacity: 0.8, y: 0, duration: 0.4 }, 0.15)

  // 0.1s – 0.95s: Emerald laser/light sweep scans across screen
  tl.to(lightSweep, { opacity: 0.9, duration: 0.2 }, 0.1)
  tl.to(lightSweep, { xPercent: 120, duration: 0.85, ease: 'power2.inOut' }, 0.1)
  tl.to(lightSweep, { opacity: 0, duration: 0.25 }, 0.75)

  // 0.4s – 1.0s: Center emerald ambient glow begins warming
  tl.to(emeraldGlow, { opacity: 0.45, scale: 1.05, duration: 0.6, ease: 'sine.out' }, 0.4)

  // 0.85s: System telemetry dissolves
  tl.to(sysTelemetry, { opacity: 0, y: -8, duration: 0.25 }, 0.85)

  // ── Scene 2: Identity Reveal — "SAURABH." (1.0s – 2.2s) ───────────────────

  // 1.0s – 1.8s: Staggered letter reveal for "SAURABH."
  tl.to(
    scene2Letters,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.07,
      duration: 0.55,
      ease: 'power3.out',
    },
    1.0
  )

  // 1.2s – 2.0s: Ambient backlight intensifies behind name
  tl.to(emeraldGlow, { opacity: 0.7, scale: 1.2, duration: 0.8, ease: 'sine.inOut' }, 1.2)

  // 2.0s – 2.25s: SAURABH. elevates and gracefully transitions out
  tl.to(
    scene2Container,
    {
      opacity: 0,
      y: -25,
      scale: 1.04,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        gsap.set(scene2Container, { display: 'none' })
        gsap.set(scene3Container, { display: 'flex' })
      },
    },
    2.05
  )

  // ── Scene 3: Engineering Identity — "ENGINEERING THE FUTURE." (2.2s – 3.8s) ─

  // 2.25s: Switch to Scene 3
  tl.to(scene3Container, { opacity: 1, duration: 0.15 }, 2.25)

  // Geometric abstract ring emerges and spins smoothly
  tl.to(geoRing, { opacity: 0.35, scale: 1.0, duration: 0.7, ease: 'power2.out' }, 2.25)
  tl.to(geoRing, { rotation: 90, duration: 1.55, ease: 'none' }, 2.25)

  // 2.3s – 2.9s: Bold kinetic reveal of "ENGINEERING"
  tl.to(
    scene3Line1,
    {
      opacity: 1,
      y: 0,
      duration: 0.55,
      ease: 'power3.out',
    },
    2.3
  )

  // 2.5s – 3.1s: Bold reveal of "THE FUTURE." with emerald bloom
  tl.to(
    scene3Line2,
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power3.out',
    },
    2.5
  )

  // 2.8s – 3.7s: Visual energy builds with breathing lighting & rotation
  tl.to(emeraldGlow, { opacity: 0.9, scale: 1.35, duration: 0.9, ease: 'sine.inOut' }, 2.7)

  // 3.65s – 3.85s: Energy compression right before detonation
  tl.to(scene3Container, { scale: 1.05, duration: 0.2, ease: 'power2.in' }, 3.65)

  // ── Scene 4: Purely Visual Cinematic Transition (3.85s – 4.5s) ─────────────

  // 1. Cinematic emerald light burst
  tl.to(
    burstFlash,
    {
      opacity: 0.9,
      scale: 2.4,
      duration: 0.22,
      ease: 'power3.out',
    },
    3.85
  )
  tl.to(
    burstFlash,
    {
      opacity: 0,
      scale: 3.8,
      duration: 0.4,
      ease: 'power3.inOut',
    },
    4.07
  )

  // 2. Expanding concentric geometric energy shapes
  if (geoPulseRing) {
    tl.to(
      geoPulseRing,
      {
        opacity: 0.8,
        scale: 1.8,
        rotation: 45,
        duration: 0.25,
        ease: 'power2.out',
      },
      3.85
    )
    tl.to(
      geoPulseRing,
      {
        opacity: 0,
        scale: 3.6,
        rotation: 90,
        duration: 0.4,
        ease: 'power3.inOut',
      },
      4.1
    )
  }

  // 3. Quick radial energy wave
  tl.to(
    shockwave,
    {
      opacity: 0.95,
      scale: 1.8,
      duration: 0.25,
      ease: 'power2.out',
    },
    3.85
  )
  tl.to(
    shockwave,
    {
      opacity: 0,
      scale: 4.4,
      duration: 0.45,
      ease: 'power3.inOut',
    },
    4.1
  )

  if (radialEnergyWave) {
    tl.to(
      radialEnergyWave,
      {
        opacity: 0.75,
        scale: 2.0,
        duration: 0.28,
        ease: 'power2.out',
      },
      3.9
    )
    tl.to(
      radialEnergyWave,
      {
        opacity: 0,
        scale: 4.8,
        duration: 0.45,
        ease: 'power3.inOut',
      },
      4.18
    )
  }

  // 4. Subtle screen-wide light sweep across the transition
  if (transitionSweep) {
    tl.to(
      transitionSweep,
      {
        opacity: 0.8,
        duration: 0.15,
      },
      3.85
    )
    tl.to(
      transitionSweep,
      {
        xPercent: 120,
        duration: 0.65,
        ease: 'power2.inOut',
      },
      3.85
    )
    tl.to(
      transitionSweep,
      {
        opacity: 0,
        duration: 0.25,
      },
      4.25
    )
  }

  // 5. Smooth scale and depth transition: text dissolves into optical energy
  tl.to(
    scene3Container,
    {
      opacity: 0,
      scale: 1.26,
      filter: 'blur(14px)',
      duration: 0.4,
      ease: 'power3.in',
    },
    3.85
  )

  // Geometric ring expands with energy
  tl.to(geoRing, { opacity: 0, scale: 1.6, duration: 0.35 }, 3.9)

  // Skip button smoothly fades out
  if (skipBtn) {
    tl.to(skipBtn, { opacity: 0, duration: 0.25 }, 3.85)
  }

  // 6. Dark overlay curtain dissolves to reveal the actual hero
  tl.to(
    overlay,
    {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
    },
    4.0
  )

  // ── Scene 5: Portfolio Reveal — "ENGINEERING THE BACKEND." (4.5s – 5.2s) ───

  if (heroHeadline) {
    tl.fromTo(
      heroHeadline,
      { scale: 1.05, filter: 'drop-shadow(0 0 45px rgba(16,185,129,0.55))' },
      {
        scale: 1,
        filter: 'drop-shadow(0 0 0px rgba(16,185,129,0))',
        duration: 0.65,
        ease: 'power3.out',
      },
      4.15
    )
  }

  return tl
}
