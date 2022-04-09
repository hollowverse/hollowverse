import { differenceWith, intersectionWith } from 'lodash-es';
import { GroupedFacts, Tag } from '~/lib/components/types';

const tagExists = (tagsArr: Tag[], tag: Tag) =>
  tagsArr.some((t) => t.tag.name === tag.tag.name);

export const getTags = (
  transformedFacts: GroupedFacts,
  orderOfTopics: string[],
) => {
  const comparator = (tag: Tag, topic: string) => tag.tag.topic.name === topic;
  const sortComparator = (a: Tag, b: Tag) =>
    orderOfTopics.indexOf(a.tag.topic.name) -
    orderOfTopics.indexOf(b.tag.topic.name);

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

  const regIntersection = intersectionWith(
    tags.regular,
    orderOfTopics,
    comparator,
  );
  const regDifference = differenceWith(tags.regular, orderOfTopics, comparator);
  const lowConIntersection = intersectionWith(
    tags.lowConfidence,
    orderOfTopics,
    comparator,
  );
  const lowConDifference = differenceWith(
    tags.lowConfidence,
    orderOfTopics,
    comparator,
  );

  tags.regular = [
    ...regIntersection.sort(sortComparator),
    ...regDifference.sort(),
  ];
  tags.lowConfidence = [
    ...lowConIntersection.sort(sortComparator),
    ...lowConDifference.sort(),
  ];

  return tags;
};
