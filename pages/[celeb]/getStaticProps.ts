import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { sanityClient } from '../components/sanityio';
import { getImageLink } from './getStaticProps.helpers';

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  const celeb = await sanityClient.fetch(
    `*[_type == 'celeb' && slug.current == $slug][0]{
      ...,
      'slug': slug.current,
      'picture': picture.asset._ref
    }`,
    { slug: params.celeb },
  );
  const { oldContent, ...rest } = celeb;
  const { data: oldContentFrontMatter, content: oldContentMarkdown } =
    matter(oldContent);
  const relatedPeople = await sanityClient.fetch(
    `*[_type == 'celeb' && slug.current in $slug][0..3]{
        name,
        'slug': slug.current,
        'picture': picture.asset._ref
      }`,
    { slug: oldContentFrontMatter.relatedPeople },
  );

  const parsedOldContent = {
    ...oldContentFrontMatter,

    article: (
      await remark()
        .use(remarkHtml, { sanitize: false })
        .process(oldContentMarkdown)
    ).toString(),

    relatedPeople,
  };

  const imagePath = getImageLink(celeb.wikipediaId);

  return {
    props: {
      slug: params.celeb,
      celeb: rest,
      celebOldContent: parsedOldContent,
      pic: imagePath,
    },
  };
};
