module.exports = {
  content: ['./lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: "'Poppins', sans-serif"
      },
      colors: {
        // light gray
        'lg-1': '#E6E6E6',
        'lg-2': '#747474'
      },
      width: {
        '400' : '25rem',
      },
      maxWidth: {
        'home-container' : '56.25rem'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
