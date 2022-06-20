import groq from 'groq';

export type Issue = { name: string };

export type Tag = {
  isLowConfidence: boolean | null;
  isBackground: boolean | null;
  tag: {
    name: string;
    issue: {
      name: string;
    };
  };
};

export type Fact = {
  _id: string;
  date: string;
  source: string;
  forumLink: string;
  issues: Issue[];
  tags: Tag[];
  openGraphImage?: string;
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
openGraphImage,
tags[]{
  isLowConfidence,
  isBackground,
  tag->{
    name,
    'issue': topic->{name}
  }
},
'issues': topics[]->{name}
`;
