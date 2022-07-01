import { Json } from '~/lib/types';
import { Context, log, LoggableError } from '~/shared/lib/log';

export async function discourseApiClient<T extends Json>(
  apiEndPoint: string,
  payload: { method: 'POST' | 'PUT' | 'GET'; body?: Json } = {
    method: 'GET',
  },
  logContext?: Context,
) {
  const url = `https://forum.hollowverse.com/${apiEndPoint}`;

  log(
    'debug',
    `Discourse API call; method: ${payload.method}; end point: ${apiEndPoint}`,
    {
      ...logContext,
      payload,
    },
  );

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

    throw new LoggableError(
      `Discourse API ERROR; method: ${payload.method}; end point: ${apiEndPoint}`,
      {
        ...logContext,
        payload,
        status: res.status,
        statusText: res.statusText,
        url,
        response: isJson ? await res.json() : await res.text(),
      },
    );
  }

  return (await res.json()) as T;
}
