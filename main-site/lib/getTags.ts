import { differenceWith, intersectionWith } from 'lodash-es';
import { GroupedFacts } from '~/lib/factsDataTransform';
import { Tag } from '~/lib/groq/fact.partial.groq';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.groq';

const tagExists = (tagsArr: Tag[], tag: Tag) =>
  tagsArr.some((t) => t.tag.name === tag.tag.name);

export const getTags = (
  groupedFacts: GroupedFacts,
  orderOfIssues: OrderOfIssues,
) => {
  const comparator = (tag: Tag, topic: string) => tag.tag.topic.name === topic;
  const sortComparator = (a: Tag, b: Tag) =>
    orderOfIssues.indexOf(a.tag.topic.name) -
    orderOfIssues.indexOf(b.tag.topic.name);

  const { topics, groups } = groupedFacts;
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

  (['lowConfidence', 'regular'] as const).forEach((type) => {
    const intersection = intersectionWith(
      tags[type],
      orderOfIssues,
      comparator,
    );
    const difference = differenceWith(tags[type], orderOfIssues, comparator);

    tags[type] = [...intersection.sort(sortComparator), ...difference.sort()];
  });

  return [...tags.regular, ...tags.lowConfidence];
};
