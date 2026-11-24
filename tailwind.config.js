/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      // ─── Midnight Emerald Color Palette ───────────────────────────────────
      colors: {
        'brand-bg':       '#101010', // Obsidian Black  — bg-brand-bg
        'brand-surface':  '#1B1B1B', // Charcoal        — bg-brand-surface
        'brand-accent':   '#10B981', // Emerald Green   — text-brand-accent, bg-brand-accent
        'brand-text':     '#F5F5F5', // Off White        — text-brand-text
        'brand-muted':    '#A3A3A3', // Muted Grey      — text-brand-muted
        'brand-border':   '#303030', // Dark Border     — border-brand-border
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        sans:    ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },

      // ─── Font Sizes ───────────────────────────────────────────────────────
      fontSize: {
        'hero':   ['clamp(3rem, 10vw, 9rem)',  { lineHeight: '0.9' }],
        'hero-sm':['clamp(2rem, 7vw, 5rem)',   { lineHeight: '0.95' }],
        'section':['clamp(2rem, 5vw, 4rem)',   { lineHeight: '1' }],
      },

      // ─── Spacing ──────────────────────────────────────────────────────────
      spacing: {
        'section': '8rem',
        'section-sm': '4rem',
      },

      // ─── Background Gradients ─────────────────────────────────────────────
      backgroundImage: {
        'gradient-radial':  'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':   'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'hero-glow':        'radial-gradient(ellipse at center, rgba(16,185,129,0.15) 0%, transparent 70%)',
      },

      // ─── Animations ───────────────────────────────────────────────────────
      animation: {
        'fade-in':   'fadeIn 0.6s ease-out forwards',
        'slide-up':  'slideUp 0.6s ease-out forwards',
        'pulse-slow':'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      // ─── Box Shadow ───────────────────────────────────────────────────────
      boxShadow: {
        'accent':     '0 0 40px rgba(16, 185, 129, 0.15)',
        'accent-lg':  '0 0 80px rgba(16, 185, 129, 0.2)',
        'card':       '0 4px 32px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 48px rgba(0, 0, 0, 0.6)',
      },

      // ─── Border Radius ────────────────────────────────────────────────────
      borderRadius: {
        'card': '12px',
      },

      // ─── Transitions ──────────────────────────────────────────────────────
      transitionDuration: {
        '400': '400ms',
      },
    },
  },
  plugins: [],
}
