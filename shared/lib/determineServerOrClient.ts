export function determineServerOrClient() {
  if (typeof window === 'undefined') {
    return 'server';
  }

  return 'client';
}
