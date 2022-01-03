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
          source: '~/studio/(.*)',
          destination: '/studio/index.html',
        },
      ],

      fallback: [
        {
          source: '/',
          destination: 'https://hollowverse.web.app',
        },
        {
          source: '/:path(.+\\..+)',
          destination: 'https://hollowverse.web.app/:path*',
        },
        {
          source: '/:path*',
          destination: 'https://hollowverse.web.app/:path*/',
        },
      ],
    };
  },
};
