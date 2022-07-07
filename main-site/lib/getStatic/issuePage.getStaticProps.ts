import { isEmpty } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { getIssuePageTags } from '~/lib/getStatic/helpers/getIssuePageTags';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { getIssuePageGroq, IssuePageGroq } from '~/lib/groq/issuePage.groq';
import { PageProps } from '~/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export type IssuePageProps = PageProps<typeof getStaticProps>;

export async function getStaticProps({
  params,
}: {
  params: {
    issueId: string;
    p: string;
    tagId: string;
  };
}) {
  // Validate params
  if (
    (params.p && isNaN(parseInt(params.p))) ||
    (params.tagId && isEmpty(params.tagId))
  ) {
    return { notFound: true };
  }

  const p = parseInt(params.p ?? 1);
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

  return {
    props: {
      ...results,
      tags: getIssuePageTags(results!.tags, params.issueId).slice(0, 20),
      facts: results!.facts.map((f) => transformFact(f)),
      p,
    },
    revalidate: oneDay,
  };
}
