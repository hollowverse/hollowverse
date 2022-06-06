import { isValidRequest } from '@sanity/webhook';
import groq from 'groq';
import { isEmpty } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { collectErrors } from '~/lib/collectErrors';
import {
  ContentChangeData,
  contentChangeProjection,
} from '~/lib/groq/contentChange.groq';
import { log } from '~/lib/log';
import { performPostPublishChores } from '~/lib/performPostPublishChores';
import { sanityClientNoCdn } from '~/lib/sanityio';

export type SanityWebhookProps = {
  operation: 'create' | 'update' | 'delete';
  _id: string;
  slug: string;
};

async function contentChangeNotify(req: NextApiRequest, res: NextApiResponse) {
  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { body: webhookPayload } = req as { body: SanityWebhookProps };

  log('info', 'content-change-notify', [webhookPayload.slug]);

  const errors: any[] = [];

  const data = (await sanityClientNoCdn.fetch(
    'content-change-data',
    groq`*[_id == $_id][0]{${contentChangeProjection}}`,
    { _id: webhookPayload._id },
  )) as ContentChangeData;

  await Promise.all([
    collectErrors(() => res.unstable_revalidate(`/${data.slug}`), errors),
    collectErrors(() => res.unstable_revalidate(`/~latest`), errors),
    collectErrors(
      () => performPostPublishChores(data, webhookPayload.operation),
      errors,
    ),
  ]);

  if (!isEmpty(errors)) {
    throw errors;
  }

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
