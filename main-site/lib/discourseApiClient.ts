import { Json } from '~/shared/lib/types';
import {
  logger,
  LoggableError,
  mergeParams as mergeParams,
} from '~/shared/lib/log';

export async function discourseApiClient<T extends Json>(
  apiEndPoint: string,
  payload: { method: 'POST' | 'PUT' | 'GET'; body?: any } = {
    method: 'GET',
  },
  logContext?: Json,
) {
  const url = `https://forum.hollowverse.com/${apiEndPoint}`;

  logger.debug(
    {
      ...logContext,
      debugParams: mergeParams(logContext, { payload }),
    },
    `Discourse API call; method: ${payload.method}; end point: ${apiEndPoint}`,
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
        debugParams: mergeParams(logContext, {
          payload,
          response: isJson ? await res.json() : await res.text(),
          url,
        }),
        status: res.status,
        statusText: res.statusText,
      },
    );
  }

  return (await res.json()) as T;
}
