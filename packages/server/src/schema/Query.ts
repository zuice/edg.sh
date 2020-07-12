import { queryType } from '@nexus/schema';

import { getUserId } from '../utils/getUserId';

export const Query = queryType({
  definition(t) {
    t.field('users', {
      type: 'User',
      list: true,
      resolve: async (_parent, _args, ctx) => {
        const users = await ctx.prisma.user.findMany({
          include: { links: true },
        });

        return users;
      },
    });

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: async (_parent, _args, ctx) => {
        const id = getUserId(ctx);
        const user = await ctx.prisma.user.findOne({ where: { id } });

        return user;
      },
    });

    t.field('subscriptions', {
      type: 'Product',
      list: true,
      resolve: async (_parent, _args, ctx) => {
        const id = getUserId(ctx);
        const user = await ctx.prisma.user.findOne({ where: { id } });

        if (!user?.stripeId) {
          return [];
        }

        const subscriptions = await ctx.stripe.subscriptions.list({
          customer: user?.stripeId ? user?.stripeId : undefined,
        });
        const products = subscriptions.data.map(async subscription => {
          const productId = subscription.plan?.product as string;

          return await ctx.stripe.products.retrieve(productId);
        });

        return products;
      },
    });

    t.field('products', {
      type: 'Product',
      list: true,
      resolve: async (_parent, _args, ctx) => {
        const plans = await ctx.stripe.products.list({
          type: 'service',
          active: true,
        });

        return plans.data;
      },
    });

    t.field('links', {
      type: 'Link',
      list: true,
      resolve: async (_parent, _args, ctx) => {
        const userId = getUserId(ctx);
        const links = await ctx.prisma.link.findMany({
          where: { userId },
          include: { organization: true },
        });

        return links;
      },
    });

    t.field('organizations', {
      type: 'Organization',
      list: true,
      resolve: async (_parent, _args, ctx) => {
        const id = getUserId(ctx);
        const user = await ctx.prisma.user.findOne({
          where: { id },
          include: { partOfOrganizations: true },
        });

        return user!.partOfOrganizations;
      },
    });
  },
});
