import cookie from 'cookie-signature';
import { setCookie } from 'cookies-next';
import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';
import { discourseSsoSecret, getHmac } from '~/lib/api-route-helpers/user-auth';
import { oneYear } from '~/lib/date';
import { discourseApiClient } from '~/lib/discourseApiClient';

type LoginReturnParams = {
  sso: string;
  sig: string;
};

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const loginReturnParams = req.query as LoginReturnParams;

  if (loginReturnParams.sso && loginReturnParams.sig) {
    return handleLoginReturn(req, res, loginReturnParams);
  } else {
    return handleLoginRequest(req, res);
  }
}

function handleLoginRequest(req: NextApiRequest, res: NextApiResponse) {
  const encodedPayload = Buffer.from(
    QueryString.stringify({
      return_sso_url: 'https://dev.hollowverse.com:3000/api/login',
    }),
    'utf-8',
  ).toString('base64');
  const hexSignature = getHmac().update(encodedPayload).digest('hex');

  return res.redirect(
    `https://forum.hollowverse.com/session/sso_provider?sso=${encodedPayload}&sig=${hexSignature}`,
  );
}

async function handleLoginReturn(
  req: NextApiRequest,
  res: NextApiResponse,
  loginReturnParams: LoginReturnParams,
) {
  const decodedPayload = decodeURIComponent(loginReturnParams.sso);

  const isAuthenticated =
    getHmac().update(decodedPayload).digest('hex') === loginReturnParams.sig;

  if (isAuthenticated) {
    const payload = QueryString.parse(
      Buffer.from(decodedPayload, 'base64').toString(),
    );

    const { user } = await discourseApiClient<{ user: { id: number } }>(
      `u/${payload.username}`,
    );

    const userId = user.id;

    const cookieOptions = {
      req,
      res,
      httpOnly: true,
      secure: true,
      maxAge: oneYear,
    } as const;

    setCookie(
      'userid',
      cookie.sign(userId.toString(), discourseSsoSecret),
      cookieOptions,
    );
  }

  return res.redirect(`https://hollowverse.com`);
}
