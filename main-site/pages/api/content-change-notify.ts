import { isValidRequest } from '@sanity/webhook';
import delay from 'delay';
import groq from 'groq';
import { isError } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import {
  ContentChangeData,
  contentChangeProjection,
} from '~/lib/groq/contentChange.groq';
import { NewFactChores } from '~/lib/NewFactChores';
import { Json } from '~/lib/types';
import { logger } from '~/shared/lib/log';
import { logTask } from '~/shared/lib/log.server';
import { sanityClientNoCdn } from '~/shared/lib/sanityio';

export type SanityWebhookProps = {
  _id: string;
  _rev: string;
  slug: string;
  operation: 'create' | 'update' | 'delete';
};

async function contentChangeNotify(
  req: NextApiRequest,
  res: NextApiResponse,
  webhookPayload: SanityWebhookProps,
  logWithContext: typeof logger,
  logContext: Json,
) {
  logWithContext.info(
    `Received a new content change notification (CCN) for ${webhookPayload.slug}, Fact ID ${webhookPayload._id}`,
  );

  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    logWithContext.info('The CCN request did not pass authorization');
    return;
  }

  logWithContext.debug('The CCN request was confirmed to be from Sanity.');

  let data: ContentChangeData | null = null;

  for (let i = 0; i < 5; i++) {
    logWithContext.info(`ATTEMPT #${i + 1}: Retrieving Fact data from Sanity`);

    data = await sanityClientNoCdn.fetch<ContentChangeData>(
      'webhook content change data',
      groq`*[_id == $_id][0]{${contentChangeProjection}}`,
      { _id: webhookPayload._id },
    );

    if (data && data._id) {
      logWithContext.info(`SUCCESS: Retrieved Fact data from Sanity`);

      break;
    } else {
      const ms = 2000;
      logWithContext.info(
        `Sanity data came back empty. Will try again in ${ms}ms`,
      );
      await delay(ms);
    }
  }

  if (!data) {
    logWithContext.error('FATAL: Could not retrieve data from Sanity');
    return;
  }

  function revalidatePath(path: string) {
    return logTask(
      `Refresh path https://hollowverse.com${path}`,
      () => res.unstable_revalidate(path),
      logContext,
    );
  }

  const results = [];

  results.push(
    ...(await Promise.all([
      revalidatePath(`/${webhookPayload.slug}`),
      revalidatePath(`/`),
    ])),
    await logTask(
      'Performing new Fact chores',
      () => {
        const newFactChores = new NewFactChores(
          data!,
          webhookPayload.operation,
          logContext,
        );

        return newFactChores.run();
      },
      logContext,
    ),
  );

  if (results.some((r) => isError(r))) {
    await logWithContext.error('Finished CCN with errors');
  } else {
    await logWithContext.info('Success! CCN completed without errors.');
  }
}

export default async function contentChangeNotifyWrapper(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { body: webhookPayload } = req as { body: SanityWebhookProps };
  const logContext = {
    debugParams: { webhookPayload },
    requestName: `${webhookPayload._id || 'missing'};${
      webhookPayload._rev || 'missing'
    }`,
  };

  const logWithContext = logger.child(logContext);

  try {
    await contentChangeNotify(
      req,
      res,
      webhookPayload,
      logWithContext,
      logContext,
    );
  } catch (e: any) {
    await logWithContext.error(
      'Unexpected error occurred while running CCN routine',
    );
    await logWithContext.error(e);
  }

  /**
   * This webhook route should never return errors to the caller, since the caller
   * doesn't care about our errors. We log the errors and successes for
   * devs to look at.
   */
  res.json({ ok: true });
}
