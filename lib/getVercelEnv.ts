const env = process.env.VERCEL_ENV as 'production' | 'preview' | 'development';

export function getVercelEnv() {
  return env;
}
