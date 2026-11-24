/**
 * HeroSection
 * -----------
 * Stage 5A — Cinematic + Futuristic Signature Intro (~5.0–5.2s).
 * Purely visual-only transition — no sound effect words or gimmick text.
 *
 * Storyboard:
 *  - Scene 1 (0–1s): System Initialization (Obsidian canvas, emerald laser sweep, digital grid, telemetry)
 *  - Scene 2 (1–2.2s): Identity Reveal ("SAURABH." staggered character reveal with emerald glow)
 *  - Scene 3 (2.2–3.8s): Engineering Identity ("ENGINEERING THE FUTURE." with bold kinetic typography & rotating geometry)
 *  - Scene 4 (3.8–4.5s): Purely Visual Transition (emerald light burst, radial energy waves, geometric expansion, light sweep)
 *  - Scene 5 (4.5–5.5s): Portfolio Reveal ("ENGINEERING THE BACKEND." impact settle, live portfolio interactive)
 *
 * Requirements Met:
 *  - Complete portfolio content (Headline, Portrait, CTAs, Stats) rendered immediately underneath
 *  - Three.js is asynchronously loaded with immediate SceneFallback
 *  - In-memory replay tracking: plays on fresh load, refresh (F5), and reopen; skips on internal SPA navigation
 *  - Zero persistent storage flags (no localStorage / sessionStorage)
 *  - Visible Skip Intro button + Escape key support
 *  - Full prefers-reduced-motion support
 */

import { useRef, useState, useEffect, useCallback, lazy, Suspense } from 'react'
import { ArrowDown, Download, Sparkles } from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.config.js'
import {
  playSignatureIntro,
  getHasPlayedIntro,
  setHasPlayedIntro,
} from '../animations/intro.animation.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useMouseParallax from '../hooks/useMouseParallax.js'
import SceneFallback from '../components/three/SceneFallback.jsx'
import StatItem from '../components/ui/StatItem.jsx'
import { getProfile } from '../services/portfolio.service.js'

// Lazy-load the 3D canvas so the page loads and paints immediately
const HeroScene = lazy(() => import('../components/three/HeroScene.jsx'))

const profile = getProfile()
const BRAND_LETTERS = ['S', 'A', 'U', 'R', 'A', 'B', 'H', '.']

export default function HeroSection() {
  const containerRef = useRef(null)
  const overlayRef = useRef(null)
  const gridRef = useRef(null)
  const lightSweepRef = useRef(null)
  const sysTelemetryRef = useRef(null)
  const scene2ContainerRef = useRef(null)
  const scene3ContainerRef = useRef(null)
  const scene3Line1Ref = useRef(null)
  const scene3Line2Ref = useRef(null)
  const geoRingRef = useRef(null)
  const geoPulseRingRef = useRef(null)
  const emeraldGlowRef = useRef(null)
  const shockwaveRef = useRef(null)
  const radialEnergyWaveRef = useRef(null)
  const burstFlashRef = useRef(null)
  const transitionSweepRef = useRef(null)
  const skipBtnRef = useRef(null)
  const headlineRef = useRef(null)
  const portraitRef = useRef(null)
  const timelineRef = useRef(null)

  const prefersReducedMotion = useReducedMotion()
  const mouse = useMouseParallax({ smoothing: 0.08 })

  // Uses in-memory state: false on full page load / refresh / reopen, true after playing in current SPA session
  const [hasSeenIntro, setHasSeenIntroState] = useState(() => {
    return getHasPlayedIntro() || prefersReducedMotion
  })

  // Skip Intro Handler
  const handleSkipIntro = useCallback(() => {
    if (timelineRef.current) {
      timelineRef.current.progress(1)
    }
    setHasPlayedIntro(true)
    setHasSeenIntroState(true)
  }, [])

  // Keyboard shortcut: Escape to skip intro
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape' && !hasSeenIntro) {
        handleSkipIntro()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [hasSeenIntro, handleSkipIntro])

  // Signature Cinematic Intro Animation (~5.2s)
  useEffect(() => {
    if (hasSeenIntro || prefersReducedMotion) {
      if (overlayRef.current) {
        gsap.set(overlayRef.current, { display: 'none' })
      }
      return
    }

    const targets = {
      overlay: overlayRef.current,
      grid: gridRef.current,
      lightSweep: lightSweepRef.current,
      sysTelemetry: sysTelemetryRef.current,
      scene2Container: scene2ContainerRef.current,
      scene2Letters: overlayRef.current?.querySelectorAll('.scene2-letter'),
      scene3Container: scene3ContainerRef.current,
      scene3Line1: scene3Line1Ref.current,
      scene3Line2: scene3Line2Ref.current,
      geoRing: geoRingRef.current,
      geoPulseRing: geoPulseRingRef.current,
      emeraldGlow: emeraldGlowRef.current,
      shockwave: shockwaveRef.current,
      radialEnergyWave: radialEnergyWaveRef.current,
      burstFlash: burstFlashRef.current,
      transitionSweep: transitionSweepRef.current,
      heroHeadline: headlineRef.current,
      skipBtn: skipBtnRef.current,
    }

    const tl = playSignatureIntro(targets, {
      skipIntro: false,
      onComplete: () => {
        setHasPlayedIntro(true)
        setHasSeenIntroState(true)
      },
    })
    timelineRef.current = tl

    // Safety timeout: guarantee overlay dismissal at 6.0s regardless of browser edge cases
    const safetyTimer = setTimeout(() => {
      if (!getHasPlayedIntro()) {
        handleSkipIntro()
      }
    }, 6000)

    return () => {
      clearTimeout(safetyTimer)
      if (tl) tl.kill()
    }
  }, [hasSeenIntro, prefersReducedMotion, handleSkipIntro])

  // Scroll-driven Hero Transformation (GSAP ScrollTrigger)
  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion) return

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        const progress = self.progress
        gsap.set(containerRef.current, {
          opacity: 1 - progress * 0.7,
          scale: 1 - progress * 0.05,
          y: progress * 60,
        })
      },
    })

    return () => {
      st.kill()
    }
  }, [prefersReducedMotion])

  // Smooth scroll to Projects section
  const scrollToProjects = () => {
    const el = document.getElementById('projects')
    if (el) {
      const offset = 80
      const y = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      aria-label="Hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden bg-brand-bg pt-20 pb-16"
    >
      {/* ── Cinematic + Futuristic Signature Intro Overlay ───────── */}
      {!hasSeenIntro && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-bg select-none overflow-hidden"
          aria-label="Signature brand introduction"
        >
          {/* Skip Intro button */}
          <button
            ref={skipBtnRef}
            onClick={handleSkipIntro}
            className="absolute top-8 right-6 sm:right-12 z-30 flex items-center gap-2
                       bg-brand-surface/90 hover:bg-brand-surface border border-brand-border
                       hover:border-brand-accent/60 text-brand-muted hover:text-brand-text
                       px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase
                       backdrop-blur-md transition-all duration-300 shadow-card cursor-pointer"
            aria-label="Skip introduction"
          >
            <Sparkles size={13} className="text-brand-accent" />
            <span>Skip Intro</span>
            <span className="text-brand-muted/50 text-[10px] ml-1">[ESC]</span>
          </button>

          {/* ── Scene 1: Fine digital grid background ───────────────── */}
          <div
            ref={gridRef}
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '48px 48px',
            }}
          />

          {/* ── Scene 1: Emerald Light Sweep Bar ───────────────────── */}
          <div
            ref={lightSweepRef}
            className="absolute inset-y-0 w-36 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.25) 50%, transparent 100%)',
              boxShadow: '0 0 45px rgba(16,185,129,0.4)',
            }}
          />

          {/* ── Scene 1: System Telemetry Status Kicker ────────────── */}
          <div
            ref={sysTelemetryRef}
            className="absolute top-10 left-6 sm:left-12 flex items-center gap-2 font-mono text-[11px] text-brand-accent tracking-[0.3em] uppercase pointer-events-none"
          >
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse" />
            <span>SYS.INITIALIZE // 01</span>
          </div>

          {/* ── Emerald Ambient Lighting Glow Orb ──────────────────── */}
          <div
            ref={emeraldGlowRef}
            className="absolute w-[550px] h-[550px] rounded-full blur-3xl pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.45) 0%, rgba(16,185,129,0.08) 50%, transparent 70%)',
            }}
          />

          {/* ── Scene 4: Expanding Geometric Concentric Pulse Ring ──── */}
          <div
            ref={geoPulseRingRef}
            className="absolute w-72 sm:w-96 h-72 sm:h-96 pointer-events-none"
          >
            <svg viewBox="0 0 300 300" className="w-full h-full" fill="none">
              <rect
                x="60"
                y="60"
                width="180"
                height="180"
                stroke="#10B981"
                strokeWidth="1.5"
                transform="rotate(45 150 150)"
              />
              <circle cx="150" cy="150" r="110" stroke="#10B981" strokeWidth="1" strokeDasharray="6 6" />
            </svg>
          </div>

          {/* ── Scene 4: Primary Expanding Shockwave Ring ──────────── */}
          <div
            ref={shockwaveRef}
            className="absolute w-80 h-80 rounded-full border-2 border-brand-accent pointer-events-none"
            style={{
              boxShadow: '0 0 90px rgba(16,185,129,0.75)',
            }}
          />

          {/* ── Scene 4: Secondary Quick Radial Energy Wave ────────── */}
          <div
            ref={radialEnergyWaveRef}
            className="absolute w-96 h-96 rounded-full border border-brand-accent/60 pointer-events-none"
            style={{
              boxShadow: '0 0 50px rgba(16,185,129,0.4)',
            }}
          />

          {/* ── Scene 4: Radial Burst Light Flash ──────────────────── */}
          <div
            ref={burstFlashRef}
            className="absolute w-[500px] h-[500px] rounded-full blur-2xl pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.85) 0%, rgba(16,185,129,0.2) 60%, transparent 80%)',
            }}
          />

          {/* ── Scene 4: Transition Screen-Wide Light Sweep ────────── */}
          <div
            ref={transitionSweepRef}
            className="absolute inset-y-0 w-48 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(16,185,129,0.4) 50%, transparent 100%)',
              boxShadow: '0 0 80px rgba(16,185,129,0.6)',
            }}
          />

          {/* ── Scene 2: Identity Reveal ("SAURABH.") ───────────────── */}
          <div
            ref={scene2ContainerRef}
            className="relative z-10 flex flex-col items-center justify-center text-center px-4"
          >
            <h2 className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-text tracking-tight drop-shadow-2xl">
              {BRAND_LETTERS.map((char, index) => (
                <span
                  key={index}
                  className={`scene2-letter inline-block ${
                    char === '.' ? 'text-brand-accent' : 'text-brand-text'
                  }`}
                >
                  {char}
                </span>
              ))}
            </h2>
            <p className="font-mono text-xs sm:text-sm text-brand-muted tracking-[0.4em] uppercase mt-4">
              PORTFOLIO
            </p>
          </div>

          {/* ── Scene 3: Engineering Identity ("ENGINEERING THE FUTURE.") ── */}
          <div
            ref={scene3ContainerRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
          >
            {/* Abstract geometric wireframe rotating behind text */}
            <div
              ref={geoRingRef}
              className="absolute w-80 sm:w-[450px] h-80 sm:h-[450px] pointer-events-none"
            >
              <svg viewBox="0 0 400 400" className="w-full h-full" fill="none">
                <circle cx="200" cy="200" r="190" stroke="#303030" strokeWidth="1" />
                <circle
                  cx="200"
                  cy="200"
                  r="150"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeDasharray="8 8"
                />
                <circle cx="200" cy="200" r="100" stroke="#303030" strokeWidth="1" />
                <rect
                  x="135"
                  y="135"
                  width="130"
                  height="130"
                  stroke="#10B981"
                  strokeWidth="1.2"
                  transform="rotate(45 200 200)"
                />
              </svg>
            </div>

            <div className="relative z-10">
              <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-none">
                <span ref={scene3Line1Ref} className="block text-brand-text drop-shadow-xl">
                  ENGINEERING
                </span>
                <span
                  ref={scene3Line2Ref}
                  className="block text-brand-accent mt-2 sm:mt-3 drop-shadow-[0_0_35px_rgba(16,185,129,0.4)]"
                >
                  THE FUTURE.
                </span>
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* ── 3D Abstract Geometric Background (Non-blocking) ───────── */}
      <Suspense fallback={<SceneFallback />}>
        <HeroScene prefersReducedMotion={prefersReducedMotion} />
      </Suspense>

      {/* ── Subtle Emerald Ambient Lighting ──────────────────────── */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none select-none blur-3xl opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ── Main Hero Content (Always rendered immediately underneath) ── */}
      <div className="section-container relative z-20 flex flex-col items-center text-center">
        {/* Technical kicker tag */}
        <div className="mb-4 sm:mb-6 max-w-full px-2">
          <div className="inline-flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2.5 font-mono text-brand-accent text-[11px] sm:text-xs md:text-sm tracking-[0.18em] sm:tracking-[0.25em] uppercase px-4 sm:px-5 py-2 sm:py-1.5 rounded-2xl sm:rounded-full border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.08)] leading-snug text-center">
            <span className="whitespace-nowrap">{profile.role}</span>
            <span className="hidden sm:inline opacity-60" aria-hidden="true">·</span>
            <span className="whitespace-nowrap text-brand-accent/90">{profile.specialization}</span>
          </div>
        </div>

        {/* ── Layered Headline & Portrait Editorial Composition ─────── */}
        {/*
          Cinematic Editorial Poster Overlapping Composition:
          - Both portrait and oversized headline occupy the SAME central visual space.
          - Z-index layering:
              * z-0: Non-blocking 3D geometric background + emerald ambient lighting
              * z-10: Behind-portrait headline layer (Top line "ENGINEERING" & base emerald glow)
              * z-20: Centered foreground portrait cutout (naturally overlapping text below nose/mouth)
              * z-30: Foreground accent depth layer ("THE BACKEND.") with subtle backdrop cut
          - Head, eyes, nose & mouth remain unobstructed at the center-top.
          - Shoulders and lower torso intersect and overlap naturally with the oversized typography.
        */}
        <div
          ref={headlineRef}
          className="relative w-full max-w-6xl my-4 sm:my-6 flex items-center justify-center min-h-[360px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] select-none"
        >
          {/* ── Typography Layer 1 (Behind & Around Portrait) ────────── */}
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
            aria-hidden="true"
          >
            <div
              className="font-display font-black tracking-tight leading-none text-center select-none"
              style={{
                fontSize: 'clamp(3rem, 10.5vw, 9.5rem)',
                lineHeight: '0.88',
                letterSpacing: '-0.04em',
              }}
            >
              <span className="block text-brand-text/90 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
                ENGINEERING
              </span>
              <span className="block text-brand-accent/35 mt-1 sm:mt-2 filter blur-[0.5px]">
                THE BACKEND.
              </span>
            </div>
          </div>

          {/* ── Center Foreground Portrait Cutout (z-20) ─────────────── */}
          <div
            ref={portraitRef}
            className="relative z-20 w-64 sm:w-80 md:w-[410px] lg:w-[470px] xl:w-[500px]
                       pointer-events-none select-none transition-transform duration-700 ease-out flex items-center justify-center"
            style={{
              transform: `translate(${mouse.x * 12}px, calc(-10px + ${mouse.y * 12}px))`,
            }}
          >
            {/* Emerald glow aura behind portrait silhouette */}
            <div
              className="absolute inset-x-8 top-12 bottom-6 rounded-full blur-3xl opacity-50 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at center, rgba(16,185,129,0.6) 0%, rgba(16,185,129,0.15) 50%, transparent 75%)',
              }}
            />

            {/* Seamless transparent cutout — no rectangular card, no borders */}
            <div
              className="relative w-full h-auto flex items-center justify-center"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              }}
            >
              <img
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                loading="eager"
                fetchPriority="high"
                onError={(e) => {
                  if (e.currentTarget.src !== profile.portrait.fallbackSrc) {
                    e.currentTarget.src = profile.portrait.fallbackSrc
                  }
                }}
                className="w-full h-auto object-contain filter contrast-[1.08] brightness-[0.98] drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
              />
            </div>
          </div>

          {/* ── Typography Layer 2 (Foreground Accents / Semantic H1) ─── */}
          {/*
            Positioned at z-30:
            The bottom line "THE BACKEND." overlays with vivid emerald luminance across the lower chest/torso,
            anchoring the editorial poster aesthetic while keeping face, eyes, nose & mouth completely clear.
          */}
          <h1
            className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
            style={{
              fontSize: 'clamp(3rem, 10.5vw, 9.5rem)',
              lineHeight: '0.88',
              letterSpacing: '-0.04em',
            }}
          >
            {/* Top line is visually translucent here so behind layer shows clearly around head */}
            <span
              className="block font-display font-black text-transparent select-none"
              aria-hidden="true"
            >
              ENGINEERING
            </span>

            {/* Bottom line in emerald sits with sharp contrast across the lower composition */}
            <span className="block font-display font-black text-brand-accent mt-1 sm:mt-2 drop-shadow-[0_0_40px_rgba(16,185,129,0.45)] select-none">
              THE BACKEND.
            </span>

            {/* Screen-reader accessible full text */}
            <span className="sr-only">ENGINEERING THE BACKEND.</span>
          </h1>
        </div>

        {/* ── Supporting Description Text ─────────────────────────── */}
        <p className="font-sans text-brand-muted text-base sm:text-lg md:text-xl max-w-2xl mt-8 font-normal leading-relaxed">
          {profile.heroDescription}
        </p>

        {/* ── Call To Action Buttons ──────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-10 w-full sm:w-auto">
          <button
            onClick={scrollToProjects}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3
                       bg-brand-accent text-brand-bg px-8 py-4 rounded-lg font-mono text-sm
                       font-medium tracking-wide uppercase hover:bg-brand-accent/90
                       transition-all duration-300 shadow-accent hover:shadow-accent-lg cursor-pointer"
          >
            <span>Explore My Work</span>
            <ArrowDown
              size={16}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </button>

          <a
            href={profile.resume.downloadUrl}
            download={profile.resume.filename}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3
                       bg-brand-surface/80 border border-brand-border text-brand-text
                       hover:text-brand-accent hover:border-brand-accent/40
                       px-8 py-4 rounded-lg font-mono text-sm font-medium tracking-wide
                       uppercase transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <Download
              size={16}
              className="text-brand-muted group-hover:text-brand-accent transition-colors"
            />
            <span>Download Resume</span>
          </a>
        </div>

        {/* ── Statistics Summary Row ──────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 pt-16 mt-8 border-t border-brand-border/60 w-full max-w-3xl">
          {profile.stats.map((stat) => (
            <StatItem
              key={stat.id}
              value={stat.value}
              label={stat.label}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
