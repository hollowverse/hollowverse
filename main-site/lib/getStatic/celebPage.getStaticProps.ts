import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { oneDay } from '~/lib/date';
import { factsDataTransform } from '~/lib/getStatic/factsDataTransform';
import { getCelebWithTimeline } from '~/lib/getStatic/getCelebWithTimeline';
import { getParsedOldContent } from '~/lib/getStatic/getParsedOldContent';
import { getTopContributors } from '~/lib/getStatic/getTopContributors';
import { log } from '~/shared/lib/log';

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  log('info', `celebPage getStaticProps called: ${params.celeb}`);

  const results = await getCelebWithTimeline(params.celeb, true);

  if (!results) {
    return {
      notFound: true,
    };
  }

  const { oldContent, facts, ...rest } = results.celeb;
  const [parsedOldContent, topContributors] = await Promise.all([
    oldContent ? await getParsedOldContent(oldContent) : null,
    getTopContributors(params.celeb),
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
