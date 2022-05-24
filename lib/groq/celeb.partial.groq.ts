import groq from 'groq';
import { PictureGroq, pictureGroq } from '~/lib/groq/picture.partial.groq';

export type CelebPartialGroq = {
  _id: string;
  name: string;
  pronoun: string;
  wikipediaId: string;
  slug: string;
  picture: PictureGroq;
};

export const celebPartialGroq = groq`
_id,
name,
pronoun,
wikipediaId,
'slug': slug.current,
'picture': picture.asset->{${pictureGroq}}
`;
