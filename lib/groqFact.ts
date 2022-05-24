import groq from 'groq';
import { factPartialGroq } from '~/components/fact.partialGroq';

export const groqFact = groq`
  *[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0] {${factPartialGroq}}
`;
