import { isEmpty } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getCelebIssues } from '~/lib/getStatic/helpers/getCelebIssues';
import { getParsedOldContent } from '~/lib/getStatic/helpers/getParsedOldContent';
import { getTagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import {
  CelebWithFacts,
  getCelebWithFactsGroq,
} from '~/lib/groq/getCelebWithFacts.groq';
import { Issue } from '~/lib/groq/issue.projection';
import { PageProps } from '~/shared/lib/types';
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

  const tagTimeline = getTagTimeline(results.celeb.facts);

  const { celeb } = results;

  const parseOldContent = celeb.facts.length < 5 && celeb.oldContent;

  const [oldContent, issues] = await Promise.all([
    parseOldContent ? getParsedOldContent(celeb.oldContent) : null,
    getCelebIssues({ facts: results.celeb.facts }),
  ]);

  const facts = celeb.facts.slice(0, 5).map((f) => transformFact(f));
  const hasFacts = !isEmpty(facts);

  return {
    props: {
      pageDescription: getPageDescription(),
      hasFacts,
      tagTimeline,
      celeb: {
        ...celeb,
        issues,
        facts,
        oldContent,
      },
    },
    revalidate: oneDay,
  };

  function getPageDescription() {
    if (!hasFacts) {
      if (oldContent?.summaries) {
        const { religion, politicalViews } = oldContent.summaries;
        const religionText = religion ? `Religion: ${religion}` : '';
        const politicalViewsText = politicalViews
          ? `Political views: ${politicalViews}`
          : '';

        return [religionText, politicalViewsText].join(' ').trim();
      } else {
        return oldContent?.article.substring(0, 250) || '';
      }
    }

    let affiliationsStr = '';

    const affiliations = issues.filter((i) => i.isAffiliation);
    const views = issues.filter((i) => !i.isAffiliation);

    if (!isEmpty(affiliations)) {
      affiliationsStr = ` ${process(affiliations)}`;
    }

    let viewsStr = '';

    if (!isEmpty(views)) {
      const postfix = isEmpty(affiliationsStr)
        ? ' views on'
        : ', as well as views on';

      viewsStr = `${postfix} ${process(views)}`;
    }

    return `${celeb.name}'s${affiliationsStr}${viewsStr}.`;

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
