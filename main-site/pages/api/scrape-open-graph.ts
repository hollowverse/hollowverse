import { isString } from 'lodash-es';
import type { NextApiRequest, NextApiResponse } from 'next';
import { apiHandlerWithErrorLogging } from '~/lib/apiHandlerWithErrorLogging';
import { cors } from '~/lib/cors';
import { logger } from '~/shared/lib/log';
import ogs from 'open-graph-scraper';

async function scrapeOpenGraph(req: NextApiRequest, res: NextApiResponse) {
  await cors(req, res);

  const url = req.query.url;

  logger.info(`scrape-open-graph: ${url}`);

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
