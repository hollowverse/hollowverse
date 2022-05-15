import { isEmpty } from 'lodash-es';
import { useEffect } from 'react';
import { logMissingFacts } from '~/lib/pages/utils/logMissingCeleb';
import { GroupedFacts } from '~/lib/pages/utils/types';

export function useCeleb(name: string, factGroups: GroupedFacts['groups']) {
  useEffect(() => {
    if (isEmpty(factGroups)) {
      logMissingFacts(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
