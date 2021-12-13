import { publishedNotablePeople } from '_r/publishedNotablePeople';

export const getStaticPaths = async () => {
  return {
    paths: publishedNotablePeople.map((notablePerson) => {
      return { params: { notablePerson } };
    }),
    fallback: false,
  };
};
