import matter from 'gray-matter';
import groq from 'groq';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { Picture, pictureGroq } from '~/lib/groq/picture.partial.groq';
import { sanityClient } from '~/shared/lib/sanityio';

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

export const getParsedOldContent = async (oldContent: string) => {
  const { data: oldContentFrontMatter, content: oldContentMarkdown } = matter(
    oldContent,
  ) as any as {
    data: OldContentFrontMatter;
    content: string;
  };

  const relatedPeople = await sanityClient.fetch<
    {
      name: string;
      slug: string;
      picture: Picture;
    }[]
  >(
    'old-content-related-people',
    groq`*[_type == 'celeb' && slug.current in $slugs][0..3]{
      name,
      'slug': slug.current,
      'picture': picture.asset->{${pictureGroq}}
    }`,
    {
      slugs: oldContentFrontMatter.relatedPeople,
    },
  )!;

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
