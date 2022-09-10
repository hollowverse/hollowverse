import groq from 'groq';

export type Position = {
  _id: string;
  issue: string;
  stance: string;
  summary: string;
};

export const positionProjection = groq`
_id,
issue,
stance,
summary
`;
