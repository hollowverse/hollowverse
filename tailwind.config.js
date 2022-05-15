module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  variants: {
    extend: {
      margin: ['last'],
    },
  },
  theme: {
    extend: {
      screens: {
        lg: '768px',
        xs: '399px',
      },
    },
  },
  plugins: [
    // See https://github.com/richardtallent/tailwindcss-def
    (function () {
      return ({ addVariant }) => addVariant('default', ':where(&)');
    })(),
  ],
};
