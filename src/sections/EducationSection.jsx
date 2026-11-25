/**
 * EducationSection.jsx
 * --------------------
 * Stage 10 — Education & Certifications Section.
 * Following the Midnight Emerald design system.
 *
 * Requirements:
 *  1. Section 1 — Education:
 *     - Degree: B.Tech – Computer Science Engineering
 *     - Institution: SAGE University
 *     - Duration: 2023–2027
 *     - CGPA: 8.60
 *     - Premium card layout with duration and CGPA badge.
 *     - Zero Class X or XII mentions.
 *
 *  2. Section 2 — Certifications:
 *     - Scalable dynamic grid rendered from `certifications.data.js`.
 *     - Supports verified user certificates (Coding Blocks, Udemy, IEEE, GDG, LetsUpgrade).
 *     - Clean thumbnail view maintaining proper aspect ratio without stretching.
 *     - Full-screen / modal image preview upon clicking.
 *     - External credential URL button where available.
 *     - Handles missing images gracefully with polished fallback.
 *     - Extensible for future admin dashboard additions.
 */

import { useRef, useEffect, useState, useCallback } from 'react'
import {
  GraduationCap,
  Award,
  Calendar,
  Building,
  ExternalLink,
  Maximize2,
  X,
  FileBadge,
  CheckCircle2,
} from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.config.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { getEducation, getCertifications } from '../services/portfolio.service.js'

export default function EducationSection() {
  const educationList = getEducation()
  const certifications = getCertifications()
  const eduData = educationList[0] || {}

  const sectionRef = useRef(null)
  const eduCardRef = useRef(null)
  const certsGridRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Modal preview state
  const [activePreview, setActivePreview] = useState(null)

  // ESC key to close modal preview
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && activePreview) {
        setActivePreview(null)
      }
    },
    [activePreview]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // GSAP Entrance Animations
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const ctx = gsap.context(() => {
      if (eduCardRef.current) {
        gsap.fromTo(
          eduCardRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: eduCardRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      if (certsGridRef.current) {
        const cards = certsGridRef.current.querySelectorAll('.cert-card')
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: certsGridRef.current,
                start: 'top 88%',
                toggleActions: 'play none none none',
              },
            }
          )
        }
      }
    }, sectionRef)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [prefersReducedMotion])

  return (
    <div ref={sectionRef} className="w-full">
      {/* ── Section Header ────────────────────────────────────────── */}
      <div className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-brand-accent text-xs sm:text-sm tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-sm mb-4">
          <GraduationCap size={14} className="text-brand-accent" />
          <span>05 // Education &amp; Certifications</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-text tracking-tight">
          Academic foundation <br className="hidden sm:inline" />
          <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            and verified credentials.
          </span>
        </h2>
      </div>

      {/* ── PART 1: Education Card ─────────────────────────────────── */}
      <div className="mb-16 sm:mb-20">
        <div
          ref={eduCardRef}
          className="bg-brand-surface/70 hover:bg-brand-surface/85 border border-brand-border/80 hover:border-brand-accent/50 rounded-2xl p-7 sm:p-9 md:p-10 backdrop-blur-md transition-all duration-300 shadow-card hover:shadow-card-hover relative overflow-hidden group"
        >
          {/* Subtle emerald top glow line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

          {/* Ambient corner glow */}
          <div
            className="absolute -top-12 -right-12 w-56 h-56 rounded-full blur-3xl opacity-15 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.8) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-accent tracking-widest uppercase px-3 py-1 rounded-full bg-brand-accent/10 border border-brand-accent/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                  Undergraduate Degree
                </span>
                <span className="font-mono text-xs text-brand-muted flex items-center gap-1.5">
                  <Calendar size={13} className="text-brand-accent" />
                  <span>{eduData.period || '2023 – 2027'}</span>
                </span>
              </div>

              <div>
                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-brand-text group-hover:text-brand-accent transition-colors duration-200">
                  {eduData.degree} – {eduData.field}
                </h3>
                <div className="flex items-center gap-2 text-brand-muted text-base sm:text-lg font-medium mt-1">
                  <Building size={18} className="text-brand-accent/80" />
                  <span>{eduData.institution}</span>
                </div>
              </div>

              <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
                Comprehensive four-year curriculum focused on Data Structures, Algorithms, Computer Networks, Database Management Systems, Operating Systems, and Object-Oriented Software Engineering.
              </p>
            </div>

            {/* Prominent CGPA Badge */}
            <div className="lg:border-l lg:border-brand-border/60 lg:pl-10 flex flex-col justify-center items-start lg:items-center">
              <div className="p-6 rounded-2xl bg-brand-bg/80 border border-brand-border/80 text-center w-full sm:w-auto min-w-[200px] shadow-inner">
                <span className="font-mono text-xs text-brand-accent tracking-[0.2em] uppercase block mb-1">
                  Academic Performance
                </span>
                <div className="font-display font-extrabold text-4xl sm:text-5xl text-brand-text tracking-tight flex items-baseline justify-center gap-1">
                  <span>{eduData.cgpa || '8.60'}</span>
                  <span className="text-xs sm:text-sm font-mono text-brand-muted">
                    / 10
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-[11px] text-brand-accent/90 mt-2">
                  <CheckCircle2 size={12} />
                  <span>Current CGPA</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PART 2: Certifications Section ─────────────────────────── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-brand-accent text-xs tracking-[0.2em] uppercase mb-1">
              <Award size={14} />
              <span>Professional Credentials</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-text">
              Verified Technical Certifications
            </h3>
          </div>
          <p className="font-mono text-xs text-brand-muted">
            Click any certificate to expand high-resolution preview
          </p>
        </div>

        {/* Dynamic Certifications Grid */}
        <div
          ref={certsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7"
        >
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card group bg-brand-surface/60 hover:bg-brand-surface/85 border border-brand-border/70 hover:border-brand-accent/50 rounded-2xl p-5 sm:p-6 backdrop-blur-md transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                {/* Certificate Image Thumbnail Container */}
                <div className="relative aspect-[16/11] w-full rounded-xl overflow-hidden bg-brand-bg border border-brand-border/60 mb-5 flex items-center justify-center">
                  {cert.image ? (
                    <>
                      <img
                        src={cert.image}
                        alt={`${cert.title} — ${cert.issuer}`}
                        loading="lazy"
                        className="w-full h-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Click overlay trigger */}
                      <button
                        type="button"
                        onClick={() => setActivePreview(cert)}
                        className="absolute inset-0 bg-brand-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 font-mono text-xs text-brand-accent backdrop-blur-[2px] cursor-pointer"
                        aria-label={`View full certificate preview for ${cert.title}`}
                      >
                        <Maximize2 size={16} />
                        <span>View Certificate</span>
                      </button>
                    </>
                  ) : (
                    /* Polished fallback container for certifications without digital scan uploaded */
                    <div className="w-full h-full flex flex-col items-center justify-center text-center p-4 bg-brand-surface/80">
                      <FileBadge
                        size={32}
                        className="text-brand-accent/70 mb-2"
                      />
                      <span className="font-mono text-xs text-brand-text font-medium">
                        {cert.issuer}
                      </span>
                      <span className="font-sans text-[11px] text-brand-muted mt-0.5">
                        Verified Credential
                      </span>
                    </div>
                  )}
                </div>

                {/* Certificate Meta Details */}
                <div className="flex items-center justify-between gap-2 font-mono text-xs text-brand-accent mb-2">
                  <span className="tracking-wider uppercase">{cert.issuer}</span>
                  <span className="text-brand-muted text-[11px]">{cert.issueDate}</span>
                </div>

                <h4 className="font-display font-bold text-lg sm:text-xl text-brand-text group-hover:text-brand-accent transition-colors duration-200 mb-2">
                  {cert.title}
                </h4>

                <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed mb-4">
                  {cert.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-brand-border/40 flex items-center justify-between">
                {cert.image ? (
                  <button
                    type="button"
                    onClick={() => setActivePreview(cert)}
                    className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-accent hover:underline cursor-pointer"
                  >
                    <Maximize2 size={13} />
                    <span>Enlarge Image</span>
                  </button>
                ) : (
                  <span className="font-mono text-[11px] text-brand-muted/70">
                    Verified Program
                  </span>
                )}

                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-brand-muted hover:text-brand-text transition-colors"
                  >
                    <span>Verify</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── High-Resolution Certificate Preview Modal ──────────────── */}
      {activePreview && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Certificate Preview: ${activePreview.title}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-brand-bg/90 backdrop-blur-md select-none animate-in fade-in duration-200"
          onClick={() => setActivePreview(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] bg-brand-surface border border-brand-border rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Bar */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-brand-border bg-brand-surface/90">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/25 text-brand-accent">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base sm:text-lg text-brand-text">
                    {activePreview.title}
                  </h4>
                  <p className="font-mono text-xs text-brand-muted">
                    {activePreview.issuer} · {activePreview.issueDate}
                  </p>
                </div>
              </div>

              {/* Close button */}
              <button
                type="button"
                onClick={() => setActivePreview(null)}
                className="p-2 rounded-lg bg-brand-bg border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-accent/40 transition-colors cursor-pointer"
                aria-label="Close certificate preview"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 flex items-center justify-center bg-brand-bg/60">
              <img
                src={activePreview.image}
                alt={`${activePreview.title} — ${activePreview.issuer}`}
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-lg border border-brand-border/40"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
