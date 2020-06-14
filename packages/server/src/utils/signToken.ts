import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

export function signToken(user: User): string {
  const token = sign(
    { userId: user.id, jti: v4() },
    process.env.APP_SECRET || '',
    { expiresIn: '1d' },
  );

  return token;
}
