/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        craft: {
          terracotta: '#C85A32',
          'terracotta-dark': '#A33D1C',
          'terracotta-light': '#FBF3F0',
          sand: '#FAF6F0',
          'sand-dark': '#EFE7DB',
          linen: '#F4EFE6',
          ochre: '#D97706',
          'ochre-dark': '#B45309',
          gold: '#C59B27',
          forest: '#1E4620',
          indigo: '#1E293B',
          charcoal: '#1A1817',
          clay: '#7C4A3A',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'craft': '0 4px 20px -2px rgba(124, 74, 58, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'craft-hover': '0 12px 30px -4px rgba(124, 74, 58, 0.15), 0 4px 10px -2px rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}
