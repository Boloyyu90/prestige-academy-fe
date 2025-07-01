/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],

  // ✅ MINIMAL SAFELIST - Only essential classes
  safelist: [
    'animate-fadeInUp',
    'animate-fadeInLeft',
    'animate-fadeInRight',
    'animate-scaleIn',
    'animation-duration-fast',
    'animation-duration-normal',
    'animation-duration-slow',
    'gpu-accelerated',
    'interactive',
    'card-hover',
    'btn-hover'
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {

      /* ============================================================================
         🎯 CORE DESIGN TOKENS - PRAGMATIC & MINIMAL
         ============================================================================ */

      colors: {
        primary: {
          50: "hsl(var(--primary-50))",
          100: "hsl(var(--primary-100))",
          200: "hsl(var(--primary-200))",
          300: "hsl(var(--primary-300))",
          400: "hsl(var(--primary-400))",
          DEFAULT: "hsl(var(--primary))",        // #327498
          500: "hsl(var(--primary-500))",       // Same as DEFAULT
          600: "hsl(var(--primary-600))",
          700: "hsl(var(--primary-700))",
          800: "hsl(var(--primary-800))",
          900: "hsl(var(--primary-900))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          50: "hsl(var(--secondary-50))",
          100: "hsl(var(--secondary-100))",
          200: "hsl(var(--secondary-200))",
          300: "hsl(var(--secondary-300))",
          400: "hsl(var(--secondary-400))",
          DEFAULT: "hsl(var(--secondary))",      // #F0A243
          500: "hsl(var(--secondary-500))",     // Same as DEFAULT
          600: "hsl(var(--secondary-600))",
          700: "hsl(var(--secondary-700))",
          800: "hsl(var(--secondary-800))",
          900: "hsl(var(--secondary-900))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        border: "hsl(var(--border))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      /* ============================================================================
         🎯 TYPOGRAPHY - SIMPLIFIED SCALE
         ============================================================================ */

      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },

      fontSize: {
        // Display sizes for headings
        "display-lg": ["3rem", { lineHeight: "1.25", letterSpacing: "-0.02em" }],
        "display-md": ["2.25rem", { lineHeight: "1.3", letterSpacing: "-0.02em" }],
        "display-sm": ["1.875rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
      },

      /* ============================================================================
         🎯 ANIMATION SYSTEM - CSS VARIABLES ONLY
         ============================================================================ */

      transitionDuration: {
        'fast': 'var(--animation-duration-fast)',
        'normal': 'var(--animation-duration-normal)',
        'slow': 'var(--animation-duration-slow)',
      },

      transitionTimingFunction: {
        'smooth': 'var(--animation-easing-smooth)',
        'gentle': 'var(--animation-easing-gentle)',
      },

      /* ============================================================================
         🎯 SHADOWS - SEMANTIC SYSTEM
         ============================================================================ */

      boxShadow: {
        "soft": "var(--shadow-soft)",
        "medium": "var(--shadow-medium)",
        "large": "var(--shadow-large)",
        "colored": "var(--shadow-colored)",
      },

      /* ============================================================================
         🎯 SPACING - ESSENTIAL ONLY
         ============================================================================ */

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      /* ============================================================================
         🎯 BORDER RADIUS - SIMPLIFIED
         ============================================================================ */

      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),

    // ✅ MINIMAL PLUGIN - Only essential utilities
    function({ addUtilities, addComponents }) {

      const utilities = {
        '.gpu-accelerated': {
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        },
      }

      const components = {
        '.interactive': {
          transition: 'transform var(--animation-duration-fast) var(--animation-easing-smooth), box-shadow var(--animation-duration-fast) var(--animation-easing-smooth)',
          willChange: 'transform, box-shadow',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--shadow-soft)',
          },
        },
      }

      addUtilities(utilities)
      addComponents(components)
    }
  ],
}