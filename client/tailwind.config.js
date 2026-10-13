/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f2f7f4',
          100: '#e1ede6',
          700: '#11653f',
          800: '#0d5434',
          900: '#0a4d2e',
          950: '#06351f',
        },
        coral: {
          50: '#fff5f3',
          100: '#ffe8e3',
          500: '#e05638',
          600: '#c94327',
          700: '#aa331a',
        },
        cream: {
          50: '#fafbf9',
          100: '#f7f9f6',
          200: '#eef2ec',
        }
      }
    },
  },
  plugins: [],
}
