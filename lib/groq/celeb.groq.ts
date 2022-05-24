import groq from 'groq';
import { Fact, factPartialGroq } from '~/lib/groq/fact.partial.groq';
import { pictureGroq, PictureGroq } from '~/lib/groq/picture.partial.groq';

export type CelebGroqResponse = {
  name: string;
  oldContent: string;
  pronoun: string;
  wikipediaId: string;
  slug: string;
  picture: PictureGroq;
  facts: Fact[];
};

export const groqCeleb = groq`
  *[_type == 'celeb' && slug.current == $slug][0]{
    name,
    oldContent,
    pronoun,
    wikipediaId,
    'slug': slug.current,
    'picture': picture.asset->${pictureGroq},
    'facts': *[_type == 'fact' && celeb._ref == ^._id]  | order(date desc) {${factPartialGroq}}
  }
`;
