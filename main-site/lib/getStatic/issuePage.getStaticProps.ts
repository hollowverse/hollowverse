import groq from 'groq';
import { head, isEmpty, tail, uniqBy } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { CatchAllParams } from '~/lib/getStatic/helpers/CatchAllParams';
import { getIssuePageTags } from '~/lib/getStatic/helpers/getIssuePageTags';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { Tag, tagProjection } from '~/lib/groq/tag.projection';
import { PageProps } from '~/lib/types';
import { sanityClient } from '~/shared/lib/sanityio';

export type IssuePageProps = PageProps<typeof getStaticProps>;
export const catchAllParams = new CatchAllParams([
  { name: 'p' },
  { name: 'tags', isArray: true },
] as const);

export async function getStaticProps({
  params: { params },
}: {
  params: { params: string[] };
}) {
  const issueId = head(params);

  if (!issueId) {
    return { notFound: true };
  }

  const parsedParams = catchAllParams.parse<{ p: string; tags: string[] }>(
    tail(params),
  );

  // Validate params
  if (
    (parsedParams.p && isNaN(parseInt(parsedParams.p as string))) ||
    (parsedParams.tags && isEmpty(parsedParams.tags))
  ) {
    return { notFound: true };
  }

  const p = parseInt(parsedParams.p ?? 1);
  const pageSize = 25;
  const start = (p - 1) * pageSize;
  const end = start + pageSize;

  const groqFilter = groq`*[_type == 'fact' && $issueId in topics[]._ref]`;
  const results = await sanityClient.fetch<{
    issue: Issue;
    facts: ({ celeb: Celeb } & Fact)[];
    tags: Tag[];
  }>(
    'issue-page-facts',
    groq`{
      'issue': *[_type == 'topic' && _id == $issueId][0]{
        ${issueProjection}
      },

      'facts': ${groqFilter}{
        'celeb': celeb->{${celebProjection}},
        ${factProjection}
      }[$start...$end] | order(date desc),

      'tags': ${groqFilter}{
        'tags': ${tagProjection}
      }.tags[0...999],

      'factCount': count(${groqFilter})
    }`,
    { issueId, start, end },
  )!;

  return {
    props: {
      ...results,
      tags: getIssuePageTags(results!.tags, issueId).slice(0, 10),
      facts: results!.facts.map((f) => transformFact(f)),
      p,
    },
    revalidate: oneDay,
  };
}
