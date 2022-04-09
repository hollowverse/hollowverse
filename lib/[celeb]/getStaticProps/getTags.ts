import { GroupedFacts, Tag } from '~/lib/components/types';

const tagExists = (tagsArr: Tag[], tag: Tag) =>
  tagsArr.some((t) => t.tag.name === tag.tag.name);

export const getTags = (transformedFacts: GroupedFacts) => {
  const { topics, groups } = transformedFacts;

  const tags: { regular: Tag[]; lowConfidence: Tag[] } = {
    regular: [],
    lowConfidence: [],
  };

  topics.forEach((topic) => {
    const group = groups[topic];

    group.forEach((fact) => {
      fact.tags.forEach((t) => {
        if (t.isLowConfidence) {
          !tagExists(tags.lowConfidence, t) && tags.lowConfidence.push(t);
        } else {
          !tagExists(tags.regular, t) && tags.regular.push(t);
        }
      });
    });
  });

  return tags;
};
