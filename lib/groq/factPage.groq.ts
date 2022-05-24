import groq from 'groq';
import { factPartialGroq } from '~/lib/groq/fact.partial.groq';

export const factPageGroq = groq`
*[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0] {
  ${factPartialGroq}
}
`;
