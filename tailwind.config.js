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
        // dark: '#13192B',
        dark: '#0f0f0f',
        darkVariant: '12181f',
      },
      transitionDuration: {
        '3000': '3000ms',
      }
    },
  },
  plugins: [],
}