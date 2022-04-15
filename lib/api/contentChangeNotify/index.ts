import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidRequest } from '@sanity/webhook';
import { performPostPublishChores } from '~/lib/api/contentChangeNotify/performPostPublishChores';

export async function contentChangeNotify(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { body } = req;

  await res.unstable_revalidate(`/${body.slug}`);

  if (body.operation === 'create') {
    await performPostPublishChores(body.forumLink, body.slug);
  }

  return res.json({ revalidated: true });
}
