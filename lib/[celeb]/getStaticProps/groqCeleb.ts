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
    facts[] {
      date,
      context,
      quote,
      content,
      'issue': issue->{name}.name,
      tags[]-> {
        'name': tag,
        'issue': issue->{name}.name
      }
    }
  }
`;
