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
      xxs: '384px',
      xs: '512px',
      sm: '768px',
    },
  },
  plugins: [
    // See https://github.com/richardtallent/tailwindcss-def
    (function () {
      return ({ addVariant }) => addVariant('default', ':where(&)');
    })(),
  ],
};
