import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { orderOfIssuesGroq } from '~/lib/groq/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';

export type CelebWithFacts<T> = {
  celeb:
    | (Celeb & {
        oldContent: T extends true ? string : undefined;
        facts: Fact[];
      })
    | null;
  orderOfIssues: OrderOfIssues;
};

export function getCelebWithFactsGroq(args?: {
  issueId?: string;
  includeOldContent?: boolean;
}) {
  const issueId = args?.issueId ?? null;
  const includeOldContent = args?.includeOldContent ?? false;

  const baseFilter = groq`_type == 'fact' && celeb._ref == ^._id`;
  const issueFilter = issueId ? groq` && $issueId in topics[]._ref` : '';

  return groq`{
      'celeb': *[_type == 'celeb' && slug.current == $slug][0]{
        ${celebProjection},
        ${includeOldContent ? `oldContent,` : ''}
        'facts': *[${baseFilter}${issueFilter}]  | order(date desc) {
          ${factProjection}
        }
      },
      'orderOfIssues': ${orderOfIssuesGroq}
    }`;
}
