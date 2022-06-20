import groq from 'groq';

export type Tag = {
  _id: string;
  isLowConfidence: boolean | null;
  isBackground: boolean | null;
  tag: {
    name: string;
    issue: {
      name: string;
    };
  };
};

export const tagProjection = groq`
tags[]{
  _id,
  isLowConfidence,
  isBackground,
  tag->{
    name,
    'issue': topic->{name}
  }
}`;
