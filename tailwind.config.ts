import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        petshop: {
          primary: '#FF8C42',
          secondary: '#FFD151',
          background: '#FFF9F5',
          dark: '#2C2C2C',
          accent: '#FF6B9D',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Quicksand', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(255, 140, 66, 0.5)',
        'glow-lg': '0 0 40px rgba(255, 140, 66, 0.4)',
      },
    },
  },
  plugins: [],
}

export default config
