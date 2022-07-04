import { defaults } from 'lodash-es';
import { Json } from '~/lib/types';
import { Context, log, LoggableError } from '~/shared/lib/log';
import qs from 'qs';

export async function discourseApiClient<T extends Json>(
  apiEndPoint: string,
  _payload?: {
    method?: 'POST' | 'PUT' | 'GET';
    type?: 'json' | 'urlencoded' | 'form';
    body: Json;
  },
  logContext?: Context,
) {
  const payload = defaults(_payload, {
    method: 'GET',
    type: 'json',
  });
  const url = `https://forum.hollowverse.com/${apiEndPoint}`;

  log(
    'debug',
    `Discourse API call; method: ${payload.method}; end point: ${apiEndPoint}`,
    {
      ...logContext,
      payload,
    },
  );

  let contentType: string | undefined;
  let body: any;

  if (payload.type === 'form') {
    contentType = 'application/x-www-form-urlencoded';
    body = qs.stringify(payload.body);
  } else {
    contentType = 'application/json';
    body = JSON.stringify(payload.body);
  }

  const res = await fetch(url, {
    method: payload.method,
    headers: {
      'Api-Key': process.env.DISCOURSE_SYSTEM_PRIVILEGE_SECRET!,
      'Content-Type': contentType,
      'Api-Username': 'hollowbot',
    },
    body,
  });

  if (!res.ok) {
    const contentType = res.headers.get('content-type');
    const isJson =
      contentType && contentType.indexOf('application/json') !== -1;

    const context = {
      ...logContext,
      payload,
      status: res.status,
      statusText: res.statusText,
      url,
      response: isJson ? await res.json() : await res.text(),
    };

    // console.log(context);

    throw new LoggableError(
      `Discourse API ERROR; method: ${payload.method}; end point: ${apiEndPoint}`,
      context,
    );
  }

  return (await res.json()) as T;
}
