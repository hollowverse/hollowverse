import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { factsDataTransform } from '~/lib/getStatic/factsDataTransform';
import { getParsedOldContent } from '~/lib/getStatic/getParsedOldContent';
import { getCelebWithTimeline } from '~/lib/getStatic/getCelebWithTimeline';
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
  const parsedOldContent = oldContent
    ? await getParsedOldContent(oldContent)
    : null;

  const transformedFacts = factsDataTransform(facts, results.orderOfIssues);

  return {
    props: {
      celeb: {
        ...rest,
        facts: transformedFacts,
        oldContent: parsedOldContent,
      },
    },
  };
};
