import groq from 'groq';
import { factPartialGroq } from '~/lib/pages/components/fact.partialGroq'

export const groqFact = groq`
  *[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0] {${factPartialGroq}}
`;
