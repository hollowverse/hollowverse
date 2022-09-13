import { remove } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { editPostApi } from '~/lib/edit.post-api-old';
import { getUserAuth } from '~/lib/user-auth';

const ongoingSubmissions: string[] = [];

export default async function summaryFormSubmit(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);

  let userId: string | null = '';

  try {
    if (req.method === 'POST') {
      const auth = getUserAuth(req, res);

      if (!auth) {
        return res.status(401).send('Unauthorized');
      }

      return editPostApi(req, res);
    } else {
      return res.status(500).send('Unrecognized operation');
    }
  } catch (err: any) {
    removeUserFromOngoingSubmissions(userId);

    return res
      .status(500)
      .json(JSON.stringify(err, Object.getOwnPropertyNames(err)));
  }

  function removeUserFromOngoingSubmissions(_userId: string | null) {
    remove(ongoingSubmissions, (uid) => uid === _userId);
  }
}
