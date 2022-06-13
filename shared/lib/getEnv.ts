import { getNodeEnv } from './getNodeEnv';
import { getVercelEnv } from './getVercelEnv';

export function getEnv() {
  if (getNodeEnv() === getVercelEnv()) {
    return getNodeEnv();
  }

  return getVercelEnv() || getNodeEnv();
}
