import { gaEvent } from '~/lib/components/gtag';

export function logMissingCeleb(name: string) {
  gaEvent('missingCeleb', { name });
}
