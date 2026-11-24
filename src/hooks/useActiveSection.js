/**
 * useActiveSection
 * ----------------
 * Uses IntersectionObserver to track which portfolio section is currently
 * visible in the viewport. Returns the active section ID string.
 *
 * Used by the Navbar to show an emerald active-section indicator.
 */

import { useState, useEffect } from 'react'

const SECTION_IDS = [
  'hero',
  'about',
  'experience',
  'projects',
  'problem-solving',
  'education',
  'contact',
]

export default function useActiveSection() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observers = []

    // Small delay to ensure sections are mounted
    const timer = setTimeout(() => {
      SECTION_IDS.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return

        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setActiveSection(id)
            }
          },
          {
            // Trigger when 30% of section is visible
            threshold: 0.3,
            // Offset for the fixed navbar
            rootMargin: '-80px 0px -40% 0px',
          }
        )

        observer.observe(element)
        observers.push(observer)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      observers.forEach((obs) => obs.disconnect())
    }
  }, [])

  return activeSection
}
