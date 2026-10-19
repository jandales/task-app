/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0f1419',
          soft: '#141b24',
        },
        surface: {
          DEFAULT: '#1a2332',
          raised: '#232f42',
          hover: '#2a3950',
        },
        mist: {
          DEFAULT: '#e7ecf3',
          muted: '#8b9bb4',
          faint: '#5c6b82',
        },
        accent: {
          DEFAULT: '#2dd4bf',
          soft: 'rgba(45, 212, 191, 0.15)',
          hover: '#14b8a6',
        },
        danger: {
          DEFAULT: '#f43f5e',
          soft: 'rgba(244, 63, 94, 0.12)',
        },
      },
      fontFamily: {
        sans: ['Sora', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 8px 32px rgba(0, 0, 0, 0.28)',
        soft: '0 2px 12px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        drawer: '280ms',
      },
    },
  },
  plugins: [],
}
