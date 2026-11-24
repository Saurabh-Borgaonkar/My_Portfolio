/**
 * AboutSection.jsx
 * ----------------
 * Stage 6 — Developer Profile Implementation.
 * Following the Midnight Emerald design system.
 *
 * Requirements:
 *  1. Visually engaging Developer Profile layout.
 *  2. Display the approved professional introduction clearly.
 *  3. Premium technology category cards (Frontend, Backend, Databases, Languages, Tools, ORM).
 *  4. Appropriate Lucide icons (Layout, Server, Database, Code2, Wrench, Layers, Terminal, Sparkles).
 *  5. Subtle entrance animations respecting prefers-reduced-motion.
 *  6. Responsive desktop, tablet, and mobile layouts.
 *  7. Zero proficiency percentages or arbitrary progress bars.
 *  8. Reuses portfolio.service.js data layer (profile & skills).
 */

import { useRef, useEffect } from 'react'
import {
  Terminal,
  Sparkles,
  Layout,
  Server,
  Database,
  Code2,
  Wrench,
  Layers,
  CheckCircle2,
  Cpu,
  Boxes,
} from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.config.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { getProfile, getSkills } from '../services/portfolio.service.js'

// Map category icon keys to Lucide components
const CATEGORY_ICONS = {
  Layout,
  Server,
  Database,
  Code2,
  Wrench,
  Layers,
}

export default function AboutSection() {
  const profile = getProfile()
  const skillCategories = getSkills()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const bioCardRef = useRef(null)
  const skillsGridRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    // Small delay / next tick to ensure DOM elements and ScrollTrigger metrics are ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const ctx = gsap.context(() => {
      // 1. Section Header Reveal
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

      // 2. Bio Card Reveal
      if (bioCardRef.current) {
        gsap.fromTo(
          bioCardRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: bioCardRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // 3. Staggered Skill Cards Reveal
      if (skillsGridRef.current) {
        const cards = skillsGridRef.current.querySelectorAll('.tech-card')
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: skillsGridRef.current,
                start: 'top 92%',
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
          <Terminal size={14} className="text-brand-accent" />
          <span>01 // Developer Profile</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-text tracking-tight">
          Architecting robust services <br className="hidden sm:inline" />
          <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            with modern engineering.
          </span>
        </h2>
      </div>

      {/* ── Profile Bio & Key Competencies Grid ────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 sm:mb-20">
        {/* Main Editorial Bio Card */}
        <div
          ref={bioCardRef}
          className="lg:col-span-8 bg-brand-surface/70 border border-brand-border/70 rounded-2xl p-6 sm:p-8 md:p-10 backdrop-blur-md relative overflow-hidden shadow-card"
        >
          {/* Subtle top emerald gradient line */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent/50 to-transparent" />

          {/* Decorative ambient radial corner light */}
          <div
            className="absolute top-0 right-0 w-80 h-80 pointer-events-none select-none blur-3xl opacity-10"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.5) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-accent animate-pulse" />
                <span className="font-mono text-xs text-brand-muted uppercase tracking-[0.2em]">
                  Professional Background
                </span>
              </div>

              {/* Approved Professional Bio */}
              <p className="font-sans text-brand-text/90 text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose font-normal">
                {profile.aboutBio}
              </p>
            </div>

            {/* Core Competency Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-brand-border/50">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/25 text-brand-accent mt-0.5 shrink-0">
                  <Server size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-brand-text font-semibold uppercase tracking-wider">
                    REST APIs
                  </h4>
                  <p className="font-sans text-xs text-brand-muted mt-0.5">
                    Auth, routes & validation
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/25 text-brand-accent mt-0.5 shrink-0">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-brand-text font-semibold uppercase tracking-wider">
                    Databases
                  </h4>
                  <p className="font-sans text-xs text-brand-muted mt-0.5">
                    MongoDB, MySQL & Prisma
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/25 text-brand-accent mt-0.5 shrink-0">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-brand-text font-semibold uppercase tracking-wider">
                    LeetCode 250+
                  </h4>
                  <p className="font-sans text-xs text-brand-muted mt-0.5">
                    Data structures & algos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Identity & Status Card */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          <div className="bg-brand-surface/60 border border-brand-border/60 rounded-2xl p-6 sm:p-7 backdrop-blur-md relative overflow-hidden shadow-card flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs text-brand-accent uppercase tracking-widest">
                  Status
                </span>
                {profile.status?.availableForHire && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-brand-accent/10 text-brand-accent border border-brand-accent/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
                    {profile.status.label}
                  </span>
                )}
              </div>
              <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-text mb-2">
                {profile.name}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-brand-muted">
                {profile.role} · {profile.specialization}
              </p>
            </div>

            <div className="space-y-3 pt-6 border-t border-brand-border/40 mt-6">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-brand-muted">Primary Focus</span>
                <span className="text-brand-text font-medium">{profile.details?.primaryFocus || 'Backend & Web Applications'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-brand-muted">Graduation</span>
                <span className="text-brand-text font-medium">{profile.details?.graduationLabel || 'Class of 2027'}</span>
              </div>
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-brand-muted">Location</span>
                <span className="text-brand-text font-medium">{profile.details?.location || 'India'}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-brand-accent/10 via-brand-surface/50 to-brand-surface/30 border border-brand-accent/25 rounded-2xl p-6 backdrop-blur-md shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <Sparkles size={18} className="text-brand-accent" />
              <h4 className="font-display font-semibold text-brand-text text-base">
                {profile.philosophy?.title || 'Engineering Philosophy'}
              </h4>
            </div>
            <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed">
              {profile.philosophy?.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Technical Skills Category Grid ────────────────────────── */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-brand-accent text-xs tracking-[0.2em] uppercase mb-1">
              <Boxes size={14} />
              <span>Technology Stack</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-text">
              Categorized Technical Expertise
            </h3>
          </div>
          <p className="font-mono text-xs text-brand-muted">
            6 core domains · Zero vanity percentages
          </p>
        </div>

        {/* 6 Technology Category Cards */}
        <div
          ref={skillsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {skillCategories.map((cat) => {
            const IconComponent = CATEGORY_ICONS[cat.iconName] || Boxes

            return (
              <div
                key={cat.id}
                className="tech-card group bg-brand-surface/60 hover:bg-brand-surface/85 border border-brand-border/70 hover:border-brand-accent/50 rounded-2xl p-6 sm:p-7 backdrop-blur-md transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between relative overflow-hidden"
              >
                {/* Emerald hover glow sweep */}
                <div
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(16,185,129,0.8) 0%, transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                <div>
                  {/* Category Card Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent group-hover:scale-105 group-hover:bg-brand-accent/15 transition-all duration-300">
                      <IconComponent size={20} />
                    </div>
                    <span className="font-mono text-[11px] text-brand-muted/70 tracking-widest uppercase">
                      {cat.skills.length} Technologies
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-lg sm:text-xl text-brand-text group-hover:text-brand-accent transition-colors duration-300 mb-2">
                    {cat.category}
                  </h4>

                  <p className="font-sans text-xs sm:text-sm text-brand-muted mb-6 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                {/* Skill Pills */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-brand-border/40">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-brand-bg/80 border border-brand-border/80 text-brand-text/90 group-hover:border-brand-accent/30 group-hover:text-brand-accent transition-colors duration-200"
                    >
                      <CheckCircle2 size={11} className="text-brand-accent/70 shrink-0" />
                      <span>{skill}</span>
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
