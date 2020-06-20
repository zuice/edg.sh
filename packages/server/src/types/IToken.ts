import { User } from '@prisma/client';

export interface IToken {
  user: User;
  jti: string;
}
