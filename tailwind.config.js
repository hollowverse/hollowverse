module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend: {
      margin: ['last'],
    },
  },
  theme: {
    extend: {
      boxShadow: {
        md: '0 4px 6px -1px rgb(0 0 0 / 0.025), 0 2px 4px -2px rgb(0 0 0 / 0.05);',
      },
    },
    screens: {
      xxs: '384px',
      xs: '512px',
      sm: '768px',
    },
  },
  plugins: [],
};
