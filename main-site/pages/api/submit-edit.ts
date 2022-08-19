import groq from 'groq';
import { isEmpty, remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { sanityWriteToken } from '~/lib/sanityWriteToken';
import { getUserAuth } from '~/lib/user-auth';
import { calculateVoteOperations } from '~/lib/calculateVoteOperations';
import { FactVotes, factVotesProjection } from '~/lib/fact.projection';
import { getUserGroq, User, UserVote } from '~/lib/getUser.groq';
import { sanityClient, sanityClientNoCdn } from '~/shared/lib/sanityio';
import { v4 as uuid } from 'uuid';

const ongoingVoting: string[] = [];

export default async function submitEdit(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  let userId: string | null = '';

  try {
    const auth = getUserAuth(req, res);

    if (!auth) {
      return res.status(401).json({ message: 'unauthorized' });
    }

    return res.status(200).json(JSON.parse(req.body));

    // userId = auth.id;

    // const newVoteRequest = JSON.parse(req.body) as UserVote;
    // const newVote = { _key: uuid(), ...newVoteRequest } as UserVote;

    // if (
    //   typeof newVote.factId !== 'string' ||
    //   (newVote.choice !== 'like' && newVote.choice !== 'dislike')
    // ) {
    //   return res.status(500).json({ message: 'Bad request' });
    // }

    // if (ongoingVoting.includes(userId)) {
    //   return res.status(500).json({ message: 'Wait for request to finish' });
    // }

    // ongoingVoting.push(userId);

    // let [user, factVotes] = await getUserAndFactVotes(userId);

    // if (isEmpty(factVotes) || !factVotes) {
    //   return res.status(500).json({ message: 'Fact does not exist' });
    // }

    // if (isEmpty(user) || !user) {
    //   user = { _id: userId, votes: [] };
    // }

    // const existingVote = user.votes.find((v) => v.factId === newVote.factId);
    // const voteOperations = calculateVoteOperations(existingVote, newVote);

    // if (voteOperations.operation === 'add') {
    //   user.votes.push(newVote);
    // } else {
    //   remove(user.votes, (v) => v.factId === newVote.factId);

    //   if (voteOperations.operation === 'replace') {
    //     user.votes.push(newVote);
    //   }
    // }

    // const factLikes = factVotes.likes || 0;
    // const factDislikes = factVotes.dislikes || 0;
    // const totals = {
    //   likes: factLikes + voteOperations.likes,
    //   dislikes: factDislikes + voteOperations.dislikes,
    // };

    // await Promise.all([
    //   sanityClient.createOrReplace(
    //     'cor-user',
    //     { _type: 'user', ...user },
    //     { token: sanityWriteToken },
    //   ),
    //   sanityClient
    //     .patch('fact-votes', newVote.factId)
    //     .set(totals)
    //     .commit({ token: sanityWriteToken }),
    // ]);

    // removeUserFromOngoingVotes(userId);

    // return res.status(200).json({
    //   ...totals,
    //   choice: voteOperations.operation === 'remove' ? null : newVote.choice,
    // });

    // function getUserAndFactVotes(_userId: string) {
    //   return Promise.all([
    //     sanityClientNoCdn.fetch<User>('user', ...getUserGroq(_userId)),
    //     sanityClientNoCdn.fetch<FactVotes>(
    //       'fact-votes',
    //       groq`*[_type == 'fact' && _id == $factId][0]{${factVotesProjection}}`,
    //       { factId: newVote.factId },
    //     ),
    //   ]);
    // }
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
