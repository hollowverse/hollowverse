import { getEnv } from '~/shared/lib/getEnv';

export function determineAppUrl() {
  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  const localDevServerUrl =
    process.env.SSL_DEV_SERVER_URL || process.env.DEV_SERVER_URL;

  if (localDevServerUrl) {
    return localDevServerUrl;
  }
  return getEnv() === 'development'
    ? 'http://localhost:3000'
    : 'https://hollowverse.com';
}
