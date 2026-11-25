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
import ContactSection from '../sections/ContactSection.jsx'
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

      {/* ── Stage 11: Contact Section ────────────────────────────── */}
      <SectionWrapper id="contact" label="Contact" withBorder>
        <ContactSection />
      </SectionWrapper>
    </>
  )
}
