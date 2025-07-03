/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
  ],

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
    'btn-hover',
    // Brand utilities
    'bg-primary-subtle',
    'bg-primary-muted',
    'bg-primary-soft',
    'bg-secondary-subtle',
    'bg-secondary-muted',
    'bg-secondary-soft',
    // Button variants
    'btn-primary',
    'btn-secondary',
    'btn-primary-soft',
    'btn-secondary-soft'
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
          COLOR SYSTEM
         ============================================================================ */

      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground))",
        muted: {
          DEFAULT: "rgb(var(--muted))",
          foreground: "rgb(var(--muted-foreground))",
        },
        border: "rgb(var(--border))",
        card: {
          DEFAULT: "rgb(var(--card))",
          foreground: "rgb(var(--card-foreground))",
        },

        primary: {
          DEFAULT: "rgb(var(--primary))",           // #327498
          foreground: "rgb(var(--primary-foreground))",
          subtle: "rgb(var(--primary-bg-subtle))",
          muted: "rgb(var(--primary-bg-muted))",
          soft: "rgb(var(--primary-bg-soft))",
        },

        secondary: {
          DEFAULT: "rgb(var(--secondary))",         // #F0A243
          foreground: "rgb(var(--secondary-foreground))",
          subtle: "rgb(var(--secondary-bg-subtle))",
          muted: "rgb(var(--secondary-bg-muted))",
          soft: "rgb(var(--secondary-bg-soft))",
        },

        // ✅ STATUS COLORS - FIXED
        success: {
          DEFAULT: "rgb(var(--success))",
          foreground: "rgb(255 255 255)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning))",
          foreground: "rgb(15 15 15)",
        },
        error: {
          DEFAULT: "rgb(var(--error))",
          foreground: "rgb(255 255 255)",
        },
      },

      /* ============================================================================
         🎯 TYPOGRAPHY SYSTEM
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
         🎯 ANIMATION SYSTEM
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
         🎯 SHADOWS SYSTEM
         ============================================================================ */

      boxShadow: {
        "soft": "var(--shadow-soft)",
        "medium": "var(--shadow-medium)",
        "large": "var(--shadow-large)",
        "colored-primary": "var(--shadow-colored-primary)",
        "colored-secondary": "var(--shadow-colored-secondary)",
      },

      /* ============================================================================
         🎯 SPACING & BORDER RADIUS
         ============================================================================ */

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      borderRadius: {
        lg: "0.5rem",
        md: "0.375rem",
        sm: "0.25rem",
      },
    },
  },

  plugins: [
    require("tailwindcss-animate"),

    // ✅ SIMPLIFIED PLUGIN
    function({ addUtilities, addComponents }) {

      // Performance utilities
      const utilities = {
        '.gpu-accelerated': {
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        },
      }

      const components = {
        // Interactive base
        '.interactive': {
          transition: [
            'transform var(--animation-duration-fast) var(--animation-easing-smooth)',
            'box-shadow var(--animation-duration-fast) var(--animation-easing-smooth)'
          ].join(', '),
          willChange: 'transform, box-shadow',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: 'var(--shadow-soft)',
          },
        },

        // Card hover effects
        '.card-hover': {
          '@apply interactive': {},
          '&:hover': {
            boxShadow: 'var(--shadow-medium)',
          },
        },

        // Button hover effects
        '.btn-hover': {
          transition: [
            'transform var(--animation-duration-fast) var(--animation-easing-smooth)',
            'background-color var(--animation-duration-fast) var(--animation-easing-smooth)'
          ].join(', '),
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },

        // ✅ BUTTONS
        '.btn-primary': {
          backgroundColor: 'rgb(var(--primary))',
          color: 'rgb(var(--primary-foreground))',
          transition: 'all var(--animation-duration-fast) var(--animation-easing-smooth)',
          '&:hover': {
            backgroundColor: 'rgb(var(--primary) / 0.9)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            backgroundColor: 'rgb(var(--primary) / 0.8)',
            transform: 'translateY(0)',
          },
        },

        '.btn-secondary': {
          backgroundColor: 'rgb(var(--secondary))',
          color: 'rgb(var(--secondary-foreground))',
          transition: 'all var(--animation-duration-fast) var(--animation-easing-smooth)',
          '&:hover': {
            backgroundColor: 'rgb(var(--secondary) / 0.9)',
            transform: 'translateY(-1px)',
          },
          '&:active': {
            backgroundColor: 'rgb(var(--secondary) / 0.8)',
            transform: 'translateY(0)',
          },
        },

        // ✅ SOFT VARIANTS
        '.btn-primary-soft': {
          backgroundColor: 'rgb(var(--primary-bg-soft))',
          color: 'rgb(var(--primary))',
          transition: 'all var(--animation-duration-fast) var(--animation-easing-smooth)',
          '&:hover': {
            backgroundColor: 'rgb(var(--primary) / 0.1)',
            transform: 'translateY(-1px)',
          },
        },

        '.btn-secondary-soft': {
          backgroundColor: 'rgb(var(--secondary-bg-soft))',
          color: 'rgb(var(--secondary))',
          transition: 'all var(--animation-duration-fast) var(--animation-easing-smooth)',
          '&:hover': {
            backgroundColor: 'rgb(var(--secondary) / 0.1)',
            transform: 'translateY(-1px)',
          },
        },

        // ✅ BACKGROUND UTILITIES
        '.bg-primary-subtle': {
          backgroundColor: 'rgb(var(--primary-bg-subtle))',
        },
        '.bg-primary-muted': {
          backgroundColor: 'rgb(var(--primary-bg-muted))',
        },
        '.bg-primary-soft': {
          backgroundColor: 'rgb(var(--primary-bg-soft))',
        },
        '.bg-secondary-subtle': {
          backgroundColor: 'rgb(var(--secondary-bg-subtle))',
        },
        '.bg-secondary-muted': {
          backgroundColor: 'rgb(var(--secondary-bg-muted))',
        },
        '.bg-secondary-soft': {
          backgroundColor: 'rgb(var(--secondary-bg-soft))',
        },
      }

      addUtilities(utilities)
      addComponents(components)
    }
  ],
}