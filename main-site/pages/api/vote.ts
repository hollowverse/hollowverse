import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/api-route-helpers/cors';
import { getAuthenticatedUserId } from '~/lib/api-route-helpers/user-auth';

export default async function vote(req: NextApiRequest, res: NextApiResponse) {
  cors(req, res);

  const userId = getAuthenticatedUserId(req, res);

  if (!userId) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  return res.status(200).json({ message: 'looking good!' });
}
