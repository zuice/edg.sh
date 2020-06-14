import { Context } from '../context';
import { verify } from 'jsonwebtoken';

interface Token {
  userId: string;
}

export function getUserId(ctx: Context): string {
  const Authorization = ctx.request.get('Authorization');
  const token = Authorization!.replace('Bearer ', '');
  const verified = verify(token, process.env.APP_SECRET!) as Token;

  return verified && verified.userId;
}
