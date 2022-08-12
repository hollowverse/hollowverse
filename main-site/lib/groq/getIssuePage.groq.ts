import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/c/celeb.projection';
import { Fact, factProjection } from '~/lib/f/fact.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { CelebTag, celebTagProjection } from '~/lib/groq/tag.projection';

export type IssuePageGroq = {
  issue: Issue | null;
  facts: ({ celeb: Celeb } & Fact)[] | null;
  tags: CelebTag[] | null;
  factCount: number | null;
};

export function getIssuePageGroq(withTagFilter: boolean) {
  const baseFilter = groq`_type == 'fact' && $issueId in tags[].tag->topic._ref`;
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
      'tags': ${celebTagProjection}
    }.tags[0...999],

    'factCount': count(*[${baseFilter}${tagFilter}])
  }`;
}
