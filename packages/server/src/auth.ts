import { User } from '@prisma/client';
import { signToken } from './utils/signToken';

export const createAccessToken = (user: User): string => {
  return signToken(user, '15m');
};

export const createRefreshToken = (user: User): string => {
  return signToken(user, '7d');
};
