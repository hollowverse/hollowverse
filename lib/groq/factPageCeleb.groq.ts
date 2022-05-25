import groq from 'groq';
import {
  CelebPartialGroq,
  celebPartialGroq,
} from '~/lib/groq/celeb.partial.groq';

export type FactPageCelebGroq = CelebPartialGroq;

export const factPageCelebGroq = groq`
  *[_type == 'celeb' && slug.current == $slug][0]{
    ${celebPartialGroq}
  }
`;
