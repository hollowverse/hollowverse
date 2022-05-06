import { isEmpty } from 'lodash-es';
import { useEffect } from 'react';
import { logMissingCeleb } from '~/lib/components/logMissingCeleb';
import { GroupedFacts } from '~/lib/components/types';

export function useCeleb(name: string, facts?: GroupedFacts) {
  useEffect(() => {
    if (isEmpty(facts)) {
      logMissingCeleb(name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
