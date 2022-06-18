import { isValidRequest } from '@sanity/webhook';
import groq from 'groq';
import { isError } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuid } from 'uuid';
import {
  ContentChangeData,
  contentChangeProjection,
} from '~/lib/groq/contentChange.groq';
import { NewFactChores } from '~/lib/NewFactChores';
import { createContextLogger, log, logTask } from '~/shared/lib/log';
import { sanityClientNoCdn } from '~/shared/lib/sanityio';

export type SanityWebhookProps = {
  _id: string;
  _rev: string;
  slug: string;
  operation: 'create' | 'update' | 'delete';
};

async function contentChangeNotify(req: NextApiRequest, res: NextApiResponse) {
  /*
  Who ever calls this routine doesn't need to wait around for it to finish.
  The success and errors of this routine get reported to the logging system.
  */
  res.json({ ok: true });

  const { body: webhookPayload } = req as { body: SanityWebhookProps };
  const requestId = uuid();
  const logContext = {
    webhookPayload,
    requestId,
    requestName: `${webhookPayload._id || 'missing'};${
      webhookPayload._rev || 'missing'
    }`,
  };

  // return;

  const logWithContext = createContextLogger(logContext);

  await logWithContext(
    'info',
    `Received a new content change notification (CCN) for ${webhookPayload.slug}, Fact ID ${webhookPayload._id}`,
  );

  if (!isValidRequest(req, process.env.PRIVILEGED_API_SECRET!)) {
    logWithContext('info', 'The CCN request did not pass authorization');
    return;
  }

  logWithContext('info', 'The CCN request was confirmed to be from Sanity.');

  logWithContext('info', 'Attempting to retrieve fresh data from Sanity...');

  const data = await logTask(
    'Retrieve fresh data from Sanity',
    () =>
      sanityClientNoCdn.fetch<ContentChangeData>(
        requestId,
        groq`*[_id == $_id][0]{${contentChangeProjection}}`,
        { _id: webhookPayload._id },
      ),
    logContext,
  );

  if (isError(data) || !data) {
    logWithContext('error', 'Could not retrieve data from Sanity', logContext);
    return;
  }

  async function revalidatePath(path: string) {
    return logTask(
      `Refresh path https://hollowverse.com${path}`,
      () => res.unstable_revalidate(path),
      logContext,
    );
  }

  const results = await Promise.all([
    revalidatePath(`/${webhookPayload.slug}`),
    revalidatePath(`/`),
    logTask(
      'Performing new Fact chores',
      () => {
        const newFactChores = new NewFactChores(
          data,
          webhookPayload.operation,
          logContext,
        );

        return newFactChores.run();
      },
      logContext,
    ),
  ]);

  if (results.some((r) => isError(r))) {
    await logWithContext('error', 'Finished CCN with errors');
  } else {
    await logWithContext('info', 'Success! CCN completed without errors.');
  }
}

export default async function withErrorHandling(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    return await contentChangeNotify(req, res);
  } catch (e: any) {
    log('error', 'Unexpected error occurred while running CCN routine');
    log('error', e);

    // No need to res.json() from here since `contentChangeNotify` does that
    // very first.
  }
}
