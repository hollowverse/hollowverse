// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
const { detect } = require('detect-browser');
const semver = require('semver');

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const browser = detect() || {};

module.exports = {
  dsn:
    SENTRY_DSN ||
    'https://6a07cc3eb45f4cfb83d71106c0af4f75@o1240855.ingest.sentry.io/6394200',
  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 0,
  denyUrls: [/localhost:\d+/],
  beforeSend(event) {
    if (event.environment !== 'production') {
      return null;
    }

    // Supported browsers
    if (
      (browser.os === 'ios' && semver.gt(browser.version, '12.0.0')) ||
      (browser.name === 'safari' && semver.gt(browser.version, '12.0.0')) ||
      (browser.name === 'chrome' && semver.gt(browser.version, '71.0.0'))
    ) {
      return event;
    }

    return null;
  },
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
};
