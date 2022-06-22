import { determineAppUrl } from './determineAppUrl';
import { logger } from './log';
import { Json } from './types';

export async function nextApiClient(pathname: string, init?: RequestInit) {
  const url = `${determineAppUrl()}/api/${pathname}`;

  logger.info(
    init
      ? {
          debugInfo: { payload: init as Json },
        }
      : undefined,
    `next api call: ${url}`,
  );

  const res = await fetch(url, init);

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const isJson =
      contentType && contentType.indexOf('application/json') !== -1;

    logger.error(
      { debugInfo: { response: isJson ? await res.json() : await res.text() } },
      `next api call failed; url: ${url}; status code: ${res.status}; status: ${res.statusText}`,
    );

    return null;
  }

  return (await res.json()) as { [name: string]: any };
}
