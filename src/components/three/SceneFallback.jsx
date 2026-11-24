/**
 * SceneFallback
 * -------------
 * Lightweight CSS and SVG background used when:
 *  - The user prefers reduced motion (prefers-reduced-motion: reduce)
 *  - Small mobile viewports or WebGL-unsupported environments
 * Provides consistent emerald atmospheric aesthetics without WebGL overhead.
 */

export default function SceneFallback() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Emerald ambient lighting aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)',
        }}
      />

      {/* Abstract geometric SVG decorative rings */}
      <svg
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-15"
        viewBox="0 0 500 500"
        fill="none"
      >
        <circle cx="250" cy="250" r="210" stroke="#303030" strokeWidth="1" />
        <circle
          cx="250"
          cy="250"
          r="160"
          stroke="#10B981"
          strokeWidth="1"
          strokeDasharray="6 6"
        />
        <circle cx="250" cy="250" r="110" stroke="#303030" strokeWidth="1" />
        <rect
          x="195"
          y="195"
          width="110"
          height="110"
          stroke="#10B981"
          strokeWidth="1"
          transform="rotate(45 250 250)"
        />
      </svg>
    </div>
  )
}
