import { SanityDocument } from '@sanity/client';
import groq from 'groq';
import { isEmpty, remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { Celeb } from '~/lib/celeb.projection';
import { cors } from '~/lib/cors';
import { EditFormFields, editFormValidate } from '~/lib/editFormValidate';
import { sanityWriteToken } from '~/lib/sanityWriteToken';
import { getUserAuth } from '~/lib/user-auth';
import { configuredSanityClient, sanityClient } from '~/shared/lib/sanityio';

const ongoingSubmissions: string[] = [];

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

    const payload = JSON.parse(req.body) as EditFormFields;

    const validationResults = editFormValidate(payload);

    if (!isEmpty(validationResults)) {
      return res.status(500).send('Bad request');
    }

    /**
     * When I receive a submission here, two things come to mind
     *
     * 1. save it to the database
     * 2. do the forum update thread thing
     *
     * let's start with 1.
     *
     * currently the data i'm receiving is for dob and dod. that's it.
     *
     * this data goes on the celeb profile. so i'll have to write that information there. i will
     * not be writing the username with this information, unlike what i'd do with the positions.
     *
     * i guess i will be writing the information with the celeb because i want to credit users
     * for all of their contributions
     *
     * but the data should be a draft. and while i have a draft, i should not allow another draft,
     * so the celeb should not be editable. this is also the way it has to be because i don't know another way
     * to do it.
     *
     * okay, so then when i receive the payload, i would check if the document already has a draft version,
     * in which case i would not update it. but if there's not a draft version of it, i would
     * publish a new draft version.
     */
    const celeb = await sanityClient.fetch<Celeb>(
      'submit-edit-get-celeb-id',
      groq`*[_type == 'celeb' && slug.current == $slug][0]`,
      { slug: payload.slug },
    );

    if (!celeb) {
      return res.status(500).send('bad request');
    }

    const s = await configuredSanityClient.createOrReplace(
      {
        ...celeb,
        dod: payload.dod,
        dob: payload.dob,
        contributorId: auth.id,
        _type: 'celeb',
        _id: `drafts.${celeb._id}`,
      },
      { token: sanityWriteToken },
    );

    return res.status(200).json({ celeb });

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
    remove(ongoingSubmissions, (uid) => uid === _userId);
  }
}
