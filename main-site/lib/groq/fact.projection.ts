import groq from 'groq';
import { Celeb } from '~/lib/groq/celeb.projection';
import { Issue, issueProjection } from '~/lib/groq/issue.projection';
import { Tag, tagProjection } from '~/lib/groq/tag.projection';

type BaseFact = {
  _id: string;
  date: string;
  source: string;
  forumLink: string;
  issues: Issue[];
  tags: Tag[];
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
${tagProjection},
'issues': topics[]->{${issueProjection}}
`;
