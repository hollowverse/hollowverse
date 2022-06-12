import groq from 'groq';
import { FactTypes, Tag, Topic } from '~/lib/groq/fact.partial.groq';
import { Picture } from '~/lib/groq/picture.partial.groq';

export type ContentChangeData = {
  _id: string;
  _createdAt: string;
  content: string;
  context: string;
  quote: string;
  date: string;
  forumLink: string;
  source: string;
  type: FactTypes;
  tags: Tag[];
  topics: Topic[];
  name: string;
  slug: string;
  picture: Picture;
};

export const contentChangeProjection = groq`
_id,
_createdAt,
content,
context,
quote,
date,
forumLink,
source,
type,
tags[]{
  isLowConfidence,
  isBackground,
  tag->{
    name,
    topic->{name}
  }
},
topics[]->{name},
'name': celeb->name,
'slug': celeb->slug.current,
'picture': celeb->picture.asset->
`;
