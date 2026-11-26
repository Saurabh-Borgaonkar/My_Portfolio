/**
 * HeroScene
 * ---------
 * Three.js / React Three Fiber canvas wrapper for the 3D abstract geometry.
 * Performance & accessibility features:
 *  - Restricted DPR [1, 1.5] to prevent GPU bottleneck on high-DPI screens
 *  - Disabled automatically when prefers-reduced-motion is true
 *  - Hidden on small mobile screens (< 768px) with clean CSS fallback
 *  - PowerPreference set to high-performance
 */

import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import GeometryMesh from './GeometryMesh.jsx'
import SceneFallback from './SceneFallback.jsx'

export default function HeroScene({ prefersReducedMotion = false }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // If reduced motion is requested or viewport is mobile, serve lightweight CSS fallback
  if (prefersReducedMotion || isMobile) {
    return <SceneFallback />
  }

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 7.2], fov: 42 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        resize={{ scroll: false, debounce: 0 }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1.0}
          color="#ffffff"
        />
        <pointLight
          position={[-4, -4, -2]}
          intensity={2.5}
          color="#10B981"
        />
        <pointLight
          position={[4, 2, 3]}
          intensity={1.2}
          color="#10B981"
        />
        <Suspense fallback={null}>
          <GeometryMesh />
        </Suspense>
      </Canvas>
    </div>
  )
}
