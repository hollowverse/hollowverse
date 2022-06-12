import * as Sentry from '@sentry/nextjs';
import * as sentryCommonConfig from './sentry.common.config';

Sentry.init({
  ...sentryCommonConfig,
});
