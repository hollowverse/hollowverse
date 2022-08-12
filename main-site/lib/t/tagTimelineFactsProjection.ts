import groq from 'groq';
import { CelebTag, celebTagProjection } from '~/lib/t/tag.projection';

export type TagTimelineFact = {
  tags: CelebTag[];
  date: string;
};
export const tagTimelineFactProjection = groq`
${celebTagProjection},
date
`;
