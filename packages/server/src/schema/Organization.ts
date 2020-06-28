import { objectType } from '@nexus/schema';

export const Organization = objectType({
  name: 'Organization',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.domain();
    t.model.ownerId();
    t.model.owner();
    t.model.members();
    t.model.links();
    t.model.createdAt();
  },
});
