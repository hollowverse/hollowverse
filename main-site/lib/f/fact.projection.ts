import groq from 'groq';
import { Celeb } from '~/lib/c/celeb.projection';
import { CelebTag, celebTagProjection } from '~/lib/t/tag.projection';

export type FactVotes = {
  _id: string;
  likes: number | null;
  dislikes: number | null;
};

type BaseFact = {
  _id: string;
  date: string;
  source: string;
  forumLink: string;
  tags: CelebTag[];
  openGraphImage?: string;
};

export type QuoteFact = BaseFact & {
  type: 'quote';
  context: string;
  quote: string;
};

export type GeneralFact = BaseFact & {
  type: 'fact';
  content: string;
};

export type Fact = QuoteFact | GeneralFact;

export type FactWithCeleb = { celeb: Celeb } & Fact;

export type FactTypes = Fact['type'];

export const factVotesProjection = groq`
_id,
likes,
dislikes
`;
export const factProjection = groq`
_id,
content,
context,
quote,
date,
forumLink,
source,
type,
openGraphImage,
${celebTagProjection},
`;
