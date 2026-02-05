/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
            800: '#002b5c',
            900: '#001f3f', // Deep Navy
        },
        gold: {
            400: '#E5C158',
            500: '#D4AF37', // Industrial Gold
            600: '#B08D26',
        },
        silver: {
            500: '#C0C0C0', // Silver
        },
        charcoal: {
            900: '#1A1A1A',
        },
        maritime: {
            green: '#128C7E', // WhatsApp Teal / Maritime Green
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'subtle-pulse': 'subtle-pulse 3s infinite',
      },
      keyframes: {
        'subtle-pulse': {
          '0%, 100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(18, 140, 126, 0.7)' },
          '50%': { transform: 'scale(1.05)', boxShadow: '0 0 0 10px rgba(18, 140, 126, 0)' },
        },
        fadeIn: {
            '0%': { opacity: '0', transform: 'translateY(-10px)' },
            '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scroll: {
            '0%': { transform: 'translateY(0)', opacity: '1' },
            '100%': { transform: 'translateY(15px)', opacity: '0' },
        },
        'slow-zoom': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
        }
      }
    },
  },
  plugins: [],
}