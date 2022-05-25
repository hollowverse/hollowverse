import groq from 'groq';
import { Celeb, celebPartialGroq } from '~/lib/groq/celeb.partial.groq';

export type FactPageCelebGroq = Celeb;

export const factPageCelebGroq = groq`
  *[_type == 'celeb' && slug.current == $slug][0]{
    ${celebPartialGroq}
  }
`;
