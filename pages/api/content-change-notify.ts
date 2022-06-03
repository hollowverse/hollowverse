import { isValidRequest } from '@sanity/webhook';
import { isEmpty } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { collectErrors } from '~/lib/collectErrors';
import { FactTypes, Tag, Topic } from '~/lib/groq/fact.partial.groq';
import { Picture } from '~/lib/groq/picture.partial.groq';
import { log } from '~/lib/log';
import { performPostPublishChores } from '~/lib/performPostPublishChores';

export type SanityWebhookPayload = {
  _id: string;
  _createdAt: string;
  content: string;
  context: string;
  quote: string;
  date: string;
  forumLink: string;
  source: string;
  type: FactTypes;
  tags: Tag[];
  topics: Topic[];
  name: string;
  slug: string;
  picture: Picture;
  operation: 'create' | 'update' | 'delete';
};

async function contentChangeNotify(req: NextApiRequest, res: NextApiResponse) {
  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const errors: any[] = [];
  const { body: webhookPayload } = req as { body: SanityWebhookPayload };

  log().info('content-change-notify', {
    webhookPayload: webhookPayload as any,
  });

  await Promise.all([
    collectErrors(
      () => res.unstable_revalidate(`/${webhookPayload.slug}`),
      errors,
    ),
    collectErrors(() => res.unstable_revalidate(`/~latest`), errors),
    collectErrors(() => performPostPublishChores(webhookPayload), errors),
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
