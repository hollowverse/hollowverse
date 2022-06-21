import groq from 'groq';

export type Tag = {
  isLowConfidence: boolean | null;
  isBackground: boolean | null;
  tag: {
    _id: string;
    name: string;
    issue: {
      name: string;
    };
  };
};

export const tagProjection = groq`
tags[]{
  isLowConfidence,
  isBackground,
  tag->{
    _id,
    name,
    'issue': topic->{name}
  }
}`;
