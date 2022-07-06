import groq from 'groq';
import { head, tail, uniqBy } from 'lodash-es';
import { oneDay } from '~/lib/date';
import { parseCatchAllParams } from '~/lib/getStatic/helpers/parseParamsArr';
import { transformFact } from '~/lib/getStatic/helpers/transformFact';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { Tag, tagProjection } from '~/lib/groq/tag.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getStaticProps({
  params: { params },
}: {
  params: { params: string[] };
}) {
  const issueId = head(params);

  if (!issueId) {
    return { notFound: true };
  }

  const parsedParams = parseCatchAllParams(tail(params));

  // Validate params
  if (
    (parsedParams.p && isNaN(parseInt(parsedParams.p))) ||
    (parsedParams.t && parsedParams.t.split(',').some((t) => !t))
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
  );

  console.log('results.tags', results.tags);

  return {
    props: {
      ...results,
      tags: uniqBy(results!.tags, 'tag._id').filter(
        (t) => t.tag.issue._id === issueId,
      ),
      facts: results!.facts.map((f) => transformFact(f)),
      p,
    },
    revalidate: oneDay,
  };
}
