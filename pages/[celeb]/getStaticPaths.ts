export const getStaticPaths = () => {
  return {
    paths: [{ params: { celeb: 'alyson-hannigan' } }],
    fallback: 'blocking',
  };
};
