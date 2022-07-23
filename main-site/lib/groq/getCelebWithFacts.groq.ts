import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import { orderOfIssuesGroq } from '~/lib/groq/orderOfIssues.groq';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import {
  TagTimelineFact,
  tagTimelineFactProjection,
} from '~/lib/groq/tagTimelineFactsProjection';

export type CelebWithFacts<T> = {
  celeb:
    | (Celeb & {
        oldContent: T extends true ? string : undefined;
      })
    | null;
  facts: Fact[];
  factCount: number;
  tagTimelineFacts: TagTimelineFact[];
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

  const factFilter = groq`_type == 'fact' && celeb->slug.current == $slug`;

  return [
    groq`{
      'celeb': *[_type == 'celeb' && slug.current == $slug][0]{
        ${celebProjection},
        ${includeOldContent ? `oldContent` : ''},
      },

      'facts': *[${factFilter}]  | order(date desc) {
        ${factProjection}
      }[$start...$end],

      'tagTimelineFacts': *[${factFilter}] | order(date desc) {
        ${tagTimelineFactProjection}
      },

      'factCount': count(*[${factFilter}]),

      'orderOfIssues': ${orderOfIssuesGroq}
    }`,
    {
      slug: args.params.slug,
      start,
      end,
    },
  ] as const;
}
