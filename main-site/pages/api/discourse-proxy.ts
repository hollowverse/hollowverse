import type { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import {
  discourseApiClient,
  DiscourseApiClientArgs,
} from '~/lib/discourseApiClient';
import { getUserAuth } from '~/lib/user-auth';

export default async function discourseProxy(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  await cors(req, res);

  const auth = getUserAuth(req, res);

  if (!auth) {
    return res.status(403).send('Unauthorized');
  }

  const body = JSON.parse(req.body) as DiscourseApiClientArgs;

  const result = await discourseApiClient({
    ...body,
    username: auth.username,
  });

  return res.json(result);
}
