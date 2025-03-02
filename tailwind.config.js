/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      extend: {
        fontFamily: {
          "primary": ['Inter', 'sans-serif']
        }
      }
    },
  },
  plugins: [],
}

