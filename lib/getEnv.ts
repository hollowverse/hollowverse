import { getNodeEnv } from '~/lib/getNodeEnv';
import { getVercelEnv } from '~/lib/getVercelEnv';

export function getEnv() {
  if (getNodeEnv() === getVercelEnv()) {
    return getNodeEnv();
  }

  return getVercelEnv();
}
