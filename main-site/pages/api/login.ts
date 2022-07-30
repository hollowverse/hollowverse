import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';
import { getHmac, setAuthCookie } from '~/lib/api-route-helpers/user-auth';
import { discourseApiClient } from '~/lib/discourseApiClient';
import { getWebsiteUrl } from '~/lib/getWebsiteUrl';

type LoginReturnParams = {
  sso: string;
  sig: string;
};

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const loginReturnParams = req.query as LoginReturnParams;

  if (loginReturnParams.sso && loginReturnParams.sig) {
    return handleLoginReturn(req, res);
  } else {
    return handleLoginRequest(req, res);
  }
}

function handleLoginRequest(req: NextApiRequest, res: NextApiResponse) {
  const { redirect } = req.query as { redirect: string };

  console.log('redirect', redirect);

  const sso = Buffer.from(
    QueryString.stringify(
      {
        return_sso_url: `${getWebsiteUrl()}/api/login`,
        'custom.redirect': redirect || null,
      },
      { skipNulls: true },
    ),
    'utf-8',
  ).toString('base64');
  const sig = getHmac().update(sso).digest('hex');

  return res.redirect(
    `https://forum.hollowverse.com/session/sso_provider?sso=${sso}&sig=${sig}`,
  );
}

async function handleLoginReturn(req: NextApiRequest, res: NextApiResponse) {
  const { sso, sig } = req.query as LoginReturnParams;

  const decodedPayload = decodeURIComponent(sso);

  const isAuthenticated =
    getHmac().update(decodedPayload).digest('hex') === sig;

  if (isAuthenticated) {
    const payload = QueryString.parse(
      Buffer.from(decodedPayload, 'base64').toString(),
    );

    const { username, 'custom.redirect': redirect } = payload as {
      username: string;
      'custom.redirect': string;
    };

    const { user } = await discourseApiClient<{ user: { id: number } }>(
      `u/${username}.json`,
    );

    const userId = user.id;

    setAuthCookie(req, res, userId.toString());

    return res.redirect(redirect || getWebsiteUrl());
  }

  return res.redirect(getWebsiteUrl());
}
