import { Fact } from '~/lib/fact.projection';

export function getFactIssue(fact: Fact) {
  return fact.tags[0].tag.issue;
}
