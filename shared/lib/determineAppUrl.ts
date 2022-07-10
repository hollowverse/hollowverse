import { getEnv } from './getEnv';

export function determineAppUrl() {
  if (getEnv() === 'production') {
    return 'https://hollowverse.com';
  }

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  const localDevServerUrl =
    process.env.DEV_SSL_SERVER_URL || process.env.DEV_SERVER_URL;

  if (localDevServerUrl) {
    return localDevServerUrl;
  }

  return getEnv() === 'development'
    ? 'http://localhost:3000'
    : 'https://hollowverse.com';
}
