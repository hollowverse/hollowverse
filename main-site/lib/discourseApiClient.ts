import { defaults } from 'lodash-es';
import { Json } from '~/shared/lib/types';
import { Context, log, LoggableError } from '~/shared/lib/log';
import qs from 'qs';

export async function discourseApiClient<T extends Json>(args: {
  api: string;
  username?: string;
  payload?: {
    method?: 'POST' | 'PUT' | 'GET';
    type?: 'json' | 'urlencoded' | 'form';
    body: Json;
  };
  logContext?: Context;
}) {
  const payload = defaults(args.payload, {
    method: 'GET',
    type: 'json',
    username: 'hollowbot',
  });
  const url = `https://forum.hollowverse.com/${args.api}`;

  log(
    'debug',
    `Discourse API call; method: ${payload.method}; end point: ${args.api}`,
    {
      ...args.logContext,
      payload,
    },
  );

  let requestContentType: string | undefined;
  let body: any;

  if (payload.type === 'form') {
    requestContentType = 'application/x-www-form-urlencoded';
    body = qs.stringify(payload.body);
  } else {
    requestContentType = 'application/json';
    body = JSON.stringify(payload.body);
  }

  const res = await fetch(url, {
    method: payload.method,
    headers: {
      'Api-Key': process.env.DISCOURSE_SYSTEM_PRIVILEGE_SECRET!,
      'Content-Type': requestContentType,
      'Api-Username': payload.username,
    },
    body,
  });

  if (!res.ok) {
    const responseContentType = res.headers.get('content-type');
    const isJson =
      responseContentType &&
      responseContentType.indexOf('application/json') !== -1;

    const context = {
      ...args.logContext,
      payload,
      status: res.status,
      statusText: res.statusText,
      url,
      response: isJson ? await res.json() : await res.text(),
    };

    // console.log(context);

    throw new LoggableError(
      `Discourse API ERROR; method: ${payload.method}; end point: ${args.api}`,
      context,
    );
  }

  return (await res.json()) as T;
}
