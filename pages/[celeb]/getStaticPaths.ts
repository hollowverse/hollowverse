import { sanityClient } from '~/pages/components/sanityio';

export const getStaticPaths = async () => {
  const celebs = await sanityClient.fetch(
    `*[_type == "celeb"]{'celeb': slug.current}`,
  );

  return {
    paths: celebs.map((celeb: string) => ({
      params: [{ celeb }],
    })),
    fallback: true,
  };
};
