import matter from 'gray-matter';
import groq from 'groq';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { Picture, pictureProjection } from '~/lib/groq/picture.projection';
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

export function extractFrontMatter(oldContent: string) {
  const { data: oldContentFrontMatter, content: oldContentMarkdown } = matter(
    oldContent,
  ) as any as {
    data: OldContentFrontMatter;
    content: string;
  };

  return {
    oldContentFrontMatter,
    oldContentMarkdown,
  };
}

export const getParsedOldContent = async (oldContent: string) => {
  const { oldContentFrontMatter, oldContentMarkdown } =
    extractFrontMatter(oldContent);

  const unprocessedRelatedPeople = await sanityClient.fetch<
    {
      name: string;
      slug: string;
      picture: Picture;
      oldContent: string;
    }[]
  >(
    'old-content-related-people',
    groq`*[_type == 'celeb' && slug.current in $slugs][0..3]{
      name,
      'slug': slug.current,
      'picture': picture.asset->{${pictureProjection}},
      oldContent
    }`,
    {
      slugs: oldContentFrontMatter.relatedPeople,
    },
  )!;

  const relatedPeople = unprocessedRelatedPeople.map((rp) => {
    const { oldContent, ...rest } = rp;
    const frontMatter = extractFrontMatter(oldContent);

    return {
      ...rest,
      summaries: frontMatter.oldContentFrontMatter.summaries,
    };
  });

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
