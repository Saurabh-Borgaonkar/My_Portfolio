/**
 * ProjectsSection.jsx
 * -------------------
 * Stage 8 — Projects Section.
 * Showcases the 3 verified developer projects:
 *  1. DevPilot AI (GitHub + Live Demo)
 *  2. Learning Management System (GitHub only — no Live Demo)
 *  3. Hotel Evento (Live Website only — no GitHub)
 *
 * Requirements:
 *  - Visually rich premium project cards in a responsive grid.
 *  - Displays title, description, technology tags, and clearly distinguished links.
 *  - Subtle emerald hover interactions and smooth animations.
 *  - Detail page route triggers (`/projects/:slug`).
 *  - Zero invented features, user counts, or performance claims.
 */

import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FolderGit2,
  ExternalLink,
  Github,
  ArrowUpRight,
  Sparkles,
  Layers,
} from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.config.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { getProjects } from '../services/portfolio.service.js'

export default function ProjectsSection() {
  const projects = getProjects()
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const gridRef = useRef(null)
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

      // 2. Project cards reveal
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.project-card')
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 35, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.75,
              stagger: 0.15,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: gridRef.current,
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
          <FolderGit2 size={14} className="text-brand-accent" />
          <span>03 // Featured Projects</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-text tracking-tight">
          Engineered solutions <br className="hidden sm:inline" />
          <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            from backend to interface.
          </span>
        </h2>
      </div>

      {/* ── Projects Responsive Grid ──────────────────────────────── */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
      >
        {projects.map((project, idx) => (
          <article
            key={project.id}
            className="project-card group bg-brand-surface/65 hover:bg-brand-surface/90 border border-brand-border/70 hover:border-brand-accent/50 rounded-2xl overflow-hidden backdrop-blur-md transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between relative"
          >
            {/* Top Preview Image Container */}
            <div className="relative aspect-video w-full overflow-hidden bg-brand-bg/80 border-b border-brand-border/60">
              <img
                src={project.images.preview}
                alt={`${project.title} Preview`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />

              {/* Ambient overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent opacity-60" />

              {/* Number index indicator */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-brand-bg/85 border border-brand-border/80 font-mono text-[11px] text-brand-muted tracking-widest backdrop-blur-sm">
                0{idx + 1}
              </div>

              {/* Quick Detail View Link Overlay */}
              <Link
                to={project.route}
                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-brand-bg/40 backdrop-blur-[2px]"
                aria-label={`View detailed case study for ${project.title}`}
              >
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-surface border border-brand-accent/60 text-brand-accent font-mono text-xs tracking-wider uppercase shadow-accent">
                  <span>Case Study</span>
                  <ArrowUpRight size={14} />
                </span>
              </Link>
            </div>

            {/* Card Content */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
              <div>
                <p className="font-mono text-xs text-brand-accent tracking-widest uppercase mb-2">
                  {project.tagline}
                </p>

                <h3 className="font-display font-bold text-xl sm:text-2xl text-brand-text group-hover:text-brand-accent transition-colors duration-200 mb-3">
                  <Link to={project.route} className="hover:underline">
                    {project.title}
                  </Link>
                </h3>

                <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technology Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-brand-bg/90 border border-brand-border/80 text-brand-text/80 group-hover:border-brand-accent/25 group-hover:text-brand-accent transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links Bar */}
              <div className="pt-4 border-t border-brand-border/50 flex items-center justify-between gap-3">
                <Link
                  to={project.route}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-text/90 hover:text-brand-accent transition-colors"
                >
                  <span>Explore Details</span>
                  <ArrowUpRight size={14} className="text-brand-accent" />
                </Link>

                <div className="flex items-center gap-2">
                  {/* GitHub Link (Only rendered when repository is provided) */}
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-brand-bg/80 border border-brand-border text-brand-muted hover:text-brand-text hover:border-brand-border-hover transition-all"
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      <Github size={16} />
                    </a>
                  )}

                  {/* Live Demo Link */}
                  {project.links.liveDemo ? (
                    <a
                      href={project.links.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-brand-accent/10 border border-brand-accent/30 text-brand-accent hover:bg-brand-accent/20 transition-all font-mono text-xs"
                      aria-label={`Open live demo for ${project.title}`}
                    >
                      <span>Live</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span
                      className="px-3 py-1.5 rounded-lg bg-brand-bg/40 border border-brand-border/40 text-brand-muted/40 font-mono text-xs cursor-not-allowed select-none"
                      title="Demo not available"
                    >
                      No Demo
                    </span>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
