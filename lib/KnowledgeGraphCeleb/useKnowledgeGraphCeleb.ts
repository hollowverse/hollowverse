import { useEffect } from 'react';
import { logMissingCeleb } from '~/lib/components/logMissingCeleb';

export function useKnowledgeGraphCeleb(name: string) {
  useEffect(() => {
    logMissingCeleb(name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
