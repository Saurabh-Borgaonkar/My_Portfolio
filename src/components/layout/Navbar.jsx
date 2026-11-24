/**
 * Navbar
 * ------
 * Fixed top navigation with:
 *  - SAURABH. logo (links to /)
 *  - Desktop links: Home, About, Work, Contact
 *  - Emerald active-section indicator
 *  - Contact link highlighted with emerald accent
 *  - Scroll-aware background blur
 *  - Mobile hamburger → full-screen overlay
 *  - Keyboard accessible
 */

import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import useActiveSection from '../../hooks/useActiveSection.js'

const NAV_LINKS = [
  { label: 'Home', sectionId: 'hero', href: '/#hero' },
  { label: 'About', sectionId: 'about', href: '/#about' },
  { label: 'Work', sectionId: 'experience', href: '/#experience' },
  { label: 'Projects', sectionId: 'projects', href: '/#projects' },
  { label: 'Contact', sectionId: 'contact', href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const activeSection = useActiveSection()
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Track scroll position for navbar background
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const scrollToSection = useCallback(
    (sectionId) => {
      setMobileOpen(false)
      if (!isHome) {
        // Navigate home first, then scroll after mount
        window.location.href = `/#${sectionId}`
        return
      }
      const el = document.getElementById(sectionId)
      if (el) {
        const offset = 80 // navbar height
        const y = el.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top: y, behavior: 'smooth' })
      }
    },
    [isHome]
  )

  const handleKeyDown = useCallback(
    (e, sectionId) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        scrollToSection(sectionId)
      }
    },
    [scrollToSection]
  )

  return (
    <>
      {/* ── Desktop + Mobile Navbar ──────────────────────────────── */}
      <header
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-400',
          scrolled
            ? 'bg-brand-bg/80 backdrop-blur-xl border-b border-brand-border/50'
            : 'bg-transparent border-b border-transparent',
        ].join(' ')}
      >
        <nav
          className="section-container flex items-center justify-between h-[72px]"
          aria-label="Main navigation"
        >
          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link
            to="/"
            className="relative z-10 group"
            aria-label="Saurabh Borgaonkar — Home"
            onClick={() => {
              if (isHome) {
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            }}
          >
            <span className="font-display font-bold text-xl text-brand-text tracking-tight">
              SAURABH
              <span className="text-brand-accent">.</span>
            </span>
          </Link>

          {/* ── Desktop Links ────────────────────────────────────── */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = isHome && activeSection === link.sectionId
              const isContact = link.sectionId === 'contact'

              return (
                <li key={link.sectionId}>
                  <button
                    onClick={() => scrollToSection(link.sectionId)}
                    onKeyDown={(e) => handleKeyDown(e, link.sectionId)}
                    className={[
                      'relative px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors duration-300 rounded-sm',
                      isContact && !isActive
                        ? 'text-brand-accent border border-brand-accent/40 hover:bg-brand-accent/10'
                        : '',
                      isActive
                        ? 'text-brand-accent'
                        : !isContact
                          ? 'text-brand-muted hover:text-brand-text'
                          : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    aria-current={isActive ? 'true' : undefined}
                  >
                    {link.label}

                    {/* Emerald active indicator line */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute bottom-0 left-2 right-2 h-[2px] bg-brand-accent rounded-full"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {/* ── Mobile Hamburger ──────────────────────────────────── */}
          <button
            className="relative z-10 md:hidden p-2 text-brand-text hover:text-brand-accent transition-colors"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Full-Screen Overlay ───────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav"
            role="dialog"
            aria-label="Mobile navigation"
            aria-modal="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-brand-bg/95 backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col items-center justify-center h-full gap-2">
              <ul className="flex flex-col items-center gap-2">
                {NAV_LINKS.map((link, index) => {
                  const isActive = isHome && activeSection === link.sectionId
                  const isContact = link.sectionId === 'contact'

                  return (
                    <motion.li
                      key={link.sectionId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: index * 0.06, duration: 0.3 }}
                    >
                      <button
                        onClick={() => scrollToSection(link.sectionId)}
                        onKeyDown={(e) => handleKeyDown(e, link.sectionId)}
                        className={[
                          'block px-8 py-4 font-display text-2xl font-medium tracking-tight transition-colors duration-300',
                          isActive ? 'text-brand-accent' : 'text-brand-text',
                          isContact && !isActive
                            ? 'text-brand-accent'
                            : '',
                        ]
                          .filter(Boolean)
                          .join(' ')}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        {link.label}
                        {isContact && (
                          <span className="block text-xs font-mono text-brand-accent/60 mt-1 tracking-widest uppercase">
                            Get in touch
                          </span>
                        )}
                      </button>
                    </motion.li>
                  )
                })}
              </ul>

              {/* Mobile social hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 text-center"
              >
                <div className="h-px w-12 bg-brand-accent/30 mx-auto mb-4" />
                <p className="font-mono text-xs text-brand-muted tracking-wider">
                  SAURABH<span className="text-brand-accent">.</span> — Full Stack Developer
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
