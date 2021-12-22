module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/',
          destination: '/index/index.html',
        },
      ],
    };
  },
};
