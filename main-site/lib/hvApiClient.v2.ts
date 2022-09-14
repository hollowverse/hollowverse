import { Json } from '~/shared/lib/types';

type Init = Parameters<typeof fetch>[1];

export async function hvApiClient(apiName: string, init?: Init) {
  return fetch(`/api/${apiName}`, init);
}

export function post(body: Json): Init {
  return {
    method: 'POST',
    body: JSON.stringify(body),
  };
}
