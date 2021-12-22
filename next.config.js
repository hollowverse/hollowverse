module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },

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
      fallback: [
        { source: '/:path*', destination: 'https://hollowverse.com/:path*' },
      ],
    };
  },
};
