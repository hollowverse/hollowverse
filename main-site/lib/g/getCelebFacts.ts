import groq from 'groq';
import { Fact, factProjection } from '~/lib/f/fact.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getCelebFacts(celebId: string) {
  return sanityClient.fetch<Fact[]>(
    'celeb-page-facts',
    groq`
    *[_type == 'fact' && celeb._ref == $celebId] | order(date desc){
      ${factProjection}
    }`,
    { celebId },
  )!;
}
