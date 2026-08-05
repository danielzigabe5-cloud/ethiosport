/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          400: '#a3e635',
          500: '#84cc16',
        }
      }
    },
  },
  plugins: [],
}