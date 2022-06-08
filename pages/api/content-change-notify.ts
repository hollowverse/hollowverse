import { isValidRequest } from '@sanity/webhook';
import groq from 'groq';
import { isEmpty } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { collectErrors } from '~/lib/collectErrors';
import {
  ContentChangeData,
  contentChangeProjection,
} from '~/lib/groq/contentChange.groq';
import { log, loggerStringify, StringJson } from '~/lib/log';
import { performPostPublishChores } from '~/lib/performPostPublishChores';
import { sanityClientNoCdn } from '~/lib/sanityio';

export type SanityWebhookProps = {
  operation: 'create' | 'update' | 'delete';
  _id: string;
  slug: string;
};

async function contentChangeNotify(req: NextApiRequest, res: NextApiResponse) {
  const key = req.headers['idempotency-key'] as string | undefined;
  const { body: webhookPayload } = req as { body: SanityWebhookProps };

  log(
    'debug',
    'content-change-notify',
    ['request received', webhookPayload._id || 'no _id', key || 'no key'],
    webhookPayload,
  );

  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    log('debug', 'content-change-notify', [
      'unauthorized',
      webhookPayload._id || 'no _id',
    ]);

    return res.status(401).json({ message: 'Unauthorized' });
  }

  log('info', 'content-change-notify', [
    webhookPayload.slug,
    webhookPayload._id,
  ]);

  const data = (await sanityClientNoCdn.fetch(
    'content-change-data',
    groq`*[_id == $_id][0]{${contentChangeProjection}}`,
    { _id: webhookPayload._id },
  )) as ContentChangeData | null;

  log(
    'debug',
    'content-change-notify',
    ['sanity data received', webhookPayload._id],
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
            webhookPayload._id,
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
          webhookPayload._id,
          JSON.stringify(e),
        ]);
      }
    })(),
    (async () => {
      if (data) {
        try {
          await performPostPublishChores(data, webhookPayload.operation);
        } catch (e) {
          log('error', 'content-change-notify', [
            'perform publish chores error',
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
