import { objectType } from '@nexus/schema';

export const Link = objectType({
  name: 'Link',
  definition(t) {
    t.model.id();
    t.model.slug();
    t.model.url();
    t.model.user();
    t.model.userId();
  },
});
