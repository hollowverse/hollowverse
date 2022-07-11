import groq from 'groq';

export type Issue = {
  _id: string;
  name: string;
  isPersonal: boolean;
};

export const issueProjection = groq`
_id,
name,
isPersonal
`;
