import groq from 'groq';
import { flatten, uniqBy } from 'lodash-es';
import { Fact } from '~/lib/groq/fact.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { sanityClient } from '~/shared/lib/sanityio';

type BaseArgs = {
  excludedId?: string;
};

type WithFacts = {
  facts: Fact[];
} & BaseArgs;

type WithoutFacts = {
  slug: string;
} & BaseArgs;

type Args = WithFacts | WithoutFacts;

export async function getCelebIssues(args: Args) {
  let facts: { issues: Issue[] }[];

  if ('facts' in args) {
    facts = args.facts;
  } else {
    facts = await sanityClient.fetch<{ issues: Issue[] }[]>(
      'celeb-issues',
      groq`
        *[_type == 'fact' && celeb->slug.current == $slug]{
          'issues': topics[]->{${issueProjection}}
        }
      `,
      { slug: args.slug },
    )!;
  }

  const rawIssues = facts.map((f) => f.issues);
  const issuesFlat = flatten(rawIssues);
  const issuesUniq = uniqBy(issuesFlat, (i) => i._id);

  return {
    affiliations: issuesUniq.filter(
      (i) => i.isAffiliation && i._id !== args.excludedId,
    ),
    views: issuesUniq.filter(
      (i) => !i.isAffiliation && i._id !== args.excludedId,
    ),
  };
}
