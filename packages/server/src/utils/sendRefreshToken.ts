import { Response } from 'express';

export const sendRefreshToken = (res: Response, token: string): void => {
  res.cookie('jid', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    domain: process.env.NODE_ENV === 'production' ? '.edg.sh' : undefined,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  });
};
