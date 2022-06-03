export const getStaticPaths = () => {
  return {
    paths: [{params: {celeb: 'now'}}],
    fallback: false
  };
};
