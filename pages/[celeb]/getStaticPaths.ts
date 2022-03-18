import { publishedCelebs } from '~/publishedCelebs';

export const getStaticPaths = async () => {
  return {
    paths: publishedCelebs.map((celeb) => {
      return { params: { celeb } };
    }),
    fallback: false,
  };
};
