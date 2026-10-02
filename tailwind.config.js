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
          900: '#0a1628',
          800: '#0d1f3c',
          700: '#112244',
          600: '#1a3260',
        },
        gold: {
          400: '#f5c842',
          500: '#e8b800',
          600: '#d4a500',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
