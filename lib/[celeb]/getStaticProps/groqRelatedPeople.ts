import groq from 'groq';

export const groqRelatedPeople = groq`
  *[_type == 'celeb' && slug.current in $slug][0..3]{
    name,
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
