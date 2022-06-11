import groq from 'groq';
import { Picture, pictureGroq } from '~/lib/groq/picture.partial.groq';

export type Celeb = {
  _id: string;
  name: string;
  pronoun: string;
  wikipediaId: string;
  slug: string;
  picture: Picture;
};

export const celebPartialGroq = groq`
_id,
name,
pronoun,
wikipediaId,
'slug': slug.current,
'picture': picture.asset->{${pictureGroq}}
`;
