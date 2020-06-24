import { Context } from '../context';
import { verify } from 'jsonwebtoken';

import { IToken } from '../types/IToken';

export function getUserId(ctx: Context): string {
  const Authorization = ctx.request.get('Authorization');
  const token = Authorization!.replace('Bearer ', '');
  const verified = verify(token, process.env.APP_SECRET!) as IToken;

  return verified && verified.user.id;
}
