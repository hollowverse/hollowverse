import React from 'react';
import { useKnowledgeGraphCeleb } from '~/lib/KnowledgeGraphCeleb/useKnowledgeGraphCeleb';

export function KnowledgeGraphCeleb(params: any) {
  useKnowledgeGraphCeleb(params.kgCeleb.result.name);

  return <pre>{JSON.stringify(params, null, 2)}</pre>;
}
