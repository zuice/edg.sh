import { objectType } from '@nexus/schema';

export const Product = objectType({
  name: 'Product',
  definition(t) {
    t.id('id');
    t.string('name');
    t.string('description', { nullable: true });
    t.boolean('active');
    t.int('created');
    t.boolean('livemode');
    t.string('name');
    t.string('status');
    t.string('type');
    t.int('updated');
  },
});
