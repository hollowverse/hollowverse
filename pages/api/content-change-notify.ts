import { isValidRequest } from '@sanity/webhook';
import type { NextApiRequest, NextApiResponse } from 'next';
import { log } from '~/lib/log';
import { performPostPublishChores } from '~/lib/performPostPublishChores';

async function contentChangeNotify(req: NextApiRequest, res: NextApiResponse) {
  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { body } = req;

  log().info('content-change-notify', { body });

  await Promise.all([
    res.unstable_revalidate(`/${body.slug}`),
    res.unstable_revalidate(`/~latest`),
    body.operation === 'create'
      ? performPostPublishChores(body.forumLink, body.slug)
      : null,
  ]);

  return res.json({ revalidated: true });
}

export default async function withErrorHandling(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    return await contentChangeNotify(req, res);
  } catch (e) {
    log().error(e as any, {
      message: 'content-change-notify-error',
    });

    /**
     * This `content-change-notify` API handler triggered by a Sanity webhook.
     * And the Sanity webhook will keep retrying infinitely if we return
     * anything but success.
     *
     * So we just log whatever the issue is and tell the webhook "ok" to shut it
     * up.
     */
    return res.json({ ok: true });
  }
}
