import { isString } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import ogs from 'open-graph-scraper';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { cors } from '~/lib/cors';
import { log } from '~/shared/lib/log';

async function scrapeOpenGraph(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  const url = req.query.url;

  log('info', `scrape-open-graph: ${url}`);

  if (!url || !isString(url)) {
    throw new Error(
      `URL query param required. Received ${JSON.stringify(url)}`,
    );
  }

  const options = { url };

  const data = await ogs(options);

  const { result } = data;

  return res.json({ result });
}

export default apiHandlerWithErrorLogging('scrape-open-graph', scrapeOpenGraph);
