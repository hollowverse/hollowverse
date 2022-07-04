import { discoursePsqlQuery } from '~/lib/discoursePsqlQuery';
import { processForumContributorFields } from '~/lib/getStatic/processForumContributorFields';
import { TopContributors } from '~/lib/psql/celebTopContributors.psql';
import { log } from '~/shared/lib/log';

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
    log('error', 'Error retrieving top contributors');

    return null;
  }
}
