/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /* ============================================================
         TYPOGRAPHIE - ÉCHELLE HARMONIEUSE 1.125
      ============================================================ */
      fontSize: {
        // Headings: ratios multiplicatifs (1.125^n)
        'h1': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.05em', fontWeight: '800' }],
        'h2': ['2.8rem', { lineHeight: '1.15', letterSpacing: '-0.04em', fontWeight: '800' }],
        'h3': ['2.2rem', { lineHeight: '1.2', letterSpacing: '-0.03em', fontWeight: '700' }],
        'h4': ['1.8rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h5': ['1.4rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h6': ['1.125rem', { lineHeight: '1.3', letterSpacing: '0em', fontWeight: '600' }],
        
        // Body: lisibilité optimisée
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }],
        
        // Texte spécialisé
        'subtitle': ['1.125rem', { lineHeight: '1.75', fontWeight: '400' }],
        'caption': ['0.8rem', { lineHeight: '1.4', fontWeight: '500' }],
        'caption-xs': ['0.7rem', { lineHeight: '1.4', fontWeight: '600' }],
        'label': ['0.75rem', { lineHeight: '1.2', fontWeight: '600', letterSpacing: '0.05em' }],
        'label-sm': ['0.7rem', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '0.08em' }],
      },

      /* ============================================================
         SPACING - SYSTÈME 8PX
      ============================================================ */
      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        '2xl': '2.5rem',   // 40px
        '3xl': '3rem',     // 48px
        '4xl': '3.5rem',   // 56px
        '5xl': '4rem',     // 64px
        '6xl': '5rem',     // 80px
      },

      /* ============================================================
         COLORS - SYSTÈME COHÉRENT
      ============================================================ */
      colors: {
        // Dark mode
        'dark': {
          'bg': '#080c14',
          'bg-2': '#0d1320',
          'bg-3': '#111827',
          'surface': 'rgba(255,255,255,0.04)',
          'surface-hover': 'rgba(255,255,255,0.08)',
          'border': 'rgba(255,255,255,0.08)',
          'text': '#e8eaf0',
          'text-muted': '#7a8299',
          'text-dim': '#4a5270',
        },
        // Light mode
        'light': {
          'bg': '#f0f4fb',
          'bg-2': '#e8eef8',
          'bg-3': '#dde6f5',
          'surface': 'rgba(255,255,255,0.7)',
          'surface-hover': 'rgba(255,255,255,0.9)',
          'border': 'rgba(0,0,0,0.08)',
          'text': '#0f1728',
          'text-muted': '#4a5580',
          'text-dim': '#8a9ab8',
        },
        // Accent colors
        'accent': {
          'primary': '#3b82f6',      // Blue
          'secondary': '#06b6d4',    // Cyan
          'success': '#10b981',      // Green
          'warning': '#f59e0b',      // Amber
        },
        // Semantic
        'available': '#10b981',
        'available-bg': 'rgba(16,185,129,0.12)',
      },

      /* ============================================================
         BREAKPOINTS - MOBILE-FIRST
      ============================================================ */
      screens: {
        'xs': '320px',
        'sm': '480px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },

      /* ============================================================
         BORDER RADIUS
      ============================================================ */
      borderRadius: {
        'sm': '8px',
        'base': '12px',
        'md': '16px',
        'lg': '20px',
        'xl': '24px',
        'full': '9999px',
      },

      /* ============================================================
         SHADOWS
      ============================================================ */
      boxShadow: {
        'base': '0 8px 32px rgba(0,0,0,0.4)',
        'accent': '0 0 40px rgba(59,130,246,0.15)',
        'lift': '0 4px 20px rgba(59,130,246,0.25)',
        'lift-lg': '0 8px 32px rgba(59,130,246,0.4)',
        'lift-xl': '0 16px 48px rgba(59,130,246,0.18)',
        'subtle': '0 4px 16px rgba(59,130,246,0.25)',
      },

      /* ============================================================
         ANIMATIONS & TRANSITIONS
      ============================================================ */
      animation: {
        'pulse-dot': 'pulse-dot 2s infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.5', transform: 'scale(0.8)' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4,0,0.2,1)',
      },
      transitionDuration: {
        '300': '300ms',
        '400': '400ms',
        '500': '500ms',
        '600': '600ms',
        '700': '700ms',
        '900': '900ms',
      },

      /* ============================================================
         FONTS
      ============================================================ */
      fontFamily: {
        'display': ["'Syne'", 'sans-serif'],
        'body': ["'DM Sans'", 'sans-serif'],
      },
    },
  },
  plugins: [],
}