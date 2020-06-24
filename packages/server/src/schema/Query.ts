import { queryType } from '@nexus/schema';

import { getUserId } from '../utils/getUserId';

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

    t.field('links', {
      type: 'Link',
      list: true,
      resolve: async (_parent, _args, ctx) => {
        const userId = getUserId(ctx);
        const links = await ctx.prisma.link.findMany({ where: { userId } });

        return links;
      },
    });
  },
});
