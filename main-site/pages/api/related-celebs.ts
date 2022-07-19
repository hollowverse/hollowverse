import { NextApiRequest, NextApiResponse } from 'next';
import { cors } from '~/lib/cors';
import { setApiCache } from '~/lib/setApiCache';

export default function RelatedCelebs(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  cors(req, res);
  setApiCache(res);

  res.status(200).json({ name: 'John Doe' });
}
