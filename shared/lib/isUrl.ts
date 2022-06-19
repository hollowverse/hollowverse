export function isUrl(s: string) {
  try {
    new URL(s);
  } catch (_) {
    return false;
  }

  return true;
}
