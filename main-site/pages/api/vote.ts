import groq from 'groq';
import { isEmpty, remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/api-route-helpers/cors';
import { sanityWriteToken } from '~/lib/api-route-helpers/sanityWriteToken';
import { getAuthenticatedUserId } from '~/lib/api-route-helpers/user-auth';
import { FactVotes, factVotesProjection } from '~/lib/groq/fact.projection';
import { getUserGroq, User, UserVote } from '~/lib/groq/getUser.groq';
import { sanityClient, sanityClientNoCdn } from '~/shared/lib/sanityio';

export type FactUserVote = {
  likes: number;
  dislikes: number;
  choice: UserVote['choice'];
};

export default async function vote(req: NextApiRequest, res: NextApiResponse) {
  cors(req, res);

  console.log('new request to vote');

  const userId = getAuthenticatedUserId(req, res);

  if (!userId) {
    console.log(`user is not authenticated`, { userId });

    return res.status(401).json({ message: 'unauthorized' });
  }

  const newVote = JSON.parse(req.body) as UserVote;
  console.log('newVote', newVote);

  if (
    typeof newVote.factId !== 'string' ||
    (newVote.choice !== null &&
      newVote.choice !== 'like' &&
      newVote.choice !== 'dislike')
  ) {
    throw Error('Bad request');
  }

  let [user, factVotes] = await Promise.all([
    sanityClientNoCdn.fetch<User>('user', ...getUserGroq(userId)),
    sanityClientNoCdn.fetch<FactVotes>(
      'fact-votes',
      groq`*[_type == 'fact' && _id == $factId][0]{${factVotesProjection}}`,
      { factId: newVote.factId },
    ),
  ]);

  console.log('user', user);
  console.log('factVotes', factVotes);

  if (isEmpty(factVotes) || !factVotes) {
    throw new Error('Fact does not exist');
  }

  factVotes.likes = factVotes.likes || 0;
  factVotes.dislikes = factVotes.dislikes || 0;

  console.log('updated factVotes', factVotes);

  if (isEmpty(user) || !user) {
    // No user in DB, create new user object.
    user = { _id: userId, votes: [] };

    console.log('user object created');
  }

  // Find an existing vote for this fact by the same user
  const existingVote = user.votes.find((v) => v.factId == newVote.factId);

  console.log('existingVote', existingVote);
  console.log('newVote', newVote);

  // The user is changing their vote, or submitting the same vote again
  if (existingVote) {
    // They are submitting the same vote again. Nothing to do in this case
    if (existingVote.choice == newVote.choice) {
      console.log('all the same. return');
      return res.status(200).json({
        likes: factVotes.likes,
        dislikes: factVotes.dislikes,
        choice: existingVote.choice,
      });
    }

    // Otherwise, they are changing their vote
    // So let's remove the existing vote
    remove(user.votes, (v) => v.factId == newVote.factId);
    console.log('removed existing vote');
  }

  // At this point, we know that we have a new, different vote.
  // The user's `choice` is either `null`, `like`, or `dislike`
  // Let's first add their new vote to their votes array
  user.votes.push(newVote);
  console.log('pushed new vote');

  // Now we need to adjust the `likes` and `dislikes` of the Fact
  const newLike = newVote.choice === 'like';
  const newDislike = newVote.choice === 'dislike';
  const removedLike =
    newVote.choice === null && existingVote && existingVote.choice === 'like';
  const removedDislike =
    newVote.choice === null &&
    existingVote &&
    existingVote.choice === 'dislike';

  const newFactVotes = {
    likes: newLike
      ? factVotes.likes + 1
      : removedLike
      ? factVotes.likes - 1
      : factVotes.likes,
    dislikes: newDislike
      ? factVotes.dislikes + 1
      : removedDislike
      ? factVotes.dislikes - 1
      : factVotes.dislikes,
  };

  console.log('factVotes', factVotes);
  console.log('newFactVotes', newFactVotes);
  console.log('user', user);

  // Now we save the stuff to the DB
  await Promise.all([
    sanityClient.createOrReplace(
      'cor-user',
      {
        _type: 'user',
        ...user,
      },
      { token: sanityWriteToken },
    ),
    sanityClient.patch('fact-votes', newVote.factId, {
      set: { likes: newFactVotes.likes, dislikes: newFactVotes.dislikes },
    }),
  ]);

  return res.status(200).json({
    likes: newFactVotes.likes,
    dislikes: newFactVotes.dislikes,
    choice: newVote.choice,
  });
}
