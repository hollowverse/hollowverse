import { getCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import { HV_TMP_ID_COOKIE_NAME } from '~/lib/u/useIdentifyingCookie';
import { cors } from '~/lib/api-route-helpers/cors';
import { HAS_VOTED_COOKIE_NAME } from '~/lib/constants';
import { User } from '~/lib/groq/getUser.groq';
import { redis } from '~/lib/redis';

export default async function getUserVotes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  const userId = getCookie(HV_TMP_ID_COOKIE_NAME, { req, res }) as string;

  if (!userId) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const hasVoted = getCookie(HAS_VOTED_COOKIE_NAME, { req, res });

  if (hasVoted !== true) {
    return res.status(200).json([]);
  }

  const user = await redis.get<User>(userId);

  if (!user) {
    return res.status(200).json([]);
  }

  return res.status(200).json(user.votes);
}
