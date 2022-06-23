import { uniqBy, differenceWith, filter } from 'lodash-es';
import { OrderOfIssues } from '~/lib/groq/orderOfIssues.projection';
import { Tag } from '~/lib/groq/tag.projection';

export function sortTags(tags: Tag[], orderOfIssues: OrderOfIssues) {
  const noDupes = uniqBy(
    tags,
    (t) => `${t.tag.name}-is-low-confidence-${t.isLowConfidence}`,
  );

  // Remove lowConfidence tags if a regular one exists
  const noUnnecessaryLowConfidence = noDupes.filter((t) => {
    if (!t.isLowConfidence) {
      return true;
    }

    const regularExists = noDupes.some((t2) => {
      return t2.tag.name === t.tag.name && !t2.isLowConfidence;
    });

    if (regularExists) {
      return false;
    }

    return true;
  });

  const diff = differenceWith(
    noUnnecessaryLowConfidence,
    orderOfIssues,
    (t, i) => t.tag.issue.name === i,
  );

  const intersection = filter(noUnnecessaryLowConfidence, (t) => {
    return orderOfIssues.includes(t.tag.issue.name);
  });

  intersection.sort(function (a, b) {
    return (
      orderOfIssues.indexOf(a.tag.issue.name) -
      orderOfIssues.indexOf(b.tag.issue.name)
    );
  });

  return [...intersection, ...diff];
}
