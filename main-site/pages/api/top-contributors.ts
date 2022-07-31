import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/api-route-helpers/cors';
import { discoursePsqlQuery } from '~/lib/discoursePsqlQuery';
import { processForumContributorFields } from '~/lib/getStatic/helpers/processForumContributorFields';
import { TopContributors } from '~/lib/psql/celebTopContributors.psql';
import { setApiCache } from '~/lib/api-route-helpers/setApiCache';
import { log } from '~/shared/lib/log';

export type TopContributorsResults = Awaited<
  ReturnType<typeof topContributors>
>;
export type TopContributorsQueryParams = { slug: string };

export async function topContributors(slug: string) {
  try {
    const topContributors = await discoursePsqlQuery({
      name: 'top-contributors',
      params: { slug: slug },
    });

    if (!topContributors) {
      return null;
    }

    return topContributors.map(
      processForumContributorFields,
    ) as TopContributors;
  } catch (e) {
    log('error', 'Error retrieving top contributors', { error: e as any });

    return null;
  }
}

export default async function topContributorsApi(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);
  setApiCache(res);

  const { slug } = req.query as TopContributorsQueryParams;

  return res.status(200).json(await topContributors(slug));
}