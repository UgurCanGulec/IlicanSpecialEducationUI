/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '480px',  
        'md': '1100px',  
        'lg': '1200px', 
        'xl': '1280px',
      },
      fontFamily: {
        "primary": ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
