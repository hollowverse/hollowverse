import { getEnv } from './getEnv';

export function determineAppUrl() {
  if (getEnv() === 'production') {
    return 'https://hollowverse.com';
  }

  const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return getEnv() === 'development'
    ? window.location.origin
    : 'https://hollowverse.com';
}
