import { getEnv } from '~/shared/lib/getEnv';

export function getWebsiteUrl() {
  if (getEnv() === 'production') {
    return 'https://hollowverse.com';
  }

  if (getEnv() === 'development') {
    return 'https://dev.hollowverse.com:3000';
  }

  if (getEnv() === 'preview') {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL as string}`;
  }

  return 'https://hollowverse.com';
}
