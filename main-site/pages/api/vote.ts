import groq from 'groq';
import { isEmpty, remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/api-route-helpers/cors';
import { sanityWriteToken } from '~/lib/api-route-helpers/sanityWriteToken';
import { getAuthenticatedUserId } from '~/lib/api-route-helpers/user-auth';
import { calculateVoteOperations } from '~/lib/calculateVoteOperations';
import { FactVotes, factVotesProjection } from '~/lib/groq/fact.projection';
import { getUserGroq, User, UserVote } from '~/lib/groq/getUser.groq';
import { sanityClient, sanityClientNoCdn } from '~/shared/lib/sanityio';

export type FactUserVote = {
  likes: number;
  dislikes: number;
  choice: UserVote['choice'];
};

const ongoingVotes: string[] = [];

export default async function vote(req: NextApiRequest, res: NextApiResponse) {
  cors(req, res);

  const userId = getAuthenticatedUserId(req, res);

  if (!userId) {
    return res.status(401).json({ message: 'unauthorized' });
  }

  const newVote = JSON.parse(req.body) as UserVote;

  if (
    typeof newVote.factId !== 'string' ||
    (newVote.choice !== 'like' && newVote.choice !== 'dislike')
  ) {
    throw Error('Bad request');
  }

  if (ongoingVotes.includes(userId)) {
    return res.status(500).json({ message: 'wait for request to finish' });
  }

  ongoingVotes.push(userId);

  try {
    let [user, factVotes] = await getUserAndFactVotes(userId);

    if (isEmpty(factVotes) || !factVotes) {
      throw new Error('Fact does not exist');
    }

    if (isEmpty(user) || !user) {
      user = { _id: userId, votes: [] };
    }

    const existingVote = user.votes.find((v) => v.factId == newVote.factId);
    const voteOperations = calculateVoteOperations(existingVote, newVote);

    if (voteOperations.operation == 'add') {
      user.votes.push(newVote);
    } else {
      remove(user.votes, (v) => v.factId === newVote.factId);

      if (voteOperations.operation === 'replace') {
        user.votes.push(newVote);
      }
    }

    const factLikes = factVotes.likes || 0;
    const factDislikes = factVotes.dislikes || 0;
    const totals = {
      likes: factLikes + voteOperations.likes,
      dislikes: factDislikes + voteOperations.dislikes,
    };

    await Promise.all([
      sanityClient.createOrReplace(
        'cor-user',
        { _type: 'user', ...user },
        { token: sanityWriteToken },
      ),
      sanityClient
        .patch('fact-votes', newVote.factId)
        .set(totals)
        .commit({ token: sanityWriteToken }),
    ]);

    removeUserFromOngoingVotes();

    return res.status(200).json({
      ...totals,
      choice: newVote.choice,
    });
  } catch (e) {
    removeUserFromOngoingVotes();
  }

  function getUserAndFactVotes(userId: string) {
    return Promise.all([
      sanityClientNoCdn.fetch<User>('user', ...getUserGroq(userId)),
      sanityClientNoCdn.fetch<FactVotes>(
        'fact-votes',
        groq`*[_type == 'fact' && _id == $factId][0]{${factVotesProjection}}`,
        { factId: newVote.factId },
      ),
    ]);
  }

  function removeUserFromOngoingVotes() {
    remove(ongoingVotes, (uid) => uid === userId);
  }
}
