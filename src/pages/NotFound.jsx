/**
 * NotFound.jsx — 404 page
 * -----------------------
 * Cinematic 404 page consistent with the Midnight Emerald design system.
 * Includes navigation back to the portfolio.
 * Note: This page renders outside <RootLayout> (no Navbar/Footer)
 * to keep the experience clean.
 */

import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex items-center justify-center px-6">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16,185,129,0.06) 0%, transparent 60%)',
        }}
        aria-hidden="true"
      />

      <div className="relative text-center space-y-8 max-w-lg">
        {/* Error code */}
        <p className="font-mono text-brand-accent text-xs tracking-[0.3em] uppercase">
          Error 404 — Page not found
        </p>

        {/* Headline */}
        <h1
          className="font-display font-bold text-brand-text"
          style={{
            fontSize: 'clamp(4rem, 15vw, 12rem)',
            lineHeight: '0.85',
            letterSpacing: '-0.04em',
          }}
        >
          LOST<span className="text-brand-accent">.</span>
        </h1>

        {/* Description */}
        <p className="font-sans text-brand-muted text-lg max-w-sm mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-sm
                       bg-brand-accent text-brand-bg px-6 py-3 rounded-lg
                       hover:bg-brand-accent/90 transition-all duration-300"
          >
            <Home size={16} />
            <span>Back to Portfolio</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 font-mono text-sm text-brand-muted
                       border border-brand-border px-6 py-3 rounded-lg
                       hover:text-brand-text hover:border-brand-muted/50
                       transition-all duration-300"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Logo */}
        <div className="pt-8">
          <div className="h-px w-12 bg-brand-border mx-auto mb-4" />
          <p className="font-mono text-xs text-brand-muted/50 tracking-wider">
            SAURABH<span className="text-brand-accent/50">.</span>
          </p>
        </div>
      </div>
    </div>
  )
}
