import { isEmpty } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getIssuePageTags } from '~/lib/g/getIssuePageTags';
import { transformFact } from '~/lib/t/transformFact';
import { getIssuePageGroq, IssuePageGroq } from '~/lib/g/getIssuePage.groq';
import { PageProps } from '~/shared/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export type IssuePageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: {
    issueId: string;
    p: string | undefined;
    tagId: string | undefined;
  };
}) {
  // Validate params
  if (
    (params.p && isNaN(parseInt(params.p))) ||
    (params.tagId && isEmpty(params.tagId))
  ) {
    return { notFound: true };
  }

  const p = parseInt(params.p ?? '1');
  const pageSize = 25;
  const start = (p - 1) * pageSize;
  const end = start + pageSize;

  const results = await sanityClient.fetch<IssuePageGroq>(
    'issue-page-facts',
    getIssuePageGroq(params.tagId ? true : false),
    {
      issueId: params.issueId,
      tagId: params.tagId ?? null,
      start,
      end,
    },
  )!;

  if (
    !results ||
    !results.facts ||
    !results.tags ||
    !results.issue ||
    !results.factCount ||
    isEmpty(results.facts) ||
    isEmpty(results.issue)
  ) {
    return { notFound: true };
  }

  return {
    props: {
      tagId: params.tagId ?? null,
      pagination: {
        currentPage: p,
        pageSize,
        totalItems: results.factCount,
      },
      issue: results.issue,
      tags: getIssuePageTags(results.tags, params.issueId).slice(0, 20),
      facts: results.facts.map((f) => transformFact(f)),
    },
    revalidate: oneDay,
  };
}
