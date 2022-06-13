import { RequestInit } from 'next/dist/server/web/spec-extension/request';
import { determineAppUrl } from './determineAppUrl';
import { log } from './log';

export async function nextApiClient(pathname: string, init?: RequestInit) {
  const url = `${determineAppUrl()}/api/${pathname}`;

  log('info', 'next api call', [url]);

  const res = await fetch(url, init);

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const isJson =
      contentType && contentType.indexOf('application/json') !== -1;

    log('error', 'Next API call failed', [
      `url: ${url}; status code: ${res.status}; text: ${res.statusText}`,
      JSON.stringify(isJson ? await res.json() : await res.text()),
    ]);

    return null;
  }

  return (await res.json()) as { [name: string]: any };
}
