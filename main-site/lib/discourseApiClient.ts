import { log } from '~/shared/lib/log';

export async function discourseApiClient(
  requestId: string,
  apiEndPoint: string,
  payload: { method: 'POST' | 'PUT' | 'GET'; body?: any } = {
    method: 'GET',
  },
) {
  const url = `https://forum.hollowverse.com/${apiEndPoint}`;

  log('info', 'discourse api call', [requestId, url]);

  const res = await fetch(url, {
    method: payload.method,
    headers: {
      'Api-Key': process.env.DISCOURSE_SYSTEM_PRIVILEGE_SECRET!,
      'content-type': 'application/json',
      'Api-Username': 'hollowbot',
    },
    body: JSON.stringify(payload.body),
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const isJson =
      contentType && contentType.indexOf('application/json') !== -1;

    log(
      'error',
      'discourse api error',
      [requestId, res.status, res.statusText, url],
      isJson ? await res.json() : undefined,
    );

    return null;
  }

  return (await res.json()) as { [name: string]: any };
}
