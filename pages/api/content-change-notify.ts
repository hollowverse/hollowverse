import { isValidRequest } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { log } from '~/lib/log';
import { performPostPublishChores } from '~/lib/performPostPublishChores';

async function contentChangeNotify(req: NextApiRequest, res: NextApiResponse) {
  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { body } = req;

  log().info('content-change-notified', { body });

  await Promise.all([
    res.unstable_revalidate(`/${body.slug}`),
    res.unstable_revalidate(`/~latest`),
    body.operation === 'create'
      ? performPostPublishChores(body.forumLink, body.slug)
      : null,
  ]);

  return res.json({ revalidated: true });
}

export default apiHandlerWithErrorLogging(contentChangeNotify);
