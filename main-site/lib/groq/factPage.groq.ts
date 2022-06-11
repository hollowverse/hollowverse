import groq from 'groq';
import { Fact, factPartialGroq } from '~/lib/groq/fact.partial.groq';

export type FactPageGroq = Fact;

export const factPageGroq = groq`
*[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0] {
  ${factPartialGroq}
}
`;
