import { isEmpty } from 'lodash-es';
import { Celeb } from '~/lib/celeb.projection';
import { oneDay } from '~/lib/date';
import { getCeleb } from '~/lib/getCeleb';
import { getCelebFacts } from '~/lib/getCelebFacts';
import { getFactIssues } from '~/lib/getFactIssues';
import {
  getPaginationProps,
  getPaginationRange,
} from '~/lib/getPaginationRange';
import { Issue } from '~/lib/issue.projection';
import { transformFact } from '~/lib/transformFact';
import { PageProps } from '~/shared/lib/types';

export type CelebPagePropsFactsOnly = PageProps<
  typeof celebPageFactsOnlyGetStaticProps
>;

export async function celebPageFactsOnlyGetStaticProps(
  {
    params,
  }: {
    params: { slug: string; p: string | undefined };
  },
  celeb: NonNullable<Awaited<ReturnType<typeof getCeleb>>>,
) {
  const allFacts = await getCelebFacts(celeb._id);
  const paginationRange = getPaginationRange({ p: params.p });
  const factCount = allFacts.length;
  const hasFacts = factCount > 0;
  const issues = getFactIssues(allFacts);
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
      celeb: celeb as Celeb,
    },
    revalidate: oneDay,
  };

  function getPageDescription(celebName: string) {
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
}