/**
 * ProblemSolvingSection.jsx
 * -------------------------
 * Stage 9 — Problem Solving Section.
 * Following the Midnight Emerald design system.
 *
 * Requirements:
 *  1. Section label: "04 // PROBLEM SOLVING"
 *  2. Heading: "Consistency builds engineering excellence."
 *  3. Prominently display "250+" with subtle count-up animation.
 *  4. Short description highlighting dedication to problem solving and logical thinking.
 *  5. Visually engaging DSA journey progression graphic with visual categories:
 *     - Arrays & Hashing
 *     - Strings
 *     - Linked Lists
 *     - Trees & Graphs
 *     - Dynamic Programming
 *     (Used strictly as topic labels, not invented milestones).
 *  6. Clear "View LeetCode Profile" button linking to:
 *     https://leetcode.com/u/Saurabhborgaonkar123/
 *  7. Full responsiveness on mobile and tablet without horizontal overflow.
 *  8. Respects prefers-reduced-motion.
 */

import { useRef, useEffect, useState } from 'react'
import {
  Code2,
  ExternalLink,
  Terminal,
  Binary,
  Code,
  GitCommit,
  Network,
  Cpu,
  CheckCircle2,
  Sparkles,
  Flame,
  Activity,
} from 'lucide-react'
import { gsap, ScrollTrigger } from '../animations/gsap.config.js'
import useReducedMotion from '../hooks/useReducedMotion.js'
import { getAchievements } from '../services/portfolio.service.js'
import LeetCodeHeatmap from '../components/problem-solving/LeetCodeHeatmap.jsx'

const TOPIC_ICONS = {
  Binary,
  Code,
  GitCommit,
  Network,
  Cpu,
}

export default function ProblemSolvingSection() {
  const achievements = getAchievements()
  const leetcodeData = achievements[0] || {}
  const sectionRef = useRef(null)
  const headerRef = useRef(null)
  const counterRef = useRef(null)
  const journeyRef = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  // Count-up state: starts at 0 or 250 if reduced motion
  const [count, setCount] = useState(() => (prefersReducedMotion ? 250 : 0))

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current) {
      setCount(250)
      return
    }

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
              toggleActions: 'play reverse play reverse',
            },
          }
        )
      }

      // 2. Count-up and Card Reveal Animation Trigger
      if (counterRef.current) {
        const countObj = { val: 0 }
        let countTween = null

        const startCount = () => {
          if (countTween) countTween.kill()
          countObj.val = 0
          countTween = gsap.to(countObj, {
            val: 250,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate: () => {
              setCount(Math.floor(countObj.val))
            },
          })
        }

        const resetCount = () => {
          if (countTween) countTween.kill()
          countObj.val = 0
          setCount(0)
        }

        gsap.fromTo(
          counterRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: counterRef.current,
              start: 'top 85%',
              toggleActions: 'play reverse play reverse',
              onEnter: startCount,
              onEnterBack: startCount,
              onLeave: resetCount,
              onLeaveBack: resetCount,
            },
          }
        )
      }

      // 3. Staggered Journey Cards
      if (journeyRef.current) {
        const cards = journeyRef.current.querySelectorAll('.dsa-topic-card')
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: journeyRef.current,
                start: 'top 88%',
                toggleActions: 'play reverse play reverse',
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
          <span>04 // PROBLEM SOLVING</span>
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-text tracking-tight">
          Consistency builds <br className="hidden sm:inline" />
          <span className="text-brand-accent drop-shadow-[0_0_30px_rgba(16,185,129,0.25)]">
            engineering excellence.
          </span>
        </h2>
      </div>

      {/* ── Dashboard Grid: 250+ Counter Card + Journey Info ───────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14 sm:mb-16">
        {/* Main 250+ Metric Dashboard Card */}
        <div
          ref={counterRef}
          className="lg:col-span-5 bg-brand-surface/70 hover:bg-brand-surface/85 border border-brand-border/80 hover:border-brand-accent/50 rounded-2xl p-7 sm:p-9 backdrop-blur-md transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between relative overflow-hidden group"
        >
          {/* Subtle emerald top border */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-accent to-transparent" />

          {/* Emerald background aura glow */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(16,185,129,0.8) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10">
            {/* Platform kicker */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-mono text-xs text-brand-muted tracking-wider uppercase">
                <Code2 size={16} className="text-brand-accent" />
                <span>LeetCode Journey</span>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-brand-accent/10 text-brand-accent border border-brand-accent/30">
                <Activity size={12} className="animate-pulse" />
                <span>Active Practice</span>
              </span>
            </div>

            {/* Oversized Achievement Counter */}
            <div className="my-4 sm:my-6">
              <div className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl text-brand-text tracking-tight leading-none flex items-baseline gap-1">
                <span className="drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
                  {count}
                </span>
                <span className="text-brand-accent drop-shadow-[0_0_35px_rgba(16,185,129,0.5)]">
                  +
                </span>
              </div>
              <p className="font-mono text-xs sm:text-sm text-brand-accent tracking-[0.2em] uppercase mt-3">
                Problems Solved
              </p>
            </div>

            <p className="font-sans text-xs sm:text-sm text-brand-muted leading-relaxed mb-8">
              {leetcodeData.description}
            </p>
          </div>

          {/* Action Link: External LeetCode Profile */}
          <div className="relative z-10 pt-6 border-t border-brand-border/50">
            <a
              href={leetcodeData.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/btn w-full inline-flex items-center justify-center gap-2.5
                         bg-brand-accent text-brand-bg px-6 py-3.5 rounded-xl font-mono text-xs
                         font-semibold tracking-wider uppercase hover:bg-brand-accent/90
                         transition-all duration-300 shadow-accent hover:shadow-accent-lg"
              aria-label="View Saurabh Borgaonkar's LeetCode Profile"
            >
              <span>View LeetCode Profile</span>
              <ExternalLink
                size={14}
                className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              />
            </a>
          </div>
        </div>

        {/* Commitment to Problem Solving & Logic Card */}
        <div className="lg:col-span-7 flex flex-col justify-between gap-6">
          <div className="bg-brand-surface/60 border border-brand-border/70 rounded-2xl p-7 sm:p-9 backdrop-blur-md shadow-card relative overflow-hidden flex-1 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-brand-accent uppercase tracking-widest mb-4">
                <Sparkles size={15} />
                <span>Algorithmic Foundation</span>
              </div>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-text mb-4">
                Analytical Thinking &amp; Optimal Solutions
              </h3>
              <p className="font-sans text-sm sm:text-base text-brand-muted leading-relaxed mb-6">
                Practicing Data Structures and Algorithms is an integral part of my engineering routine. It reinforces systematic problem decomposition, clean edge-case handling, and deliberate time and space complexity trade-offs that directly carry over into writing reliable backend APIs and efficient data services.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-brand-border/40">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/25 text-brand-accent shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-brand-text font-semibold uppercase tracking-wider">
                    Time &amp; Space Complexity
                  </h4>
                  <p className="font-sans text-xs text-brand-muted mt-0.5">
                    Analyzing asymptotic efficiency for optimal execution.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-brand-accent/10 border border-brand-accent/25 text-brand-accent shrink-0 mt-0.5">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <h4 className="font-mono text-xs text-brand-text font-semibold uppercase tracking-wider">
                    Defensive Coding
                  </h4>
                  <p className="font-sans text-xs text-brand-muted mt-0.5">
                    Anticipating edge cases, boundary conditions, and nulls.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Dynamic LeetCode Activity Heatmap ──────────────────────── */}
      <div className="mb-14 sm:mb-16">
        <LeetCodeHeatmap />
      </div>

      {/* ── DSA Progression / Focus Topics Journey Graphic ─────────── */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-brand-accent text-xs tracking-[0.2em] uppercase mb-1">
              <Flame size={14} />
              <span>Curriculum Focus</span>
            </div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-brand-text">
              Core DSA Practice Focus
            </h3>
          </div>
          <p className="font-mono text-xs text-brand-muted">
            Foundational data structures &amp; algorithmic paradigms
          </p>
        </div>

        {/* 5 DSA Topic Cards Grid */}
        <div
          ref={journeyRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5"
        >
          {leetcodeData.topics?.map((topic, idx) => {
            const IconComponent = TOPIC_ICONS[topic.icon] || Code2

            return (
              <div
                key={topic.name}
                className="dsa-topic-card group bg-brand-surface/50 hover:bg-brand-surface/85 border border-brand-border/70 hover:border-brand-accent/50 rounded-xl p-5 backdrop-blur-md transition-all duration-300 shadow-card hover:shadow-card-hover flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-brand-accent/10 border border-brand-accent/25 flex items-center justify-center text-brand-accent group-hover:scale-105 group-hover:bg-brand-accent/20 transition-all">
                      <IconComponent size={18} />
                    </div>
                    <span className="font-mono text-[11px] text-brand-muted/70">
                      0{idx + 1}
                    </span>
                  </div>

                  <h4 className="font-display font-semibold text-base text-brand-text group-hover:text-brand-accent transition-colors duration-200 mb-1.5">
                    {topic.name}
                  </h4>

                  <p className="font-sans text-xs text-brand-muted leading-relaxed">
                    {topic.desc}
                  </p>
                </div>

                <div className="pt-3 mt-4 border-t border-brand-border/30 flex items-center gap-1.5 font-mono text-[10px] text-brand-accent uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-accent/70" />
                  <span>Practice Area</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
