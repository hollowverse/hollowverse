import { isEmpty } from 'lodash-es';
import { useEffect } from 'react';
import { logMissingFacts } from '~/lib/pages/utils/logMissingCeleb';
import { GroupedFacts, Tag, TCelebOldContent } from '~/lib/pages/utils/types';

export function useCeleb(name: string, factGroups: GroupedFacts['groups']) {
  useEffect(() => {
    if (isEmpty(factGroups)) {
      logMissingFacts(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export function getHeadDescription(
  name: string,
  tags: Tag[],
  oldContent?: TCelebOldContent,
) {
  if (!isEmpty(tags)) {
    return `${name}: ${tags
      .map((t) => `${t.isLowConfidence ? 'Possibly ' : ''}${t.tag.name}`)
      .join(', ')
      .substring(0, 200)
      .trim()}...`;
  }

  if (oldContent?.summaries) {
    return (
      `${name}'s religion: ${oldContent.summaries.religion}. ${name}'s political views: ${oldContent.summaries.politicalViews}`.substring(
        0,
        200,
      ) + '...'
    );
  }

  return '';
}
