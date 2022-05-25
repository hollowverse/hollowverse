import groq from 'groq';
import { Picture, pictureGroq } from '~/lib/groq/picture.partial.groq';

export type RelatedPeopleGroqResponse = {
  name: string;
  slug: string;
  picture: Picture;
}[];

export const relatedPeopleGroq = groq`
  *[_type == 'celeb' && slug.current in $slugs][0..3]{
    name,
    'slug': slug.current,
    'picture': picture.asset->{${pictureGroq}}
  }
`;
