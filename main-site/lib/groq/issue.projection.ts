import groq from 'groq';

export type Issue = {
  _id: string;
  name: string;
};

export const issueProjection = groq`
_id,
name,
`;
