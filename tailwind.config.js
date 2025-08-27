/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mood: {
          happy: {
            50: '#fef3e2',
            100: '#fde68a',
            200: '#fcd34d',
            300: '#f59e0b',
            400: '#d97706',
            500: '#b45309',
            600: '#92400e',
            700: '#78350f',
            800: '#451a03',
            900: '#1c0701',
          },
          tired: {
            50: '#dbeafe',
            100: '#bfdbfe',
            200: '#93c5fd',
            300: '#60a5fa',
            400: '#3b82f6',
            500: '#2563eb',
            600: '#1d4ed8',
            700: '#1e40af',
            800: '#1e3a8a',
            900: '#1e293b',
          },
          anxious: {
            50: '#d1fae5',
            100: '#a7f3d0',
            200: '#6ee7b7',
            300: '#34d399',
            400: '#10b981',
            500: '#059669',
            600: '#047857',
            700: '#065f46',
            800: '#064e3b',
            900: '#022c22',
          },
          focused: {
            50: '#f3e8ff',
            100: '#e9d5ff',
            200: '#d8b4fe',
            300: '#c084fc',
            400: '#a855f7',
            500: '#9333ea',
            600: '#7c3aed',
            700: '#6d28d9',
            800: '#5b21b6',
            900: '#4c1d95',
          }
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-soft': 'bounce 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}