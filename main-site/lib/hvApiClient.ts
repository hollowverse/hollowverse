import { Json } from '~/shared/lib/types';

type Init = Parameters<typeof fetch>[1];

export async function hvApiClient<T extends Json>(apiName: string, init: Init) {
  const results = await fetch(`/api/${apiName}`, init);

  if (results.status == 401 && typeof window !== 'undefined') {
    window.location.href = '/api/login';
    return null;
  }

  return results.json() as Promise<T>;
}

export function post(body: Json): Init {
  return {
    method: 'POST',
    body: JSON.stringify(body),
  };
}
