import { isEmpty } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/getStatic/helpers/getCeleb';
import { getCelebFacts } from '~/lib/getStatic/helpers/getCelebFacts';
import { getFactIssues } from '~/lib/getStatic/helpers/getFactIssues';
import { getParsedOldContent } from '~/lib/getStatic/helpers/getParsedOldContent';
import { getTagTimeline } from '~/lib/getStatic/helpers/getTagTimeline';
import {
  getPaginationProps,
  getPaginationRange,
} from '~/lib/getStatic/helpers/pagination';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { Issue } from '~/lib/groq/issue.projection';
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
  const tagTimeline = getTagTimeline(allFacts);
  const parseOldContent =
    factCount < paginationRange.pageSize && celeb.oldContent !== null;
  const issues = getFactIssues(allFacts);
  const oldContent = parseOldContent
    ? await getParsedOldContent(celeb.oldContent!)
    : null;
  const facts = allFacts
    .slice(paginationRange.start, paginationRange.end)
    .map((f) => transformFact(f));

  return {
    props: {
      pageDescription: getPageDescription(),
      pagePath:
        paginationRange.p === 1
          ? `/${params.slug}`
          : `/${params.slug}/p/${paginationRange.p}`,
      pagination: getPaginationProps(paginationRange, factCount),
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

    return `${celeb!.name}'s${affiliationsStr}${viewsStr}.`;

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
