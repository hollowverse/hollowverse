import type { NextApiRequest, NextApiResponse } from 'next';
import { discourseClientApi } from '~/lib/discourseClientApi';

async function testApiRoute(req: NextApiRequest, res: NextApiResponse) {
  const val = await discourseClientApi(`t/-/asdf.json`);

  return res.json({ ok: val });
}

export default async function withErrorHandling(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    return await testApiRoute(req, res);
  } catch (e) {
    console.log('e', e);
    /**
     * This `content-change-notify` API handler triggered by a Sanity webhook.
     * And the Sanity webhook will keep retrying infinitely if we return
     * anything but success.
     *
     * So we just log whatever the issue is and tell the webhook "ok" to shut it
     * up.
     */
    return res.json({ ok: true });
  }
}
