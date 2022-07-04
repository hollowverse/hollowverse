import { discourseApiClient } from '~/lib/discourseApiClient';
import { TopContributors } from '~/lib/psql/celebTopContributors.psql';
import { ContributorPsql } from '~/lib/psql/contributor.fields';
import { FactPageForumDataPsql } from '~/lib/psql/factPageForumData';
import { Json } from '~/lib/types';

type Query =
  | {
      name: 'top-contributors';
      params: { slug: string };
    }
  | {
      name: 'fact-page-data';
      params: { topic_id: string };
    };

type QueryResults = {
  success: boolean;
  errors: any[];
  duration: number;
  result_count: number;
  params: Json;
  columns: string[];
  default_limit: number;
  relations: {};
  colrender: {};
  rows: any[][];
};

type ProcessedQueryResults = {
  'fact-page-data': [FactPageForumDataPsql];
  'top-contributors': TopContributors;
};

const queryIds: { [name in Query['name']]: number } = {
  'top-contributors': 5,
  'fact-page-data': 6,
};

export async function discoursePsqlQuery<T extends Query>(query: T) {
  const queryResults = await discourseApiClient<QueryResults>(
    `admin/plugins/explorer/queries/${queryIds[query.name]}/run`,
    {
      method: 'POST',
      type: 'form',
      body: { params: JSON.stringify(query.params) },
    },
  );

  return queryResults.rows.map((r) => {
    const obj: { [name: string]: any } = {};

    for (let i = 0; i < r.length; i++) {
      const rKey = queryResults.columns[i];

      obj[rKey] = r[i];
    }

    return obj;
  }) as ProcessedQueryResults[T['name']];
}
