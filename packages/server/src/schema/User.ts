import { objectType } from '@nexus/schema';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.email();
    t.model.tokenVersion();
    t.model.stripeId();
    t.model.links();
    t.model.createdAt();
  },
});
