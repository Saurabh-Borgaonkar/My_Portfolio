/**
 * ExperienceSection.jsx
 * ---------------------
 * Stage 7 — Work Experience Section.
 * Following the Midnight Emerald design system.
 *
 * Requirements:
 *  1. Displays experiences in reverse chronological order:
 *     - Node.js Intern — Codes For Tomorrow (October 2026 – Present)
 *     - MERN Stack Developer Intern — ACT T Connect Pvt. Ltd. (July 2026 – August 2026)
 *  2. Premium vertical timeline with emerald indicators and subtle connecting lines.
 *  3. Includes company, role, dates, technology tags, and verified bullet points.
 *  4. Subtle GSAP scroll-triggered entrance animations.
 *  5. Fully responsive on desktop, tablet, and mobile.
 *  6. Respects prefers-reduced-motion.
 *  7. Sourced from portfolio.service.js / experience.data.js.
 */

import { useRef, useEffect } from 'react'
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.config.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { getExperience } from '../services/portfolio.service.js'

export default function ExperienceSection() {
  const experiences = getExperience()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const timelineRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 2. Timeline items reveal
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.timeline-item')
        if (items.length > 0) {
          gsap.fromTo(
            items,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: timelineRef.current,
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
      <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-brand-accent text-xs sm:text-sm tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-sm mb-4">
          <Briefcase size={14} className="text-brand-accent" />
          <span>02 // Experience</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-text tracking-tight">
          Practical engineering <br className="hidden sm:inline" />
          <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            in production environments.
          </span>
        </h2>
      </div>

      {/* ── Vertical Timeline ─────────────────────────────────────── */}
      <div ref={timelineRef} className="relative max-w-4xl mx-auto">
        {/* Subtle Central / Left Timeline Spine */}
        <div
          className="absolute left-4 sm:left-6 md:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-brand-accent/60 via-brand-border to-brand-border/20 pointer-events-none"
          aria-hidden="true"
        />

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="timeline-item relative flex items-start gap-6 sm:gap-10 md:gap-12"
            >
              {/* Timeline Emerald Node */}
              <div className="relative z-10 flex items-center justify-center shrink-0 mt-1">
                <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-brand-surface border-2 border-brand-accent/80 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                  <div
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-brand-accent ${
                      exp.isCurrent ? 'animate-ping' : ''
                    }`}
                  />
                  <div className="absolute w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-brand-accent" />
                </div>
              </div>

              {/* Experience Card */}
              <div className="flex-1 bg-brand-surface/65 hover:bg-brand-surface/85 border border-brand-border/70 hover:border-brand-accent/40 rounded-2xl p-6 sm:p-8 md:p-9 backdrop-blur-md transition-all duration-300 shadow-card hover:shadow-card-hover relative overflow-hidden group">
                {/* Subtle emerald top glow on current role */}
                {exp.isCurrent && (
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />
                )}

                {/* Ambient radial corner lighting */}
                <div
                  className="absolute top-0 right-0 w-64 h-64 pointer-events-none select-none blur-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(16,185,129,0.7) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  {/* Top Meta: Dates & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-brand-accent">
                      <Calendar size={14} className="text-brand-accent" />
                      <span>{exp.period}</span>
                    </div>

                    {exp.isCurrent && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono bg-brand-accent/10 text-brand-accent border border-brand-accent/30 tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                        Current Role
                      </span>
                    )}
                  </div>

                  {/* Role & Company */}
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-text group-hover:text-brand-accent transition-colors duration-200">
                    {exp.role}
                  </h3>
                  <div className="flex items-center gap-2 text-brand-muted text-sm sm:text-base font-medium mt-1 mb-6">
                    <Building2 size={16} className="text-brand-accent/70" />
                    <span>{exp.company}</span>
                  </div>

                  {/* Responsibilities list */}
                  <div className="mb-6">
                    <h4 className="font-mono text-xs text-brand-muted uppercase tracking-widest mb-3">
                      Key Contributions
                    </h4>
                    <ul className="space-y-2.5">
                      {exp.responsibilities.map((resp, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 font-sans text-xs sm:text-sm text-brand-text/85 leading-relaxed"
                        >
                          <CheckCircle2
                            size={15}
                            className="text-brand-accent shrink-0 mt-1"
                          />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technology Pills */}
                  <div className="pt-5 border-t border-brand-border/40">
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg text-xs font-mono bg-brand-bg/80 border border-brand-border text-brand-text/90 group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors duration-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
