module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // <--- ADD THIS LINE!
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
