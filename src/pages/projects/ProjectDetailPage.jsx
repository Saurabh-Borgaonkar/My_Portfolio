/**
 * ProjectDetailPage.jsx
 * ----------------------
 * Reusable, rich Project Detail view supporting all 3 verified projects:
 *  - /projects/devpilot-ai
 *  - /projects/learning-management-system
 *  - /projects/hotel-evento
 *
 * Implements the 7 required sections:
 *  1. Project overview
 *  2. Problem or purpose
 *  3. Implemented features (only supported features)
 *  4. Technology stack
 *  5. My contribution
 *  6. Project screenshots / preview visuals
 *  7. GitHub and live links where available
 */

import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import {
  ArrowLeft,
  Github,
  ExternalLink,
  CheckCircle2,
  Layers,
  Wrench,
  HelpCircle,
  Sparkles,
} from 'lucide-react'
import { getProjectBySlug } from '../../services/portfolio.service.js'

export default function ProjectDetailPage({ slug }) {
  const project = getProjectBySlug(slug)

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  if (!project) {
    return <Navigate to="/404" replace />
  }

  const { title, tagline, description, technologies, links, images, details } = project

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text pt-28 pb-24">
      <div className="section-container max-w-5xl">
        {/* ── Breadcrumb / Back Navigation ──────────────────────────── */}
        <div className="mb-8">
          <Link
            to="/#projects"
            className="group inline-flex items-center gap-2 font-mono text-xs text-brand-muted hover:text-brand-accent transition-colors"
          >
            <ArrowLeft
              size={14}
              className="transition-transform duration-200 group-hover:-translate-x-1"
            />
            <span className="tracking-widest uppercase">Back to all projects</span>
          </Link>
        </div>

        {/* ── Project Hero Header ───────────────────────────────────── */}
        <div className="border-b border-brand-border/60 pb-12 mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-brand-accent text-xs tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-sm mb-4">
            <Sparkles size={13} />
            <span>{tagline}</span>
          </div>

          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-brand-text tracking-tight mb-4">
            {title}
          </h1>

          <p className="font-sans text-brand-muted text-lg sm:text-xl max-w-3xl leading-relaxed mb-8">
            {description}
          </p>

          {/* Action Links Bar */}
          <div className="flex flex-wrap items-center gap-4">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-brand-surface border border-brand-border text-brand-text hover:text-brand-accent hover:border-brand-accent/40 font-mono text-xs uppercase tracking-wider transition-all shadow-card"
              >
                <Github size={16} />
                <span>Source Code</span>
              </a>
            )}

            {links.liveDemo && (
              <a
                href={links.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-brand-accent text-brand-bg hover:bg-brand-accent/90 font-mono text-xs uppercase tracking-wider font-semibold transition-all shadow-accent"
              >
                <ExternalLink size={16} />
                <span>Launch Live Demo</span>
              </a>
            )}

            {!links.liveDemo && (
              <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-brand-border/40 text-brand-muted/50 font-mono text-xs">
                <span>Live demo not currently available</span>
              </span>
            )}
          </div>
        </div>

        {/* ── Preview Visual / Showcase ─────────────────────────────── */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden border border-brand-border/80 bg-brand-surface shadow-card">
            <img
              src={images.preview}
              alt={`${title} Interface Preview`}
              className="w-full h-auto object-cover max-h-[500px]"
            />
            <div className="p-4 bg-brand-surface/90 border-t border-brand-border/60 flex items-center justify-between font-mono text-xs text-brand-muted">
              <span>Preview Visual // {title}</span>
              <span className="text-brand-accent">Production Ready</span>
            </div>
          </div>
        </div>

        {/* ── Grid: Overview & Problem Addressed ─────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 1. Project Overview */}
          <div className="bg-brand-surface/60 border border-brand-border/70 rounded-2xl p-7 sm:p-8 backdrop-blur-md shadow-card">
            <div className="flex items-center gap-2.5 font-mono text-xs text-brand-accent uppercase tracking-widest mb-3">
              <Layers size={16} />
              <span>Project Overview</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-brand-text mb-4">
              Core Architecture
            </h3>
            <p className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed">
              {details.overview}
            </p>
          </div>

          {/* 2. Problem / Purpose */}
          <div className="bg-brand-surface/60 border border-brand-border/70 rounded-2xl p-7 sm:p-8 backdrop-blur-md shadow-card">
            <div className="flex items-center gap-2.5 font-mono text-brand-accent text-xs uppercase tracking-widest mb-3">
              <HelpCircle size={16} />
              <span>Problem & Purpose</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-brand-text mb-4">
              The Objective
            </h3>
            <p className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed">
              {details.problemAddressed}
            </p>
          </div>
        </div>

        {/* ── Implemented Features & Contributions ─────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* 3. Implemented Features */}
          <div className="bg-brand-surface/60 border border-brand-border/70 rounded-2xl p-7 sm:p-8 backdrop-blur-md shadow-card">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-accent uppercase tracking-widest mb-4">
              <CheckCircle2 size={16} />
              <span>Key Implemented Features</span>
            </div>
            <ul className="space-y-3.5">
              {details.keyFeatures.map((feat, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 font-sans text-sm text-brand-text/90 leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0 mt-2" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. My Contribution */}
          <div className="bg-brand-surface/60 border border-brand-border/70 rounded-2xl p-7 sm:p-8 backdrop-blur-md shadow-card">
            <div className="flex items-center gap-2 font-mono text-xs text-brand-accent uppercase tracking-widest mb-4">
              <Wrench size={16} />
              <span>Technical Contributions</span>
            </div>
            <ul className="space-y-3.5">
              {details.technicalContributions.map((contrib, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3 font-sans text-sm text-brand-text/90 leading-relaxed"
                >
                  <CheckCircle2
                    size={16}
                    className="text-brand-accent shrink-0 mt-0.5"
                  />
                  <span>{contrib}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Technology Stack ─────────────────────────────────────── */}
        <div className="bg-brand-surface/60 border border-brand-border/70 rounded-2xl p-7 sm:p-8 backdrop-blur-md shadow-card mb-16">
          <h3 className="font-mono text-xs text-brand-accent uppercase tracking-widest mb-4">
            Technologies & Tools Employed
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-mono bg-brand-bg/90 border border-brand-border text-brand-text/90 hover:border-brand-accent/40 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Bottom Navigation ─────────────────────────────────────── */}
        <div className="pt-8 border-t border-brand-border/60 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-brand-muted hover:text-brand-accent transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Return to Portfolio</span>
          </Link>

          {links.liveDemo && (
            <a
              href={links.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-brand-accent hover:underline"
            >
              <span>Visit Deployment</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
