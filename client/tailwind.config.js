/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f2f9fd',
          100: '#e4f2fb',
          200: '#c6e5f6',
          300: '#a0d4ef',
          400: '#73bbe5',
          500: '#4a9fd8',
          600: '#3680c2',
          700: '#2d69a8',
          800: '#29578b',
          900: '#254974',
          950: '#182e4a',
        },
        accent: {
          50: '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#ec4899',
          600: '#db2777',
          700: '#be185d',
          800: '#9d174d',
          900: '#831843',
          950: '#500724',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}