import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { sanityClient } from '~/lib/pages/utils/sanityio';
import { groqRelatedPeople } from '~/lib/pages/Celeb/getStaticProps/groqRelatedPeople';

export const getParsedOldContent = async (oldContent: any) => {
  const { data: oldContentFrontMatter, content: oldContentMarkdown } =
    matter(oldContent);

  const relatedPeople = await sanityClient.fetch(groqRelatedPeople, {
    slug: oldContentFrontMatter.relatedPeople,
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
