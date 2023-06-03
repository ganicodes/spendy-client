/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#804DEB',
        primaryVariant: '#9D7AE8',
        dark: '#111827'
      }
    },
  },
  plugins: [],
}