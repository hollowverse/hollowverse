import groq from 'groq';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { getUserAuth } from '~/lib/user-auth';
import { UserVote } from '~/lib/getUser.groq';
import { sanityClientNoCdn } from '~/shared/lib/sanityio';

export default async function getUserVotes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  const auth = getUserAuth(req, res);

  if (!auth) {
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
    { userId: auth.id, factIds },
  );

  return res.status(200).json(userVotes?.votes || []);
}
