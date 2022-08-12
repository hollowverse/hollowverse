import { discourseApiClient } from '~/lib/d/discourseApiClient';
import { getEnv } from '~/shared/lib/getEnv';
import { NextApiRequest, NextApiResponse } from 'next';
import { celebTopContributorsPsql } from '~/lib/t/celebTopContributors.psql';
import { factPageForumDataPsql } from '~/lib/f/factPageForumData';
import { log } from '~/shared/lib/log';

/**
 * This function is meant to be called during development only.
 *
 * This code would work better as a command-line script, but I put
 * it here instead because I need to be able to export
 * TypeScript types from it, and it shares dependencies
 * with the rest of the project.
 */
export default async function createDiscourseApis(
  _req: NextApiRequest,
  res: NextApiResponse,
) {
  if (getEnv() !== 'development') {
    return;
  }

  if (true === true) {
    throw new Error('Uncomment this error to enable this API end point');
  }

  try {
    log('info', 'Discourse APIs updated');

    await discourseApiClient('admin/plugins/explorer/queries/5', {
      method: 'PUT',
      type: 'form',
      body: {
        query: {
          name: 'Top contributors by celebrity',
          description: 'Get the top contributors of a specific celebrity',
          sql: celebTopContributorsPsql,
        },
      },
    });

    await discourseApiClient('admin/plugins/explorer/queries/6', {
      method: 'PUT',
      type: 'form',
      body: {
        query: {
          name: 'Fact page data',
          description: 'Data needed on the Fact page',
          sql: factPageForumDataPsql,
        },
      },
    });

    res.json({ ok: 'Discourse APIs updated' });
  } catch (e) {
    res.json({ error: JSON.stringify(e) });
  }
}
