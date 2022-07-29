import crypto from 'crypto';
import { NextApiRequest, NextApiResponse } from 'next';
import QueryString from 'qs';
import { v4 as uuid } from 'uuid';

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

function getHmac() {
  return crypto.createHmac(
    'sha256',
    process.env.DISCOURSE_SSO_SECRET as string,
  );
}

function handleLoginRequest(req: NextApiRequest, res: NextApiResponse) {
  const nonce = uuid();

  const payload = {
    nonce,
    return_sso_url: 'https://dev.hollowverse.com:3000/api/login',
  };
  const base64Payload = Buffer.from(
    QueryString.stringify(payload),
    'utf-8',
  ).toString('base64');
  const urlEncodedPayload = encodeURIComponent(base64Payload);
  const hexSignature = getHmac().update(base64Payload).digest('hex');

  res.redirect(
    `https://forum.hollowverse.com/session/sso_provider?sso=${urlEncodedPayload}&sig=${hexSignature}`,
  );
}

function handleLoginReturn(
  req: NextApiRequest,
  res: NextApiResponse,
  loginReturnParams: LoginReturnParams,
) {
  const decodedPayload = decodeURIComponent(loginReturnParams.sso);

  const isLoggedIn =
    getHmac().update(decodedPayload).digest('hex') === loginReturnParams.sig;

  if (isLoggedIn) {
    const payload = QueryString.parse(
      Buffer.from(decodedPayload, 'base64').toString(),
    );

    return res.json({ payload });
  }

  return res.json({ isLoggedIn: false });
}
