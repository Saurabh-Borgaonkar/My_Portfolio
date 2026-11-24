/**
 * Footer
 * ------
 * Cinematic footer with:
 *  - Oversized SAURABH. typography
 *  - Emerald accent details
 *  - GitHub, LinkedIn and email links
 *  - Copyright with current year
 *  - Smooth back-to-top interaction
 */

import { useCallback } from 'react'
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react'
import { getContactInfo, getProfile } from '../../services/portfolio.service.js'

const contact = getContactInfo()
const profile = getProfile()

const socialLinks = [
  {
    id: 'footer-github',
    label: 'GitHub',
    url: contact.socials.find((s) => s.name === 'GitHub')?.url,
    icon: Github,
  },
  {
    id: 'footer-linkedin',
    label: 'LinkedIn',
    url: contact.socials.find((s) => s.name === 'LinkedIn')?.url,
    icon: Linkedin,
  },
  {
    id: 'footer-email',
    label: 'Email',
    url: `mailto:${contact.email}`,
    icon: Mail,
  },
]

export default function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="relative border-t border-brand-border bg-brand-bg overflow-hidden"
      aria-label="Site footer"
    >
      {/* ── Oversized Background Typography ──────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span
          className="font-display font-bold text-brand-border/20 whitespace-nowrap"
          style={{
            fontSize: 'clamp(6rem, 20vw, 18rem)',
            lineHeight: '1',
            letterSpacing: '-0.04em',
          }}
        >
          SAURABH<span className="text-brand-accent/15">.</span>
        </span>
      </div>

      {/* ── Footer Content ───────────────────────────────────────── */}
      <div className="relative z-10 section-container">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-center justify-between py-16 gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-3xl text-brand-text tracking-tight">
              SAURABH<span className="text-brand-accent">.</span>
            </p>
            <p className="font-mono text-xs text-brand-muted mt-2 tracking-wider">
              {profile.role} · {profile.specialization}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <a
                  key={social.id}
                  href={social.url}
                  target={social.id !== 'footer-email' ? '_blank' : undefined}
                  rel={social.id !== 'footer-email' ? 'noopener noreferrer' : undefined}
                  className="group flex items-center justify-center w-11 h-11
                             border border-brand-border rounded-lg
                             text-brand-muted hover:text-brand-accent
                             hover:border-brand-accent/40 hover:bg-brand-accent/5
                             transition-all duration-300"
                  aria-label={social.label}
                >
                  <IconComponent size={18} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              )
            })}
          </div>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-mono text-xs text-brand-muted
                       hover:text-brand-accent transition-colors duration-300"
            aria-label="Back to top"
          >
            <span className="tracking-wider uppercase">Back to top</span>
            <span className="flex items-center justify-center w-8 h-8
                           border border-brand-border rounded-lg
                           group-hover:border-brand-accent/40 group-hover:bg-brand-accent/5
                           transition-all duration-300">
              <ArrowUp size={14} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        {/* Divider */}
        <div className="h-px bg-brand-border/50" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between py-6 gap-4">
          <p className="font-mono text-xs text-brand-muted/60">
            © {currentYear} Saurabh Borgaonkar. All rights reserved.
          </p>
          <p className="font-mono text-xs text-brand-muted/40">
            Designed & built by{' '}
            <span className="text-brand-accent/50">Saurabh</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
