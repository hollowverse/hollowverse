import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidRequest } from '@sanity/webhook';
import { performPostPublishChores } from '~/lib/performPostPublishChores';

export default async function _contentChangeNotify(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { body } = req;

  await res.unstable_revalidate(`/${body.slug}`);
  await res.unstable_revalidate(`/~latest`);

  if (body.operation === 'create') {
    await performPostPublishChores(body.forumLink, body.slug);
  }

  return res.json({ revalidated: true });
}

// export const contentChangeNotify = withSentry(_contentChangeNotify);
// export const contentChangeNotify = _contentChangeNotify;
