import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './features/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      // ─── Church Color Palette (PRD-aligned) ───────────────────────────────────
      colors: {
        // Primary — Deep Red
        primary: {
          DEFAULT: '#8B1A1A',
          50: '#FDF2F2',
          100: '#FADDDD',
          200: '#F4ABAB',
          300: '#ED7878',
          400: '#E04646',
          500: '#C91D1D',
          600: '#8B1A1A',
          700: '#6E1515',
          800: '#521010',
          900: '#350A0A',
          foreground: '#FFFFFF',
        },
        // Secondary — Marian Blue
        secondary: {
          DEFAULT: '#1B3F8B',
          50: '#F0F4FC',
          100: '#D6E1F6',
          200: '#ADC3EC',
          300: '#84A5E3',
          400: '#5B87D9',
          500: '#3268CF',
          600: '#1B3F8B',
          700: '#15326E',
          800: '#102452',
          900: '#0A1735',
          foreground: '#FFFFFF',
        },
        // Gold Accent
        gold: {
          DEFAULT: '#C5973A',
          50: '#FDF8EE',
          100: '#F8ECCE',
          200: '#F0D49D',
          300: '#E8BB6C',
          400: '#DFA33B',
          500: '#C5973A',
          600: '#9E7930',
          700: '#775A24',
          800: '#4F3C18',
          900: '#281E0C',
        },
        // Sacred Red / Burgundy accents
        burgundy: {
          DEFAULT: '#6E1515',
          50: '#FDF2F2',
          100: '#FADDDD',
          200: '#F4ABAB',
          300: '#ED7878',
          400: '#C91D1D',
          500: '#8B1A1A',
          600: '#6E1515',
          700: '#521010',
          800: '#350A0A',
          900: '#1a0505',
          950: '#120303',
        },
        // Ivory wash for editorial sections
        ivory: {
          DEFAULT: '#FAF7F0',
          50: '#FDFCF9',
          100: '#FAF7F0',
          200: '#F0E9DA',
        },
        // Neutral
        background: '#FFFFFF',
        foreground: '#0F0F0F',
        muted: {
          DEFAULT: '#F5F5F5',
          foreground: '#737373',
        },
        border: '#E5E5E5',
        input: '#E5E5E5',
        ring: '#8B1A1A',
        destructive: {
          DEFAULT: '#DC2626',
          foreground: '#FFFFFF',
        },
        // Card
        card: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F0F0F',
        },
        // Popover
        popover: {
          DEFAULT: '#FFFFFF',
          foreground: '#0F0F0F',
        },
        // Accent
        accent: {
          DEFAULT: '#F5F5F5',
          foreground: '#0F0F0F',
        },
      },

      // ─── Typography ───────────────────────────────────────────────────────────
      fontFamily: {
        sans: ['Inter', 'Inter Variable', ...fontFamily.sans],
        serif: ['Playfair Display', ...fontFamily.serif],
        heading: ['Playfair Display', ...fontFamily.serif],
        display: ['Playfair Display', ...fontFamily.serif],
        tamil: ['var(--font-tamil)', 'Noto Sans Tamil', 'sans-serif'],
      },

      // ─── Border Radius ────────────────────────────────────────────────────────
      borderRadius: {
        lg: '0.5rem',
        md: 'calc(0.5rem - 2px)',
        sm: 'calc(0.5rem - 4px)',
      },

      // ─── Animations ───────────────────────────────────────────────────────────
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-down': {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(32px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.92)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'zoom-slow': {
          from: { transform: 'scale(1)' },
          to: { transform: 'scale(1.08)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'fade-in-up': 'fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in-down': 'fade-in-down 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-left': 'slide-in-left 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'slide-in-right': 'slide-in-right 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
        'zoom-slow': 'zoom-slow 22s ease-out forwards',
        shimmer: 'shimmer 2s infinite linear',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
