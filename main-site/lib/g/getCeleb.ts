import groq from 'groq';
import { Celeb, celebProjection } from '~/lib/c/celeb.projection';
import { sanityClient } from '~/shared/lib/sanityio';

export async function getCeleb(slug: string) {
  return sanityClient.fetch<Celeb & { oldContent: string | null }>(
    'celeb-id',
    groq`
    *[_type == 'celeb' && slug.current == $slug][0]{
      ${celebProjection},
      oldContent
    }
  `,
    { slug },
  );
}
