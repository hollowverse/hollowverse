import groq from 'groq';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/api-route-helpers/cors';
import { FactVotes, factVotesProjection } from '~/lib/groq/fact.projection';
import { sanityClientNoCdn } from '~/shared/lib/sanityio';

export default async function factVotes(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  const { factIds } = JSON.parse(req.body) as { factIds: string[] };

  const factVotes = await sanityClientNoCdn.fetch<FactVotes[]>(
    'fact-votes',
    groq`*[
      _type == 'fact' &&
      _id in $factIds
    ]{${factVotesProjection}}`,
    { factIds },
  )!;

  return res.status(200).json(
    factVotes.map((fv) => ({
      ...fv,
      likes: fv.likes || 0,
      dislikes: fv.dislikes || 0,
    })),
  );
}
