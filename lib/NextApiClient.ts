import { log } from '~/lib/log';

export async function NextApiClient(...args: Parameters<typeof fetch>) {
  const res = await fetch(...args);

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const isJson =
      contentType && contentType.indexOf('application/json') !== -1;

    log('error', 'Next API call failed', [
      `url: ${args[0]}; status code: ${res.status}; text: ${res.statusText}`,
      JSON.stringify(isJson ? await res.json() : await res.text()),
    ]);

    return null;
  }

  return res;
}
