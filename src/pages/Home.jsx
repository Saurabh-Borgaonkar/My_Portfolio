/**
 * Home.jsx
 * --------
 * Assembles all public portfolio sections in order:
 *
 *   Stage 5  — HeroSection (Implemented)
 *   Stage 6  — AboutSection
 *   Stage 7  — ExperienceSection
 *   Stage 8  — ProjectsSection
 *   Stage 9  — ProblemSolvingSection
 *   Stage 10 — EducationSection
 *   Stage 11 — ContactSection
 */

import HeroSection from '../sections/HeroSection.jsx'
import AboutSection from '../sections/AboutSection.jsx'
import ExperienceSection from '../sections/ExperienceSection.jsx'
import ProjectsSection from '../sections/ProjectsSection.jsx'
import ProblemSolvingSection from '../sections/ProblemSolvingSection.jsx'
import EducationSection from '../sections/EducationSection.jsx'
import SectionWrapper from '../layouts/SectionWrapper.jsx'

export default function Home() {
  return (
    <>
      {/* ── Stage 5: Cinematic Hero Section ──────────────────────── */}
      <HeroSection />

      {/* ── Stage 6: About / Developer Profile Section ────────────── */}
      <SectionWrapper id="about" label="About Saurabh" withBorder>
        <AboutSection />
      </SectionWrapper>

      {/* ── Stage 7: Work Experience Section ─────────────────────── */}
      <SectionWrapper id="experience" label="Work Experience" withBorder>
        <ExperienceSection />
      </SectionWrapper>

      {/* ── Stage 8: Featured Projects Section ───────────────────── */}
      <SectionWrapper id="projects" label="Featured Projects" withBorder>
        <ProjectsSection />
      </SectionWrapper>

      {/* ── Stage 9: Problem Solving / DSA Journey ───────────────── */}
      <SectionWrapper id="problem-solving" label="Problem Solving" withBorder>
        <ProblemSolvingSection />
      </SectionWrapper>

      {/* ── Stage 10: Education & Certifications ─────────────────── */}
      <SectionWrapper id="education" label="Education and Certifications" withBorder>
        <EducationSection />
      </SectionWrapper>

      {/* ── Section Placeholders for Stage 11 ─────────────────────── */}
      <SectionWrapper id="contact" label="Contact" withBorder>
        <SectionPlaceholder title="Contact" stage={11} />
      </SectionWrapper>
    </>
  )
}

/**
 * Temporary placeholder for un-built sections.
 * Removed when each section is implemented in its own stage.
 */
function SectionPlaceholder({ title, stage }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="text-center space-y-3">
        <p className="font-mono text-brand-accent text-xs tracking-[0.3em] uppercase">
          Stage {stage}
        </p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-brand-text">
          {title}
        </h2>
        <p className="font-mono text-xs text-brand-muted border border-brand-border rounded px-4 py-2 inline-block">
          Section content implemented in Stage {stage}
        </p>
      </div>
    </div>
  )
}
