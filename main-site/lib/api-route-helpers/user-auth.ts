import { getCookie } from 'cookies-next';
import crypto from 'crypto';
import { isString } from 'lodash-es';
import { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie-signature';

export const discourseSsoSecret = '6yk3S54losS';
// export const discourseSsoSecret = process.env.DISCOURSE_SSO_SECRET as string;

export function getHmac() {
  // This secret is compromised. Change it.
  return crypto.createHmac('sha256', discourseSsoSecret);
}

export function getAuthenticatedUserId(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const tentativeUserId = getCookie('userid', { req, res });

  if (!isString(tentativeUserId)) {
    return null;
  }

  const userId = cookie.unsign(tentativeUserId, discourseSsoSecret);

  if (!userId) {
    return null;
  }

  return userId;
}
