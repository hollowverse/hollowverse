const env = process.env.NODE_ENV as 'development' | 'production';

export function getNodeEnv() {
  return env;
}
