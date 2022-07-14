import { UnwrapPromise } from 'next/dist/lib/coalesced-function';
import { oneDay } from '~/lib/date';
import { getCelebIssues } from '~/lib/getStatic/helpers/getCelebIssues';
import { getParsedOldContent } from '~/lib/getStatic/helpers/getParsedOldContent';
import { getTagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { getTopContributors } from '~/lib/getStatic/helpers/getTopContributors';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import {
  CelebWithFacts,
  getCelebWithFactsGroq,
} from '~/lib/groq/getCelebWithFacts.groq';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebPageProps = NonNullable<
  UnwrapPromise<ReturnType<typeof getStaticProps>>['props']
>;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  log('info', `celebPage getStaticProps called: ${params.slug}`);

  const results = await sanityClient.fetch<CelebWithFacts<true>>(
    'celeb-and-facts',
    getCelebWithFactsGroq({ includeOldContent: true }),
    {
      slug: params.slug,
      issueId: null,
    },
  );

  if (!results || !results.celeb) {
    return {
      notFound: true,
    };
  }

  const issues = getCelebIssues(results.celeb.facts);

  const tagTimeline = getTagTimeline(
    results.celeb.facts,
    results.orderOfIssues,
  );

  const { oldContent, facts, ...rest } = results.celeb;
  const [parsedOldContent, topContributors] = await Promise.all([
    oldContent ? await getParsedOldContent(oldContent) : null,
    getTopContributors(params.slug),
  ]);

  return {
    props: {
      topContributors,
      tagTimeline,
      celeb: {
        ...rest,
        issues,
        facts: facts.slice(0, 5).map((f) => transformFact(f)),
        oldContent: parsedOldContent,
      },
    },
    revalidate: oneDay,
  };
};
