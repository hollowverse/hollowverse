import groq from 'groq';
import {
  CelebPartialGroq,
  celebPartialGroq,
} from '~/lib/groq/celeb.partial.groq';
import { Fact, factPartialGroq } from '~/lib/groq/fact.partial.groq';

export type CelebGroqResponse = CelebPartialGroq & {
  oldContent: string;
  facts: Fact[];
};

export const celebPageGroq = groq`
*[_type == 'celeb' && slug.current == $slug][0]{
  ${celebPartialGroq},
  oldContent,
  'facts': *[_type == 'fact' && celeb._ref == ^._id]  | order(date desc) {${factPartialGroq}}
}
`;