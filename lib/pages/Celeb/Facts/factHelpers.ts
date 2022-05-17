export function getSourceHost(source: string) {
  const url = new URL(source);
  const parts = url.hostname.split('.');
  const length = parts.length;

  return `${parts[length - 2].toUpperCase()}.${parts[length - 1]}`;
}
