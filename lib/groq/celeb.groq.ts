import groq from 'groq';
import { Fact, factPartialGroq } from '~/lib/groq/fact.partial.groq';

export type CelebGroqResponse = {
  name: string;
  oldContent: string;
  pronoun: string;
  wikipediaId: string;
  slug: string;
  picture: {
    _id: string;
    metadata: {
      lqip: string;
      palette: any;
    };
  };
  facts: Fact[];
};

export const groqCeleb = groq`
  *[_type == 'celeb' && slug.current == $slug][0]{
    name,
    oldContent,
    pronoun,
    wikipediaId,
    'slug': slug.current,
    'picture': picture.asset->{
      _id,
      'metadata': {
        'lqip': metadata.lqip,
        'palette': metadata.palette
      }
    },
    'facts': *[_type == 'fact' && celeb._ref == ^._id]  | order(date desc) {${factPartialGroq}}
  }
`;
