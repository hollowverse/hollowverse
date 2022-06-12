import { knowledgeGraphClient } from '../../../shared/lib/knowledgeGraphClient';

export function kgCall(query: string) {
  return knowledgeGraphClient({
    limit: 20,
    query: encodeURIComponent(query),
  });
}
