import { isValidRequest } from '@sanity/webhook';
import groq from 'groq';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ContentChangeData,
  contentChangeProjection,
} from '~/lib/groq/contentChange.groq';
import { log } from '~/lib/log';
import { performPostPublishChores } from '~/lib/performPostPublishChores';
import { sanityClientNoCdn } from '~/lib/sanityio';
import { v4 as uuid } from 'uuid';

export type SanityWebhookProps = {
  operation: 'create' | 'update' | 'delete';
  _id: string;
  slug: string;
};

async function contentChangeNotify(req: NextApiRequest, res: NextApiResponse) {
  const requestId = uuid();
  const { body: webhookPayload } = req as { body: SanityWebhookProps };

  log(
    'info',
    'content-change-notify',
    ['request received', requestId, webhookPayload._id || 'no _id'],
    webhookPayload,
  );

  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    log('info', 'content-change-notify', ['unauthorized', requestId]);

    return res.status(401).json({ message: 'Unauthorized' });
  }

  const data = (await sanityClientNoCdn.fetch(
    requestId,
    groq`*[_id == $_id][0]{${contentChangeProjection}}`,
    { _id: webhookPayload._id },
  )) as ContentChangeData | null;

  log(
    'info',
    'content-change-notify',
    ['sanity data received', requestId],
    data as any,
  );

  await Promise.all([
    (async () => {
      const revalidationRoute = `/${webhookPayload.slug}`;

      try {
        await res.unstable_revalidate(revalidationRoute);
      } catch (e: any) {
        log(
          'error',
          'content-change-notify',
          [
            `revalidation failed: ${revalidationRoute}`,
            requestId,
            JSON.stringify(e),
          ],
          e,
        );
      }
    })(),
    (async () => {
      const revalidationRoute = `/~latest`;

      try {
        await res.unstable_revalidate(revalidationRoute);
      } catch (e: any) {
        log('error', 'content-change-notify', [
          `revalidation failed: ${revalidationRoute}`,
          requestId,
          JSON.stringify(e),
        ]);
      }
    })(),
    (async () => {
      if (data) {
        try {
          await performPostPublishChores(
            data,
            webhookPayload.operation,
            requestId,
          );
        } catch (e) {
          log('error', 'content-change-notify', [
            'perform publish chores error',
            requestId,
            JSON.stringify(e),
          ]);
        }
      }
    })(),
  ]);

  return res.json({ revalidated: true });
}

export default async function withErrorHandling(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    return await contentChangeNotify(req, res);
  } catch (e: any) {
    log('error', e, ['content-change-notify-error']);

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
