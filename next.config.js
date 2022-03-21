module.exports = {
  pageExtensions: ['page.tsx', 'page.ts'],

  images: {
    domains: ['cdn.sanity.io'],
  },

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
