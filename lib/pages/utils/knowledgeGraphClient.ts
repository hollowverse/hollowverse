import { defaults } from 'lodash-es';

const apiKey = 'AIzaSyDiyeA6ZhuHWZd7LNgyI66PS1QEIx0DOQI';

export async function knowledgeGraphClient(
  params: { limit?: number; apiKey?: string } & (
    | { query: string; id?: undefined }
    | { id: string; query?: undefined }
  ),
) {
  params = defaults(params, {
    limit: 10,
    apiKey,
  });

  const append = params.query
    ? `query=${encodeURIComponent(params.query)}`
    : `ids=${encodeURIComponent(params.id!)}`;

  const response = await fetch(
    `https://kgsearch.googleapis.com/v1/entities:search?key=${params.apiKey}&limit=${params.limit}&types=Person&prefix=true&${append}`,
  );
  const results = await response.json();

  return results.itemListElement;
}
