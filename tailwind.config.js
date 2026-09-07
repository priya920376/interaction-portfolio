/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.025em', fontWeight: '800' }],
        h2: ['2rem', { lineHeight: '1.25', letterSpacing: '-0.02em', fontWeight: '700' }],
        h3: ['1.5rem', { lineHeight: '1.35', letterSpacing: '-0.015em', fontWeight: '600' }],
        h4: ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        body: ['1rem', { lineHeight: '1.65rem', fontWeight: '400' }],
        'body-sm': ['0.875rem', { lineHeight: '1.35rem', fontWeight: '400' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        112: '28rem',
        128: '32rem',
      },
    },
  },
  plugins: [],
};
