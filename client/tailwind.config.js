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
      boxShadow: {
        toolbar: "0 0 12px 1px rgba(0, 0, 0, 0.07)"
      }
    },
  },
  plugins: [],
}
