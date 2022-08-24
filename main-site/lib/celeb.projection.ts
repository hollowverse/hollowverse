import groq from 'groq';
import { Picture, pictureProjection } from '~/lib/picture.projection';

export type Celeb = {
  _id: string;
  name: string;
  pronoun: string;
  wikipediaId: string;
  slug: string;
  picture: Picture;
  contributorId: number;
  knowledgeGraphId: string;
  dod: string | null;
  dob: string | null;
};

export const celebProjection = groq`
_id,
name,
pronoun,
wikipediaId,
contributorId,
knowledgeGraphId,
dod,
dob,
'slug': slug.current,
'picture': picture.asset->{${pictureProjection}}
`;
