import groq from 'groq';

export type Topic = { name: string };

export type Tag = {
  isLowConfidence: boolean | null;
  isBackground: boolean | null;
  tag: {
    name: string;
    topic: {
      name: string;
    };
  };
};

export type Fact = {
  _id: string;
  date: string;
  source: string;
  forumLink: string;
  topics: Topic[];
  tags: Tag[];
} & (
  | {
      type: 'quote';
      context: string;
      quote: string;
    }
  | {
      type: 'fact';
      content: string;
    }
);

export type FactTypes = Fact['type'];

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
  isBackground,
  tag->{
    name,
    topic->{name}
  }
},
topics[]->{name}
`;
