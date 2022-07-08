import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { Tag, tagProjection } from '~/lib/groq/tag.projection';

export type IssuePageGroq = {
  issue: Issue;
  facts: ({ celeb: Celeb } & Fact)[];
  tags: Tag[];
  factCount: number;
};

export function getIssuePageGroq(withTagFilter: boolean) {
  const baseFilter = groq`_type == 'fact' && $issueId in topics[]._ref`;
  const tagFilter = withTagFilter ? groq` && $tagId in tags[].tag._ref` : '';

  return groq`{
    'issue': *[_type == 'topic' && _id == $issueId][0]{
      ${issueProjection}
    },

    'facts': *[${baseFilter}${tagFilter}]{
      'celeb': celeb->{${celebProjection}},
      ${factProjection}
    }[$start...$end] | order(date desc),

    'tags': *[${baseFilter}]{
      'tags': ${tagProjection}
    }.tags[0...999],

    'factCount': count(*[${baseFilter}${tagFilter}])
  }`;
}
