/**
 * useMouseParallax
 * ----------------
 * Tracks normalized mouse position for 3D hero parallax effect.
 * Returns { x, y } each in range [-1, 1], where 0 is screen center.
 *
 * Usage:
 *   const mouse = useMouseParallax()
 *   // mouse.x: -1 (left) → 0 (center) → 1 (right)
 *   // mouse.y: -1 (top)  → 0 (center) → 1 (bottom)
 */

import { useState, useEffect, useRef } from 'react'

export default function useMouseParallax({ smoothing = 0.08 } = {}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const rawMouse = useRef({ x: 0, y: 0 })
  const animFrame = useRef(null)
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      rawMouse.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      }
    }

    // Smooth lerp loop — avoids setState on every mousemove
    const lerp = () => {
      const lx = current.current.x + (rawMouse.current.x - current.current.x) * smoothing
      const ly = current.current.y + (rawMouse.current.y - current.current.y) * smoothing

      if (Math.abs(lx - current.current.x) > 0.001 || Math.abs(ly - current.current.y) > 0.001) {
        current.current = { x: lx, y: ly }
        setMouse({ x: lx, y: ly })
      }

      animFrame.current = requestAnimationFrame(lerp)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animFrame.current = requestAnimationFrame(lerp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animFrame.current)
    }
  }, [smoothing])

  return mouse
}
