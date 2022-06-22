import { determineAppUrl } from './determineAppUrl';
import { Context, log } from './log';

export async function nextApiClient(pathname: string, init?: RequestInit) {
  const url = `${determineAppUrl()}/api/${pathname}`;

  log(
    'info',
    `next api call: ${url}`,
    init
      ? {
          payload: init as Context,
        }
      : undefined,
  );

  const res = await fetch(url, init);

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const isJson =
      contentType && contentType.indexOf('application/json') !== -1;

    log(
      'error',
      `next api call failed; url: ${url}; status code: ${res.status}; status: ${res.statusText}`,
      { response: isJson ? await res.json() : await res.text() },
    );

    return null;
  }

  return (await res.json()) as { [name: string]: any };
}
