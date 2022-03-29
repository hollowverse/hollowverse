import matter from 'gray-matter';
import groq from 'groq';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { sanityClient } from '~/lib/components/sanityio';
import { Fact } from '~/lib/components/types';
import { groqCeleb } from '~/lib/[celeb]/getStaticProps/groqCeleb';
import { groqRelatedPeople } from '~/lib/[celeb]/getStaticProps/groqRelatedPeople';

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  const celeb = await sanityClient.fetch(groqCeleb, { slug: params.celeb });

  const { oldContent, facts, ...rest } = celeb;

  const { data: oldContentFrontMatter, content: oldContentMarkdown } =
    matter(oldContent);

  const [relatedPeople, placeholderImage, orderOfIssues] = await Promise.all([
    sanityClient.fetch(groqRelatedPeople, {
      slug: oldContentFrontMatter.relatedPeople,
    }),
    sanityClient.getDocument(
      'image-98dc320a756a3f0f5dc40a59ced1194619719a60-225x225-png',
    ),
    sanityClient.fetch(
      groq`
        *[_type == 'orderOfIssues'][0]{
          'issues': issues[]->{name}.name
        }.issues
      `,
    ),
  ]);

  const parsedOldContent = {
    ...oldContentFrontMatter,

    article: (
      await remark()
        .use(remarkHtml, { sanitize: false })
        .process(oldContentMarkdown)
    ).toString(),

    relatedPeople,
  };

  return {
    props: {
      celeb: {
        ...rest,
        // facts: factsDataTransform(facts, orderOfIssues),
        oldContent: parsedOldContent,
      },
      placeholderImage,
    },
  };
};
