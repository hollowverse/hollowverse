import groq from 'groq';
import { getTagTimeline, TagTimeline } from '~/lib/getStatic/getTagTimeline';
import { Celeb, celebProjection } from '~/lib/groq/celeb.projection';
import { Fact, factProjection } from '~/lib/groq/fact.projection';
import {
  OrderOfIssues,
  orderOfIssuesProjection,
} from '~/lib/groq/orderOfIssues.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export type CelebWithTimeline = Celeb & { tagTimeline: TagTimeline };

export async function getCelebWithTimeline<T extends boolean>(
  slug: string,
  includeOldContent: T,
) {
  const results = await sanityClient.fetch<{
    celeb:
      | (Celeb & {
          oldContent: T extends true ? string : undefined;
          facts: Fact[];
        })
      | null;
    orderOfIssues: OrderOfIssues;
  }>(
    'celeb-and-facts',
    groq`{
      'celeb': *[_type == 'celeb' && slug.current == $slug][0]{
        ${celebProjection},
        ${includeOldContent ? `oldContent,` : ''}
        'facts': *[_type == 'fact' && celeb._ref == ^._id]  | order(date desc) {
          ${factProjection}
        }
      },
      'orderOfIssues': *[_type == 'orderOfTopics'][0]{
        'issues': ${orderOfIssuesProjection}
      }.issues
    }`,
    { slug },
  )!;

  if (!results.celeb) {
    return null;
  }

  const tagTimeline = getTagTimeline(
    results.celeb.facts,
    results.orderOfIssues,
  );

  return {
    celeb: {
      ...results.celeb,
      tagTimeline,
    },
    orderOfIssues: results.orderOfIssues,
  };
}
