module.exports = {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Poppins', sans-serif"
      },
      colors: {
        lg: '#E6E6E6'
      },
      width: {
        '400' : '25rem'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
