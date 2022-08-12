import groq from 'groq';
import { Issue, issueProjection } from '~/lib/issue.projection';

export type Tag = {
  _id: string;
  name: string;
  issue: Issue;
  isVerb: boolean | null;
};

export type CelebTag = {
  isLowConfidence: boolean | null;
  isBackground: boolean | null;
  tag: Tag;
};

export const tagProjection = groq`
_id,
name,
'issue': topic->{${issueProjection}},
isVerb
`;

export const celebTagProjection = groq`
tags[]{
  isLowConfidence,
  isBackground,
  tag->{${tagProjection}}
}`;
