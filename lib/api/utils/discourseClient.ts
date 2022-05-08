export async function discourseClient(
  apiEndPoint: string,
  payload: { method: 'POST' | 'PUT' | 'GET'; body?: any } = {
    method: 'GET',
  },
) {
  const res = await fetch(`https://discuss.hollowverse.com/${apiEndPoint}`, {
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
