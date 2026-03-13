import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: '#DC143C',
          50: '#FDE8EC',
          100: '#FACDD5',
          200: '#F49AAB',
          300: '#EF6781',
          400: '#E93457',
          500: '#DC143C',
          600: '#B01030',
          700: '#840C24',
          800: '#580818',
          900: '#2C040C',
        },
        charcoal: {
          DEFAULT: '#1A1A2E',
          50: '#2D2D44',
          100: '#25253B',
          200: '#1A1A2E',
          300: '#151525',
          400: '#10101C',
          500: '#0B0B13',
          600: '#06060A',
          700: '#010101',
          800: '#000000',
          900: '#000000',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
