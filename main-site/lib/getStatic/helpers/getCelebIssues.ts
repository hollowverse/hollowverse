import { flatten, uniqBy } from 'lodash-es';
import { Fact } from '~/lib/groq/fact.projection';

export function getCelebIssues(facts: Fact[], excludeId?: string) {
  const rawIssues = facts.map((f) => f.issues);
  const issuesFlat = flatten(rawIssues);
  const issuesUniq = uniqBy(issuesFlat, (i) => i._id);

  return {
    affiliations: issuesUniq.filter(
      (i) => i.isAffiliation && i._id !== excludeId,
    ),
    views: issuesUniq.filter((i) => !i.isAffiliation && i._id !== excludeId),
  };
}
