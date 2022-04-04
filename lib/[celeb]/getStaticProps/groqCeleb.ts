import groq from 'groq';

export const groqCeleb = groq`
  *[_type == 'celeb' && slug.current == $slug][0]{
    discourseTopicId,
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
    'facts': *[_type == 'fact' && celeb._ref == ^._id]{
      ...,
      tags[]{
        ...,
        tag->{
          ...,
          topic->
        }
      },
      topics[]->
    }
  }
`;
