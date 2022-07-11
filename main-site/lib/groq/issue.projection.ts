import groq from 'groq';

export type Issue = {
  _id: string;
  name: string;
  isAffiliation: boolean;
};

export const issueProjection = groq`
_id,
name,
isAffiliation
`;
