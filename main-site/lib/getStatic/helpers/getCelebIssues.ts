import groq from 'groq';
import { flatten, uniqBy } from 'lodash-es';
import { Fact } from '~/lib/groq/fact.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { CelebTag, celebTagProjection } from '~/lib/groq/tag.projection';
import { sanityClient } from '~/shared/lib/sanityio';

type BaseArgs = {
  currentIssueId?: string;
};

type WithFacts = {
  facts: Fact[];
} & BaseArgs;

type WithoutFacts = {
  slug: string;
} & BaseArgs;

type Args = WithFacts | WithoutFacts;

export async function getCelebIssues(args: Args) {
  let facts: { tags: CelebTag[] }[];

  if ('facts' in args) {
    facts = args.facts;
  } else {
    facts = await sanityClient.fetch<{ tags: CelebTag[] }[]>(
      'celeb-issues',
      groq`
        *[_type == 'fact' && celeb->slug.current == $slug]{
          'tags': ${celebTagProjection}
        }
      `,
      { slug: args.slug },
    )!;
  }

  const rawIssues = facts.flatMap((f) => f.tags.map((t) => t.tag.issue));
  const issuesFlat = flatten(rawIssues);
  const issuesUniq = uniqBy(issuesFlat, (i) => i._id);
  const affiliations = issuesUniq.filter(
    (i) => i.isAffiliation && i._id !== args.currentIssueId,
  );
  const views = issuesUniq.filter(
    (i) => !i.isAffiliation && i._id !== args.currentIssueId,
  );
  const currentIssue = issuesUniq.find((i) => i._id == args.currentIssueId);

  const issues = [...affiliations, ...views];

  if (currentIssue) {
    issues.splice(0, 0, currentIssue);
  }

  return issues;
}
