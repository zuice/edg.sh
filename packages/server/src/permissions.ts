import { rule, shield } from 'graphql-shield';

import { Context } from './context';
import { verifyToken } from './utils/verifyToken';

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
};

export const permissions = shield({
  Query: {
    me: rules.isAuthenticated,
  },
  Mutation: {
    login: rules.isUnauthenticated,
    register: rules.isUnauthenticated,
    logout: rules.isAuthenticated,
  },
});
