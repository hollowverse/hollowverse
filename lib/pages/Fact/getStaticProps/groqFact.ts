import groq from 'groq';

export const groqFact = groq`
  *[_type == 'fact' && _id == $factId && celeb._ref == $celebId][0]{
    _id,
    content,
    context,
    quote,
    date,
    forumLink,
    source,
    type,
    tags[]{
      isLowConfidence,
      tag->{
        name,
        topic->{name}
      }
    },
    topics[]->{name}
  }
`;
