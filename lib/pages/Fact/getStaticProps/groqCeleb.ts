import groq from 'groq';

export const groqCeleb = groq`
  *[_type == 'celeb' && slug.current == $slug][0]{
    _id,
    name,
    pronoun,
    'slug': slug.current,
    'picture': picture.asset->{
      _id,
      'metadata': {
        'lqip': metadata.lqip,
        'palette': metadata.palette
      }
    }
  }
`;
