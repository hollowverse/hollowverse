import groq from 'groq';
import { Picture, pictureProjection } from '~/lib/groq/picture.projection';

export type Celeb = {
  _id: string;
  name: string;
  pronoun: string;
  wikipediaId: string;
  slug: string;
  picture: Picture;
};

export const celebProjection = groq`
_id,
name,
pronoun,
wikipediaId,
'slug': slug.current,
'picture': picture.asset->{${pictureProjection}}
`;
