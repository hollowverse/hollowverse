import { remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { editGetApi } from '~/lib/edit.get-api';
import { editPostApi } from '~/lib/edit.post-api';
import { getUserAuth } from '~/lib/user-auth';

const ongoingSubmissions: string[] = [];

export default async function edit(req: NextApiRequest, res: NextApiResponse) {
  cors(req, res);

  let userId: string | null = '';

  try {
    const auth = getUserAuth(req, res);

    if (!auth) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'POST') {
      return editPostApi(req, res);
    } else if (req.method === 'GET') {
      return editGetApi(req, res);
    } else {
      return res.status(500).send('Unrecognized operation');
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
     *
     * So, it looks like this whole thing will need some major changes.
     *
     * i will need to rename this api endpoint to just `edit`. and then make it accept a `get`
     * and a `post` methods.
     *
     * the `get` and `post` will mirror how the documents are structured in the backend, in the database.
     *
     * so the client can request to `get` a celeb. the api will return the `celeb` and it will indicate
     * whether its editable or read-only. the API will request the celeb by its ID. it will be able to request
     * any arbitrary document by ID. this should be safe since there are no private docs in the database.
     *
     * then there is the `post` operation of this api end point. this post operation will be kind of like what
     * initially envisioned this file would be. you'd send the form edits to it, and it would post it as a draft
     * to the db.
     *
     * the client would probably have to send multiple post requests when the forms get complicated, like when
     * i include the other political positions. that should be fine.
     */
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
