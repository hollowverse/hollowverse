import { isEmpty } from 'lodash-es';
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
import { Issue } from '~/lib/groq/issue.projection';
import { PageProps } from '~/lib/types';
import { log } from '~/shared/lib/log';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebPageProps = PageProps<typeof getStaticProps>;

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
      pageDescription: getPageDescription(),
      topContributors,
      tagTimeline,
      celeb: {
        issues,
        ...rest,
        facts: facts.slice(0, 5).map((f) => transformFact(f)),
        oldContent: parsedOldContent,
      },
    },
    revalidate: oneDay,
  };

  function getPageDescription() {
    let affiliations = '';

    if (!isEmpty(issues.affiliations)) {
      affiliations = ` ${process(issues.affiliations)}`;
    }

    let views = '';

    if (!isEmpty(issues.views)) {
      const postfix = isEmpty(affiliations)
        ? ' views on'
        : ', as well as views on';

      views = `${postfix} ${process(issues.views)}`;
    }

    return `${rest.name}'s${affiliations}${views}.`;

    function process(arr: Issue[]) {
      // @ts-ignore
      const formatter = new Intl.ListFormat('en', {
        style: 'long',
        type: 'conjunction',
      });
      const r = arr.map((i) => i.name);

      return formatter.format(r);
    }
  }
};
