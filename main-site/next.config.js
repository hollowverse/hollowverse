const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextJsConfig = {
  reactStrictMode: true,

  devIndicators: {
    buildActivity: false,
  },

  experimental: {
    optimizeCss: true,
  },

  pageExtensions: [
    'tsx',
    'ts',
    'page.tsx',
    'celebPage.tsx',
    'celebIssuePage.tsx',
    'celebTagPage.tsx',
    'factPage.tsx',
    'knowledgeGraphPage.tsx',
    'issuePage.tsx',
    'homepage.tsx',
  ],

  webpack: (config, { buildId, dev }) => {
    config.resolve.symlinks = false;
    return config;
  },

  images: {
    unoptimized: true,

    domains: [
      'cdn.sanity.io',
      'forum.hollowverse.com',
      'encrypted-tbn0.gstatic.com',
      'encrypted-tbn1.gstatic.com',
      'encrypted-tbn2.gstatic.com',
      'encrypted-tbn3.gstatic.com',
      'encrypted-tbn4.gstatic.com',
      'encrypted-tbn5.gstatic.com',
      'encrypted-tbn6.gstatic.com',
      'encrypted-tbn7.gstatic.com',
      'encrypted-tbn8.gstatic.com',
      'encrypted-tbn9.gstatic.com',
    ],
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = withBundleAnalyzer(nextJsConfig);
