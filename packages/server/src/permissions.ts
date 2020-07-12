import { rule, shield } from 'graphql-shield';

import { Context } from './context';
import { verifyToken } from './utils/verifyToken';
import { getUserId } from './utils/getUserId';

const rules = {
  isAuthenticated: rule()(async (_parent, _args, ctx: Context) => {
    const authorization = ctx.request.get('Authorization');

    if (authorization) {
      const tokenRaw = authorization.replace('Bearer ', '');
      const valid = verifyToken(tokenRaw, ctx.redis);

      return valid;
    }

    return false;
  }),
  isUnauthenticated: rule()(async (_parent, _args, ctx: Context) => {
    const authorization = ctx.request.get('Authorization');

    if (authorization) {
      const tokenRaw = authorization.replace('Bearer ', '');
      const valid = await verifyToken(tokenRaw, ctx.redis);

      return !valid;
    }

    return true;
  }),
  isPro: rule()(async (_parent, _args, ctx: Context) => {
    const authorization = ctx.request.get('Authorization');

    if (!authorization) {
      return false;
    }

    const tokenRaw = authorization.replace('Bearer ', '');
    const valid = await verifyToken(tokenRaw, ctx.redis);

    if (!valid) {
      return false;
    }

    const id = getUserId(ctx);
    const user = await ctx.prisma.user.findOne({
      where: { id },
      include: { ownedOrganizations: true },
    });

    if (!user) {
      return false;
    }

    if (!user.stripeId) {
      return false;
    }

    if (user.ownedOrganizations.length >= 1) {
      return false;
    }

    const proId = 'prod_HcoeDU9hILvxlp';
    const subscriptions = await ctx.stripe.subscriptions.list({
      customer: user.stripeId,
    });
    const products = subscriptions.data.map(async subscription => {
      const productId = subscription.plan?.product as string;

      return await ctx.stripe.products.retrieve(productId, {});
    });
    const resolvedProducts = await Promise.all(products);
    const idsList = resolvedProducts.map(product => product.id);

    console.log(idsList);

    if (idsList.indexOf(proId) >= 0) {
      return true;
    }

    return false;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticated,
    links: rules.isAuthenticated,
    subscriptions: rules.isAuthenticated,
  },
  Mutation: {
    login: rules.isUnauthenticated,
    register: rules.isUnauthenticated,
    logout: rules.isAuthenticated,
    createSubscription: rules.isAuthenticated,
    createLink: rules.isAuthenticated,
    createOrganization: rules.isPro,
    destroyLink: rules.isAuthenticated,
    destroyOrganization: rules.isPro,
  },
});
