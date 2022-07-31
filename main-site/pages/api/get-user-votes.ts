import groq from 'groq';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/api-route-helpers/cors';
import { getAuthenticatedUserId } from '~/lib/api-route-helpers/user-auth';
import { UserVote } from '~/lib/groq/getUser.groq';
import { sanityClientNoCdn } from '~/shared/lib/sanityio';

export default async function getUserVotes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  const userId = getAuthenticatedUserId(req, res);

  if (!userId) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const { factIds } = JSON.parse(req.body) as {
    factIds: string[];
  };

  const userVotes = await sanityClientNoCdn.fetch<{ votes: UserVote[] | null }>(
    'user-votes',
    groq`*[
      _type == 'user' &&
      _id == $userId
    ][0]{
      votes[factId in $factIds]
    }`,
    { userId, factIds },
  );

  return res.status(200).json(userVotes?.votes || []);
}
