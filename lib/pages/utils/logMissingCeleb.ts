import { gaEvent } from '~/lib/pages/utils/gtag';

export function logMissingCeleb(celebName: string) {
  gaEvent('missingCeleb', celebName);
}
