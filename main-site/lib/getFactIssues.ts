import { flatten, uniqBy } from 'lodash-es';
import { Fact } from '~/lib/fact.projection';

export function getFactIssues(facts: Fact[]) {
  const rawIssues = facts.flatMap((f) => f.tags.map((t) => t.tag.issue));
  const issuesFlat = flatten(rawIssues);
  const issuesUniq = uniqBy(issuesFlat, (i) => i._id);
  const affiliations = issuesUniq.filter((i) => i.isAffiliation);
  const views = issuesUniq.filter((i) => !i.isAffiliation);

  const issues = [...affiliations, ...views];

  return issues;
}
