import groq from 'groq';

export type Position = {
  _updatedAt: string;
  _id: string;
  issue: string;
  stance?: string;
  summary: string;
};

export const positionProjection = groq`
_updatedAt,
_id,
issue,
stance,
summary
`;
