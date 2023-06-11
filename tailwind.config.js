/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#804DEB',
        primaryVariant: '#9D7AE8',
        dark: '#060b10',
        darkVariant: '12181f',
      }
    },
  },
  plugins: [],
}