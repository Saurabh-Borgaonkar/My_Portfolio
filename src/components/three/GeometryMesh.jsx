/**
 * GeometryMesh
 * ------------
 * An abstract, rotating geometric 3D structure built with Three.js / R3F.
 * Features:
 *  - Outer icosahedron wireframe cage in Emerald Green (#10B981)
 *  - Inner glowing nucleus octahedron with metallic reflectivity
 *  - Floating outer orbital ring for celestial depth
 *  - Dual-axis auto-rotation
 *  - Smooth mouse parallax tilt via frame lerp
 */

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function GeometryMesh() {
  const groupRef = useRef()
  const outerCageRef = useRef()
  const innerNucleusRef = useRef()
  const orbitRingRef = useRef()

  useFrame((state, delta) => {
    // Continuous subtle geometric rotation
    if (outerCageRef.current) {
      outerCageRef.current.rotation.y += delta * 0.12
      outerCageRef.current.rotation.x += delta * 0.06
    }

    if (innerNucleusRef.current) {
      innerNucleusRef.current.rotation.y -= delta * 0.18
      innerNucleusRef.current.rotation.z += delta * 0.09
    }

    if (orbitRingRef.current) {
      // Continuous rotation within its tilted orbital plane (Z-axis spin)
      // Preserves orbital inclination (Math.PI / 3) and prevents proportion/size distortion over time
      orbitRingRef.current.rotation.z -= delta * 0.08
    }

    // Smooth mouse parallax response
    if (groupRef.current) {
      const targetRotX = -state.pointer.y * 0.25
      const targetRotY = state.pointer.x * 0.25

      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotX,
        0.05
      )
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotY,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ── Outer Icosahedron Wireframe ────────────────────────────── */}
      <mesh ref={outerCageRef}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshBasicMaterial
          color="#10B981"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* ── Inner Glowing Nucleus ──────────────────────────────────── */}
      <mesh ref={innerNucleusRef}>
        <octahedronGeometry args={[1.1, 0]} />
        <meshStandardMaterial
          color="#151515"
          emissive="#10B981"
          emissiveIntensity={0.65}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* ── Floating Orbital Ring ─────────────────────────────────── */}
      <mesh ref={orbitRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.2, 0.02, 16, 80]} />
        <meshBasicMaterial
          color="#10B981"
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  )
}
