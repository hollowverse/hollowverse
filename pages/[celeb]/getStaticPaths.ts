export const getStaticPaths = async () => {
  return {
    paths: [{ params: { celeb: 'alyson-hannigan' } }],
    fallback: 'blocking',
  };
};
