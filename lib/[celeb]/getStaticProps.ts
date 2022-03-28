import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';
import { sanityClient } from '~/lib/components/sanityio';

export const getStaticProps = async ({
  params,
}: {
  params: { celeb: string };
}) => {
  const celeb = await sanityClient.fetch(
    `*[_type == 'celeb' && slug.current == $slug][0]{
      ...,
      'slug': slug.current,
      'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}}
    }`,
    { slug: params.celeb },
  );

  const { oldContent, ...rest } = celeb;
  const { data: oldContentFrontMatter, content: oldContentMarkdown } =
    matter(oldContent);
  const [relatedPeople, placeholderImage] = await Promise.all([
    sanityClient.fetch(
      `*[_type == 'celeb' && slug.current in $slug][0..3]{
          name,
          'slug': slug.current,
          'picture': picture.asset->{_id, 'metadata': {'lqip': metadata.lqip, 'palette': metadata.palette}}
        }`,
      { slug: oldContentFrontMatter.relatedPeople },
    ),
    sanityClient.getDocument(
      'image-98dc320a756a3f0f5dc40a59ced1194619719a60-225x225-png',
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
        oldContent: parsedOldContent,
      },
      placeholderImage,
    },
  };
};
