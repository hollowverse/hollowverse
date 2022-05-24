import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { sanityClient } from '~/lib/sanityio';
import {
  relatedPeopleGroq,
  RelatedPeopleGroqResponse,
} from '~/lib/groq/relatedPeople.groq';
import { CelebGroqResponse } from '~/lib/groq/celeb.groq';

export type Summaries = {
  religion: string;
  politicalViews: string;
};

export type Source = { sourceUrl: string; sourceTitle: string };

export type OldContentFrontMatter = {
  summaries: Summaries;
  relatedPeople: string[];
  sources: Source[];
};

export const getParsedOldContent = async (
  oldContent: CelebGroqResponse['oldContent'],
) => {
  const { data: oldContentFrontMatter, content: oldContentMarkdown } = matter(
    oldContent,
  ) as any as {
    data: OldContentFrontMatter;
    content: string;
  };

  const relatedPeople = (await sanityClient.fetch(relatedPeopleGroq, {
    slugs: oldContentFrontMatter.relatedPeople,
  })) as RelatedPeopleGroqResponse;

  const parsedOldContent = {
    ...oldContentFrontMatter,

    article: (
      await remark()
        .use(remarkHtml, { sanitize: false })
        .process(oldContentMarkdown)
    ).toString(),

    relatedPeople,
  };

  return parsedOldContent;
};
