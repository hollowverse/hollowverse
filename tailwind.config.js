module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend: {
      margin: ['last'],
    },
  },
  theme: {
    extend: {},
    screens: {
      lg: '896px',
    },
  },
  plugins: [],
};
