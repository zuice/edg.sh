import { RedisClient } from 'redis';
import { verify } from 'jsonwebtoken';

import { IToken } from '../types/IToken';

export const verifyToken = async (
  token: string,
  redis: RedisClient,
): Promise<boolean> => {
  const secret = process.env.APP_SECRET!;
  const { jti } = verify(token, secret) as IToken;
  const exists = await redis.existsAsync(jti);

  if (exists) {
    return false;
  }

  return true;
};
