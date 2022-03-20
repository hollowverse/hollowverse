// import { publishedCelebs } from '~/publishedCelebs';

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
