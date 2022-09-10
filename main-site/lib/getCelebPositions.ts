import groq from 'groq';
import { Position, positionProjection } from '~/lib/position.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getCelebPositions(celebId: string) {
  return sanityClient.fetch<Position[]>(
    'celeb-page-positions',
    groq`
    *[_type == 'position' && celeb._ref == $celebId] {
      ${positionProjection}
    }`,
    { celebId },
  )!;
}
