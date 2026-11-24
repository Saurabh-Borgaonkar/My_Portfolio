/**
 * RootLayout
 * ----------
 * Wraps all public portfolio routes.
 * Responsibilities:
 *  - Initializes Lenis smooth scroll (respects prefers-reduced-motion).
 *  - Lenis is synced with GSAP ScrollTrigger via useLenis().
 *  - Renders the fixed Navbar.
 *  - Renders route content via <Outlet />.
 *  - Renders the cinematic Footer.
 *  - Provides a skip-to-content link for keyboard accessibility.
 *  - Scrolls to top on route changes.
 */

import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useReducedMotion from '../hooks/useReducedMotion.js'
import useLenis from '../hooks/useLenis.js'
import Navbar from '../components/layout/Navbar.jsx'
import Footer from '../components/layout/Footer.jsx'

export default function RootLayout() {
  const prefersReducedMotion = useReducedMotion()
  const location = useLocation()

  // Initialize Lenis + GSAP ScrollTrigger sync
  useLenis(prefersReducedMotion)

  // Scroll to top on route change (except hash navigation)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col">
      {/* ── Skip to main content (accessibility) ─────────────────── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60]
                   focus:bg-brand-accent focus:text-brand-bg focus:px-4 focus:py-2
                   focus:rounded focus:font-mono focus:text-sm focus:shadow-accent"
      >
        Skip to main content
      </a>

      {/* ── Navbar ───────────────────────────────────────────────── */}
      <Navbar />

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
