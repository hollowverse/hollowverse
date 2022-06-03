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
    locales: ['default'],
    defaultLocale: 'default',
    localeDetection: false,
  },
};

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// module.exports = withBundleAnalyzer(nextJsConfig);

module.exports = withSentryConfig(nextJsConfig, sentryWebpackPluginOptions);
