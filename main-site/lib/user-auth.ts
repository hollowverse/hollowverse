import cookie from 'cookie-signature';
import { getCookie, setCookie } from 'cookies-next';
import crypto from 'crypto';
import { isString } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import { AUTH_COOKIE_NAME } from '~/lib/constants';
import { oneYear } from '~/lib/date';

type OptionType = NonNullable<Parameters<typeof getCookie>[1]>;
type Req = OptionType['req'];
type Res = OptionType['res'];

export const discourseSsoSecret = process.env.DISCOURSE_SSO_SECRET as string;

export function getHmac() {
  return crypto.createHmac('sha256', discourseSsoSecret);
}

export function getUserAuth(req: Req, res: Res) {
  const tentativeAuth = getCookie(AUTH_COOKIE_NAME, { req, res });

  if (!isString(tentativeAuth)) {
    return null;
  }

  const auth = cookie.unsign(tentativeAuth, discourseSsoSecret);

  if (!auth) {
    return null;
  }

  return JSON.parse(auth) as { id: number; username: string };
}

export function setAuthCookie(
  req: NextApiRequest,
  res: NextApiResponse,
  userId: string,
) {
  const cookieOptions = {
    req,
    res,
    secure: true,
    maxAge: oneYear,
  } as const;

  setCookie(
    AUTH_COOKIE_NAME,
    cookie.sign(userId, discourseSsoSecret),
    cookieOptions,
  );
}
