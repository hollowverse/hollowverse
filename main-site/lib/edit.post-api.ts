import { SanityDocument } from '@sanity/client';
import { isEmpty, isString } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { Celeb } from '~/lib/celeb.projection';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { EditFormFields, editFormValidate } from '~/lib/editFormValidate';
import { kgToId } from '~/lib/kgToId';
import { sanityWriteToken } from '~/lib/sanityWriteToken';
import { getUserAuth } from '~/lib/user-auth';
import { configuredSanityClient, sanityClient } from '~/shared/lib/sanityio';
import { Json } from '~/shared/lib/types';

export async function editPostApi(req: NextApiRequest, res: NextApiResponse) {
  try {
    /**
     * in this api operation, the user can submit certain doc types to the
     * backend, namely, `celeb` and `position`. and only certain values can be
     * submitted. for now, for the celeb, the values that can be submitted are
     * the dod and dob.
     *
     * so the first thing to do when i get a request here is to validate it.
     *
     * next, check if a draft version of the doc exists.
     */
    const payload = JSON.parse(req.body) as EditFormFields;

    const validationResults = editFormValidate(payload);

    if (!isEmpty(validationResults)) {
      return res.status(500).send('Bad request');
    }

    /**
     * for now, i want to make sure a doc exists, because we only allow edits of
     * existing docs... but, you know, immediately after this i will wanna
     * implement positions, which would allow creation of new docs. so maybe i
     * should already figure this out. yeah, i think i will...
     *
     * i think when i receive a doc that is new, the `id` should be `null`.
     *
     * if the id is `null`, the first step is to determine the type of doc that
     * is being sent, i.e. `celeb` or `position`. then check if it already
     * exists. then check if there's a draft. then check who authored the draft.
     *
     * how would i determine the doc type? i think using heuristics, like
     * checking the existence of certain properties in the object.
     *
     * how would i check if it already exists? a `celeb` submission should
     * include an `id` that exists. if the celeb submission is for a new doc, it
     * should include a kg ID which doesn't exist.
     *
     * when you submit a new position for an existing celeb, the client should
     * provide the ID for whom the position is being submitted. then we can
     * check if the celeb already has that position of not.
     *
     * if the doc doesn't already exist, we create a new one from this
     * submission. but if it does exist, we have to first check if there's
     * already a draft pending because we don't want different users overwriting
     * each other's drafts.
     *
     * if there's a draft, we want to only allow the author of the draft to
     * overwrite his/her changes. otherwise, we want to prevent any edits and
     * unauthorize the operation.
     */
    const auth = getUserAuth(req, res)!;
    const docId = payload.id;
    const type =
      isString(payload.dob) && !isEmpty(payload.dob) ? 'celeb' : null;

    if (!type) {
      return res.status(500).send('Bad request');
    }

    let doc: SanityDocument<Celeb> | undefined;
    let draftDoc: SanityDocument<Celeb> | undefined;
    let editedDoc: SanityDocument<Celeb> | undefined;

    // New doc
    if (!docId) {
      /**
       * @TODO: implement
       */
      return res.status(500).send('Bad request');

      // Existing doc
    } else {
      [doc, draftDoc] = await Promise.all([
        sanityClient.getDocument<Celeb>('edit-post-get-doc', docId),
        sanityClient.getDocument<Celeb>(
          'edit-post-get-draft-doc',
          `drafts.${docId}`,
        ),
      ]);

      if (draftDoc && draftDoc.contributorId !== auth.id) {
        return res.status(403).send('Draft by another user pending');
      }

      if (!draftDoc && !doc) {
        return res.status(404).send('Not found');
      }

      const existingDoc = (draftDoc || doc)!;

      editedDoc = {
        ...existingDoc,
        _id: existingDoc._id,
        _type: type,
        dod: payload.dod,
        dob: payload.dob,
      };

      await configuredSanityClient.createOrReplace(editedDoc, {
        token: sanityWriteToken,
      });
    }

    let discussionTopic: Json;
    /**
     * Now after writing the document, the next important step is updating the forum
     *
     * the system should create or update the celeb edits discussion forum topic
     *
     * the first step in doing that is searching if the forum topic already exists.
     *
     * if it exists, update it. if it doesn't exist, create it and then update it.
     *
     * the category of these forum topics will be `Edits`. Each celeb will have one topic
     * in the `Edits` category. I should find that topic here.
     */
    discussionTopic = await discourseApiClient({
      api: `t/external_id/${kgToId(editedDoc.knowledgeGraphId)}.json`,
    });

    if (!discussionTopic) {
      discussionTopic = await discourseApiClient({
        api: 'posts.json',
        payload: {
          method: 'POST',
          body: {
            title: `${editedDoc.name}'s page edits`,
            raw: `When a contributor submits an edit for ${editedDoc.name}'s page, an automated notification will be posted here. This topic can also be used to discuss edits.`,
            category: 11,
            external_id: kgToId(editedDoc.knowledgeGraphId),
          },
        },
      });
    }

    await discourseApiClient({
      api: 'posts.json',
      payload: {
        method: 'POST',
        body: {
          id: discussionTopic.id,
          raw: `${auth.username} submitted an update\n\n${JSON.stringify({
            dob: payload.dob,
            dod: payload.dod,
          })}`,
        },
      },
    });

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res
      .status(500)
      .json(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }
}
