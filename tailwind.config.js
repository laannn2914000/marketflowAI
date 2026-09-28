/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Placeholder brand palette — swap these for the exact colors
        // from the Behance design once you share screenshots.
        brand: {
          50: '#FFF8E8',
          100: '#FFE8B8',
          200: '#FFCC66',
          300: '#FFB44C',
          400: '#FFA01F',
          500: '#FF8C00',
          600: '#E97900',
          700: '#C96100',
          800: '#A64D00',
          900: '#7A3700',
        },
        ink: {
          900: '#0f1222',
          800: '#1a1e33',
          700: '#2a2f4a',
          500: '#5b6178',
          300: '#9aa0b5',
          100: '#e7e9f2',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: '0.875rem',
      }
    },
  },
  plugins: [],
}
