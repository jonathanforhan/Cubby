/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        lora: "'Lora', serif",
        dm: "'DM Serif Text', serif",
        roboto: "'Roboto', sans-serif"
      },
    },
  },
  plugins: [],
}
