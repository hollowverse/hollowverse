import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { oneDay } from '~/lib/date';
import { factsDataTransform } from '~/lib/getStatic/helpers/factsDataTransform';
import { getCelebWithTimeline } from '~/lib/getStatic/helpers/getCelebWithTimeline';
import { getParsedOldContent } from '~/lib/getStatic/helpers/getParsedOldContent';
import { getTopContributors } from '~/lib/getStatic/helpers/getTopContributors';
import { log } from '~/shared/lib/log';

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  log('info', `celebPage getStaticProps called: ${params.slug}`);

  const results = await getCelebWithTimeline(params.slug, true);

  if (!results) {
    return {
      notFound: true,
    };
  }

  const { oldContent, facts, ...rest } = results.celeb;
  const [parsedOldContent, topContributors] = await Promise.all([
    oldContent ? await getParsedOldContent(oldContent) : null,
    getTopContributors(params.slug),
  ]);

  const transformedFacts = factsDataTransform(facts, results.orderOfIssues);

  return {
    props: {
      topContributors,
      celeb: {
        ...rest,
        facts: transformedFacts,
        oldContent: parsedOldContent,
      },
    },
    revalidate: oneDay,
  };
};
