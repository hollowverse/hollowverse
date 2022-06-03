const { withSentryConfig } = require('@sentry/nextjs');

const nextJsConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },

  reactStrictMode: true,

  devIndicators: {
    buildActivity: false,
  },

  images: {
    domains: ['cdn.sanity.io'],
  },

  i18n: {
    localeDetection: false,
  },
};

module.exports = nextJsConfig;
