import { queryType } from '@nexus/schema';
import { decode } from 'jsonwebtoken';

import { getUserId } from '../utils/getUserId';
import { IToken } from '../types/IToken';

export const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, ctx) => {
        const id = getUserId(ctx);
        const user = ctx.prisma.user.findOne({ where: { id } });

        return user;
      },
    });

    t.field('logout', {
      type: 'Boolean',
      resolve: async (_parent, _args, ctx) => {
        const authorization = ctx.request.get('Authorization');

        if (authorization) {
          const rawToken = authorization.replace('Bearer ', '');
          const token = decode(rawToken) as IToken;

          await ctx.redis.setAsync(token.jti, rawToken);
        }

        return true;
      },
    });
  },
});
