import { hFetch } from '~/lib/hFetch';

export async function discourseClientApi(
  apiEndPoint: string,
  payload: { method: 'POST' | 'PUT' | 'GET'; body?: any } = {
    method: 'GET',
  },
) {
  const url = `https://forum.hollowverse.com/${apiEndPoint}`;
  const res = await hFetch(url, {
    method: payload.method,
    headers: {
      'Api-Key': process.env.DISCOURSE_SYSTEM_PRIVILEGE_SECRET!,
      'content-type': 'application/json',
      'Api-Username': 'hollowbot',
    },
    body: JSON.stringify(payload.body),
  });

  return res.json();
}
