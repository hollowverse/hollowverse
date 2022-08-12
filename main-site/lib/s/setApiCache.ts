import { NextApiResponse } from 'next';
import { oneDay } from '~/lib/d/date';

export function setApiCache(res: NextApiResponse) {
  res.setHeader(
    'Cache-Control',
    `max-age=0, s-maxage=${oneDay}, stale-while-revalidate`,
  );
}
