import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';

export function signToken(user: User, expiresIn: string): string {
  const token = sign({ user, jti: v4() }, process.env.APP_SECRET || '', {
    expiresIn,
  });

  return token;
}
