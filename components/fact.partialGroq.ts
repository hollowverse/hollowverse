import groq from 'groq';

export const factPartialGroq = groq`
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
`;
