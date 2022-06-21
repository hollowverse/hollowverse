import groq from 'groq';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';

export type Tag = {
  isLowConfidence: boolean | null;
  isBackground: boolean | null;
  tag: {
    _id: string;
    name: string;
    issue: Issue;
  };
};

export const tagProjection = groq`
tags[]{
  isLowConfidence,
  isBackground,
  tag->{
    _id,
    name,
    'issue': topic->{${issueProjection}}
  }
}`;
