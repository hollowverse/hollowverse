import groq from 'groq';
import { Tag, tagProjection } from '~/lib/groq/tag.projection';

export type Issue = { name: string };

export type Fact = {
  _id: string;
  date: string;
  source: string;
  forumLink: string;
  issues: Issue[];
  tags: Tag[];
  openGraphImage?: string;
} & (
  | {
      type: 'quote';
      context: string;
      quote: string;
    }
  | {
      type: 'fact';
      content: string;
    }
);

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
'issues': topics[]->{name}
`;
