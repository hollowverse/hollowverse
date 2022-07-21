import { Fact } from '~/lib/groq/fact.projection';

export function getFactIssue(fact: Fact) {
  return fact.tags[0].tag.issue;
}
