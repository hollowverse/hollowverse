import groq from 'groq';
import { Celeb } from '~/lib/groq/celeb.projection';
import { CelebTag, celebTagProjection } from '~/lib/groq/tag.projection';

export type FactVotes = {
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
} & FactVotes;

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
${factVotesProjection},
${celebTagProjection},
`;
