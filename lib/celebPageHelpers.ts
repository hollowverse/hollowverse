import { isEmpty } from 'lodash-es';
import { useEffect } from 'react';
import { GroupedFacts } from '~/lib/factsDataTransform';
import { Tag } from '~/lib/groq/fact.partial.groq';
import { logMissingFacts } from '~/lib/logMissingCeleb';
import { CelebPageProps } from '~/lib/getStatic/celebPage.getStaticProps';

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
  oldContent?: CelebPageProps['celeb']['oldContent'],
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
