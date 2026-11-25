/**
 * ContactSection.jsx
 * ------------------
 * Stage 11 — Contact Section.
 * Following the Midnight Emerald design system.
 *
 * Requirements:
 *  1. Design & Typography:
 *     - Main heading: "LET'S BUILD SOMETHING."
 *     - Supporting text: "Have an opportunity, project, or idea? Let's connect."
 *     - Clean two-column layout on desktop, stacked layout on mobile.
 *     - Obsidian surface cards, emerald glow accents, Space Grotesk headings, JetBrains Mono labels.
 *
 *  2. Contact Information:
 *     - Email: saurabhborgaonkar55@gmail.com (functional mailto link)
 *     - GitHub: https://github.com/Saurabh-Borgaonkar
 *     - LinkedIn: https://www.linkedin.com/in/saurabh-borgaonkar-4802432a6/
 *     - Download Resume button reusing verified `/resume/saurabh-resume.pdf`.
 *
 *  3. Contact Form:
 *     - Fields: Full Name, Email Address, Subject, Message.
 *     - Client-side validation: required fields, email regex, inline feedback.
 *     - Anti-duplicate submission locking (`isSubmitting`).
 *     - Uses `sendContactMessage()` service abstraction.
 *     - Does NOT fake successful submissions when backend is not connected.
 *     - Displays honest feedback explaining backend is currently offline.
 *     - Full keyboard accessibility and ARIA labels.
 *     - Respects prefers-reduced-motion.
 */

import { useRef, useState, useEffect } from 'react'
import {
  Mail,
  Send,
  Github,
  Linkedin,
  Download,
  AlertCircle,
  Info,
  CheckCircle2,
  Terminal,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  ExternalLink,
} from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.config.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { contactData } from '../data/contact.data.js'
import { sendContactMessage } from '../services/contact.service.js'

const SOCIAL_ICONS = {
  Github,
  Linkedin,
}

// Basic RFC 5322 compliant regex for client-side email format checking
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactSection() {
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const infoColRef = useRef(null)
  const formColRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Form input states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  // Validation errors
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  // Submission state & feedback message
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionFeedback, setSubmissionFeedback] = useState(null)

  // ScrollTrigger entrance animation
  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) return

    const timer = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    const ctx = gsap.context(() => {
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

      if (infoColRef.current && formColRef.current) {
        gsap.fromTo(
          [infoColRef.current, formColRef.current],
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: infoColRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      }
    }, sectionRef)

    return () => {
      clearTimeout(timer)
      ctx.revert()
    }
  }, [prefersReducedMotion])

  // Field validation logic
  const validateField = (field, value) => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Full name is required.'
        if (value.trim().length < 2) return 'Name must be at least 2 characters.'
        return null
      case 'email':
        if (!value.trim()) return 'Email address is required.'
        if (!EMAIL_REGEX.test(value.trim())) return 'Please enter a valid email address.'
        return null
      case 'subject':
        if (!value.trim()) return 'Subject is required.'
        if (value.trim().length < 3) return 'Subject must be at least 3 characters.'
        return null
      case 'message':
        if (!value.trim()) return 'Message cannot be empty.'
        if (value.trim().length < 10) return 'Message must be at least 10 characters.'
        return null
      default:
        return null
    }
  }

  // Handle live change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    if (touched[name]) {
      const err = validateField(name, value)
      setErrors((prev) => ({ ...prev, [name]: err }))
    }
  }

  // Handle blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const err = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: err }))
  }

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate all fields
    const newErrors = {}
    let hasError = false
    Object.keys(formData).forEach((field) => {
      const err = validateField(field, formData[field])
      if (err) {
        newErrors[field] = err
        hasError = true
      }
    })

    setErrors(newErrors)
    setTouched({
      name: true,
      email: true,
      subject: true,
      message: true,
    })

    if (hasError) return

    // Prevent duplicate submissions
    setIsSubmitting(true)
    setSubmissionFeedback(null)

    try {
      const result = await sendContactMessage(formData)
      setSubmissionFeedback(result)
    } catch {
      setSubmissionFeedback({
        success: false,
        status: 'unconnected',
        message:
          'Backend message service is currently offline. Please email me directly at saurabhborgaonkar55@gmail.com.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div ref={sectionRef} className="w-full">
      {/* ── Section Header ────────────────────────────────────────── */}
      <div ref={headerRef} className="max-w-3xl mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 font-mono text-brand-accent text-xs sm:text-sm tracking-[0.25em] uppercase px-3.5 py-1.5 rounded-full border border-brand-accent/30 bg-brand-accent/5 backdrop-blur-sm mb-4">
          <Terminal size={14} className="text-brand-accent" />
          <span>06 // Contact</span>
        </div>
        <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-brand-text tracking-tight">
          {contactData.headline}
        </h2>
        <p className="font-sans text-brand-muted text-base sm:text-lg md:text-xl mt-3 font-normal">
          {contactData.subheading}
        </p>
      </div>

      {/* ── Two-Column Layout ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
        {/* Left Column: Direct Info, Socials & Download Resume ─────── */}
        <div
          ref={infoColRef}
          className="lg:col-span-5 flex flex-col justify-between gap-6"
        >
          {/* Main Info Card */}
          <div className="bg-brand-surface/70 border border-brand-border/80 rounded-2xl p-7 sm:p-9 backdrop-blur-md shadow-card relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Top Emerald Gradient Line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand-accent uppercase tracking-widest mb-4">
                <Sparkles size={14} />
                <span>Direct Inquiries</span>
              </div>

              <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-text mb-3">
                Let's discuss opportunities.
              </h3>

              <p className="font-sans text-sm text-brand-muted leading-relaxed mb-8">
                I am actively seeking full-time backend and full-stack software engineering opportunities. Whether you have an open role, an interesting project, or want to collaborate, feel free to reach out.
              </p>

              {/* Direct Email Pill */}
              <div className="mb-8">
                <span className="font-mono text-xs text-brand-muted uppercase tracking-wider block mb-2">
                  Email Address
                </span>
                <a
                  href={`mailto:${contactData.email}`}
                  className="group inline-flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-brand-bg/90 border border-brand-border/80 hover:border-brand-accent/50 text-brand-text hover:text-brand-accent transition-all duration-300 w-full shadow-inner"
                  aria-label="Send direct email to Saurabh Borgaonkar"
                >
                  <div className="w-10 h-10 rounded-lg bg-brand-accent/10 border border-brand-accent/30 flex items-center justify-center text-brand-accent group-hover:scale-105 transition-transform">
                    <Mail size={18} />
                  </div>
                  <div className="overflow-hidden">
                    <span className="font-mono text-xs sm:text-sm text-brand-text group-hover:text-brand-accent transition-colors block truncate">
                      {contactData.email}
                    </span>
                    <span className="font-sans text-[11px] text-brand-muted block">
                      Click to open email client
                    </span>
                  </div>
                </a>
              </div>

              {/* Social Channels */}
              <div className="mb-8">
                <span className="font-mono text-xs text-brand-muted uppercase tracking-wider block mb-3">
                  Professional Profiles
                </span>
                <div className="flex flex-col sm:flex-row gap-3">
                  {contactData.socials.map((social) => {
                    const IconComponent = SOCIAL_ICONS[social.icon] || ExternalLink

                    return (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex-1 inline-flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-brand-bg/80 border border-brand-border/80 hover:border-brand-accent/40 text-brand-text hover:text-brand-accent font-mono text-xs transition-all shadow-sm"
                        aria-label={`Visit Saurabh's ${social.name} profile`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComponent size={16} className="text-brand-accent" />
                          <span>{social.name}</span>
                        </div>
                        <ArrowUpRight
                          size={14}
                          className="text-brand-muted group-hover:text-brand-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                        />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Download Resume Action */}
            <div className="pt-6 border-t border-brand-border/40">
              <span className="font-mono text-xs text-brand-muted uppercase tracking-wider block mb-3">
                Curriculum Vitae
              </span>
              <a
                href={contactData.resume.downloadUrl}
                download={contactData.resume.filename}
                className="group w-full inline-flex items-center justify-center gap-2.5 bg-brand-accent text-brand-bg px-6 py-3.5 rounded-xl font-mono text-xs font-semibold tracking-wider uppercase hover:bg-brand-accent/90 transition-all duration-300 shadow-accent hover:shadow-accent-lg cursor-pointer"
                aria-label="Download Saurabh Borgaonkar's Resume PDF"
              >
                <Download
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-y-0.5"
                />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Contact Form ─────────────────── */}
        <div
          ref={formColRef}
          className="lg:col-span-7 bg-brand-surface/70 border border-brand-border/80 rounded-2xl p-7 sm:p-9 md:p-10 backdrop-blur-md shadow-card relative overflow-hidden flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-brand-border/40">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-accent uppercase tracking-widest">
                <MessageSquare size={16} />
                <span>Message Form</span>
              </div>
              <span className="font-mono text-[11px] text-brand-muted">
                All fields required
              </span>
            </div>

            {/* Backend Integration Honest Notice */}
            <div className="mb-6 p-4 rounded-xl bg-brand-bg/80 border border-brand-border/60 text-xs font-sans text-brand-muted flex items-start gap-3">
              <Info size={16} className="text-brand-accent shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="text-brand-text font-medium block mb-0.5">
                  Frontend Validation Active
                </span>
                Form validation and state handling are fully functional. Messages will connect to <code className="text-brand-accent font-mono text-[11px]">POST /api/contact</code> upon Phase 2 Express.js backend deployment.
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div>
                  <label
                    htmlFor="field-name"
                    className="block font-mono text-xs text-brand-text mb-2 tracking-wider uppercase"
                  >
                    Full Name <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="text"
                    id="field-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Enter your name"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-brand-bg/90 border font-sans text-sm text-brand-text placeholder-brand-muted/50 transition-colors focus:outline-none focus:ring-1 ${
                      touched.name && errors.name
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-brand-border/80 focus:border-brand-accent focus:ring-brand-accent/30'
                    }`}
                    aria-invalid={touched.name && !!errors.name}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    required
                  />
                  {touched.name && errors.name && (
                    <p
                      id="error-name"
                      className="mt-1.5 font-sans text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle size={12} />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="field-email"
                    className="block font-mono text-xs text-brand-text mb-2 tracking-wider uppercase"
                  >
                    Email Address <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="email"
                    id="field-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="name@company.com"
                    disabled={isSubmitting}
                    className={`w-full px-4 py-3 rounded-xl bg-brand-bg/90 border font-sans text-sm text-brand-text placeholder-brand-muted/50 transition-colors focus:outline-none focus:ring-1 ${
                      touched.email && errors.email
                        ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                        : 'border-brand-border/80 focus:border-brand-accent focus:ring-brand-accent/30'
                    }`}
                    aria-invalid={touched.email && !!errors.email}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    required
                  />
                  {touched.email && errors.email && (
                    <p
                      id="error-email"
                      className="mt-1.5 font-sans text-xs text-red-400 flex items-center gap-1"
                    >
                      <AlertCircle size={12} />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="field-subject"
                  className="block font-mono text-xs text-brand-text mb-2 tracking-wider uppercase"
                >
                  Subject <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  id="field-subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="e.g. Backend Engineering Opportunity / Collaboration"
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-bg/90 border font-sans text-sm text-brand-text placeholder-brand-muted/50 transition-colors focus:outline-none focus:ring-1 ${
                    touched.subject && errors.subject
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-brand-border/80 focus:border-brand-accent focus:ring-brand-accent/30'
                  }`}
                  aria-invalid={touched.subject && !!errors.subject}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  required
                />
                {touched.subject && errors.subject && (
                  <p
                    id="error-subject"
                    className="mt-1.5 font-sans text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    <span>{errors.subject}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="field-message"
                  className="block font-mono text-xs text-brand-text mb-2 tracking-wider uppercase"
                >
                  Message <span className="text-brand-accent">*</span>
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Share details about the role, technical scope, or timeline..."
                  disabled={isSubmitting}
                  className={`w-full px-4 py-3 rounded-xl bg-brand-bg/90 border font-sans text-sm text-brand-text placeholder-brand-muted/50 transition-colors focus:outline-none focus:ring-1 resize-y ${
                    touched.message && errors.message
                      ? 'border-red-500/80 focus:border-red-500 focus:ring-red-500/30'
                      : 'border-brand-border/80 focus:border-brand-accent focus:ring-brand-accent/30'
                  }`}
                  aria-invalid={touched.message && !!errors.message}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  required
                />
                {touched.message && errors.message && (
                  <p
                    id="error-message"
                    className="mt-1.5 font-sans text-xs text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle size={12} />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Feedback Notice */}
              {submissionFeedback && (
                <div
                  role="status"
                  className={`p-4 rounded-xl border text-xs font-sans leading-relaxed flex items-start gap-3 ${
                    submissionFeedback.status === 'sent'
                      ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                      : submissionFeedback.status === 'unconnected'
                      ? 'bg-brand-surface border-brand-accent/40 text-brand-text'
                      : 'bg-red-950/40 border-red-500/50 text-red-300'
                  }`}
                >
                  {submissionFeedback.status === 'sent' ? (
                    <CheckCircle2 size={16} className="text-brand-accent shrink-0 mt-0.5" />
                  ) : submissionFeedback.status === 'unconnected' ? (
                    <Info size={16} className="text-brand-accent shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  )}
                  <span>{submissionFeedback.message}</span>
                </div>
              )}

              {/* Submit Action */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  isSubmitting
                    ? 'bg-brand-border text-brand-muted cursor-not-allowed opacity-70'
                    : 'bg-brand-accent text-brand-bg hover:bg-brand-accent/90 shadow-accent hover:shadow-accent-lg cursor-pointer'
                }`}
              >
                <Send size={15} className={isSubmitting ? 'animate-pulse' : ''} />
                <span>{isSubmitting ? 'Validating & Processing...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
