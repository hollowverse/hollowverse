import { sanityClient } from '~/pages/components/sanityio';

export const getStaticPaths = async () => {
  const paths = await sanityClient.fetch(
    `*[_type == "celeb"]{'params': {'celeb': slug.current}}`,
  );

  return {
    paths,
    fallback: false,
  };
};
