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

export function getCelebWithFactsGroq(args: {
  includeOldContent?: boolean;
  params: {
    slug: string;
    start?: number;
    end?: number;
  };
}) {
  const includeOldContent = args?.includeOldContent ?? false;
  const start = args.params.start ?? 0;
  const end = args.params.end ?? 999;

  const baseFilter = groq`_type == 'fact' && celeb._ref == ^._id`;

  return [
    groq`{
      'celeb': *[_type == 'celeb' && slug.current == $slug][0]{
        ${celebProjection},
        ${includeOldContent ? `oldContent,` : ''}
        'facts': *[${baseFilter}]  | order(date desc) {
          ${factProjection}
        }[$start...$end]
      },
      'orderOfIssues': ${orderOfIssuesGroq}
    }`,
    {
      slug: args.params.slug,
      start,
      end,
    },
  ] as const;
}
