export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};
