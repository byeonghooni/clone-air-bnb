import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'DELETE') {
    res.statusCode = 405;
    return res.end();
  }

  try {
    res.setHeader(
      'Set-Cookie',
      'access_token=; path=/; expires=Thu, 01, Jan 1970 00:00:00 GMT; httponly',
    );
    res.statusCode = 204;
    return res.end();
  } catch (e) {
    res.send(e.message);
  }
};
