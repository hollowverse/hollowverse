import { gaEvent } from '~/lib/pages/utils/gtag';

export function logMissingCeleb(name: string) {
  gaEvent('missingCeleb', { name });
}
