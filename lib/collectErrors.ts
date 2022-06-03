export async function collectErrors(fn: any, errors: any[]) {
  try {
    await fn();
  } catch (e) {
    errors.push(e);
  }
}
