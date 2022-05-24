import groq from 'groq';
import { celebPartialGroq } from '~/lib/groq/celeb.partial.groq';

export const factPageCelebGroq = groq`
  *[_type == 'celeb' && slug.current == $slug][0]{
    ${celebPartialGroq}
  }
`;
