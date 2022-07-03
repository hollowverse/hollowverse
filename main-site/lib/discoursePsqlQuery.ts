import { discourseApiClient } from '~/lib/discourseApiClient';

type Query =
  | {
      name: 'top-contributors';
      params: { slug: string };
    }
  | {
      name: 'fact-page-data';
      params: { topic_id: string };
    };

const queryIds: { [name in Query['name']]: number } = {
  'top-contributors': 5,
  'fact-page-data': 6,
};

type QueryResultsType = {
  'top-contributors': { foo: string };
  'fact-page-data': { bar: number };
};

export function discoursePsqlQuery<T extends Query>(query: T) {
  return discourseApiClient<QueryResultsType[T['name']]>(
    `admin/plugins/explorer/queries/${queryIds[query.name]}/run`,
    {
      method: 'POST',
      type: 'form',
      body: { params: JSON.stringify(query.params) },
    },
  );
}
