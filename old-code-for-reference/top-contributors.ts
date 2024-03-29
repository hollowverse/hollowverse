import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { discoursePsqlQuery } from '~/lib/disabled/discoursePsqlQuery';
import { processForumContributorFields } from '~/lib/disabled/processForumContributorFields';
import { TopContributors } from '~/lib/disabled/celebTopContributors.psql';
import { setApiCache } from '~/lib/setApiCache';
import { log } from '~/shared/lib/log';

export type TopContributorsResults = Awaited<
  ReturnType<typeof getTopContributors>
>;
export type TopContributorsQueryParams = { slug: string };

export async function getTopContributors(slug: string) {
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

  return res.status(200).json(await getTopContributors(slug));
}
