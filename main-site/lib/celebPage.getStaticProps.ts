import { isEmpty } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/getCeleb';
import { getCelebFacts } from '~/lib/getCelebFacts';
import { getFactIssues } from '~/lib/getFactIssues';
import {
  getPaginationProps,
  getPaginationRange,
} from '~/lib/getPaginationRange';
import { getParsedOldContent } from '~/lib/getParsedOldContent';
import { Issue } from '~/lib/issue.projection';
import { transformFact } from '~/lib/transformFact';
import { log } from '~/shared/lib/log';
import { PageProps } from '~/shared/lib/types';

export type CelebPageProps = PageProps<typeof getStaticProps>;

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string; p: string | undefined };
}) => {
  log('info', `celebPage getStaticProps called: ${params.slug}`);
  const celeb = await getCeleb(params.slug);

  if (!celeb) {
    return { notFound: true };
  }

  const allFacts = await getCelebFacts(celeb._id);
  const paginationRange = getPaginationRange({ p: params.p });
  const factCount = allFacts.length;
  const hasFacts = factCount > 0;
  const parseOldContent = celeb.oldContent !== null;
  const issues = getFactIssues(allFacts);

  const oldContent = parseOldContent
    ? await getParsedOldContent(celeb.oldContent!)
    : null;
  const facts = allFacts
    .slice(paginationRange.start, paginationRange.end)
    .map((f) => transformFact(f));

  return {
    props: {
      pageDescription: getPageDescription(celeb.name),
      pagePath:
        paginationRange.p === 1
          ? `/${params.slug}`
          : `/${params.slug}/p/${paginationRange.p}`,
      pagination: getPaginationProps(paginationRange, factCount),
      hasFacts,
      issues,
      facts,
      celeb: {
        ...celeb,
        oldContent,
      },
    },
    revalidate: oneDay,
  };

  function getPageDescription(celebName: string) {
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

    return `${celebName}'s${affiliationsStr}${viewsStr}.`;

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
