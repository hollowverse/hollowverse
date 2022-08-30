import { NextApiRequest, NextApiResponse } from 'next';
import { getUserAuth } from '~/lib/user-auth';
import { sanityClient } from '~/shared/lib/sanityio';

export async function editGetApi(req: NextApiRequest, res: NextApiResponse) {
  try {
    const docId = req.query.id as string;

    const doc = await sanityClient.getDocument('edit-get-doc', docId);

    if (!doc) {
      return res.status(404).send('Not found');
    }

    /**
     * you get the doc by its ID, and return it to the client.
     *
     * but before that, i should also check if there's a draft version of the doc that exists
     *
     * if there's a draft version, i should return that instead.
     *
     * and if the draft is by a different user than the one who is making the request, i should
     * indicate that the doc is read-only. but if the user who is making the request is the same
     * author of the draft, then it should be editable.
     */
    const draftDoc = await sanityClient.getDocument(
      'edit-get-doc',
      `drafts.${docId}`,
    );
    const auth = getUserAuth(req, res)!;
    const editable = !draftDoc || draftDoc.contributorId === auth.id;

    return res.status(200).json({ doc: draftDoc || doc, editable });
  } catch (err: any) {
    return res
      .status(500)
      .json(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }
}
