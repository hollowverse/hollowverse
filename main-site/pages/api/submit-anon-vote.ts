import { getCookie } from 'cookies-next';
import groq from 'groq';
import { isEmpty, remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import { HV_TMP_ID_COOKIE_NAME } from '~/components/u/useIdentifyingCookie';
import { cors } from '~/lib/api-route-helpers/cors';
import { sanityWriteToken } from '~/lib/api-route-helpers/sanityWriteToken';
import { calculateVoteOperations } from '~/lib/calculateVoteOperations';
import { oneMonth } from '~/lib/date';
import { FactVotes, factVotesProjection } from '~/lib/groq/fact.projection';
import { User, UserVote } from '~/lib/groq/getUser.groq';
import { redis } from '~/lib/redis';
import { log } from '~/shared/lib/log';
import { sanityClient, sanityClientNoCdn } from '~/shared/lib/sanityio';

export type FactUserVote = {
  likes: number;
  dislikes: number;
  choice: UserVote['choice'] | null;
};

const ongoingVoting: string[] = [];

export default async function submitVote(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  let userId: string | null = '';

  try {
    userId = getCookie(HV_TMP_ID_COOKIE_NAME, { req, res }) as string;

    if (!userId) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    const newVoteRequest = JSON.parse(req.body) as UserVote;
    const newVote = { _key: uuid(), ...newVoteRequest } as UserVote;

    if (
      typeof newVote.factId !== 'string' ||
      (newVote.choice !== 'like' && newVote.choice !== 'dislike')
    ) {
      return res.status(500).json({ message: 'Bad request' });
    }

    if (ongoingVoting.includes(userId)) {
      return res.status(500).json({ message: 'Wait for request to finish' });
    }

    ongoingVoting.push(userId);

    log(
      'debug',
      `user vote; user ID ${userId}; fact ID ${newVote.factId}; choice: ${newVote.choice}`,
    );

    let [user, factVotes] = await getUserAndFactVotes(userId);

    if (isEmpty(factVotes) || !factVotes) {
      return res.status(500).json({ message: 'Fact does not exist' });
    }

    if (isEmpty(user) || !user) {
      user = { _id: userId, votes: [] };
    }

    const existingVote = user.votes.find((v) => v.factId === newVote.factId);
    const voteOperations = calculateVoteOperations(existingVote, newVote);

    if (voteOperations.operation === 'add') {
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
      redis.set(userId, user, { ex: oneMonth }),
      sanityClient
        .patch('fact-votes', newVote.factId)
        .set(totals)
        .commit({ token: sanityWriteToken }),
    ]);

    removeUserFromOngoingVotes(userId);

    return res.status(200).json({
      ...totals,
      choice: voteOperations.operation === 'remove' ? null : newVote.choice,
    });

    function getUserAndFactVotes(_userId: string) {
      return Promise.all([
        redis.get<User>(_userId),
        sanityClientNoCdn.fetch<FactVotes>(
          'fact-votes',
          groq`*[_type == 'fact' && _id == $factId][0]{${factVotesProjection}}`,
          { factId: newVote.factId },
        ),
      ]);
    }
  } catch (err: any) {
    removeUserFromOngoingVotes(userId);

    return res
      .status(500)
      .json(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }

  function removeUserFromOngoingVotes(_userId: string | null) {
    remove(ongoingVoting, (uid) => uid === _userId);
  }
}
