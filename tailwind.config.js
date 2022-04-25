module.exports = {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Poppins', sans-serif"
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
