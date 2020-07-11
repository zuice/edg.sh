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
    t.string('statement_descriptor', { nullable: true });
    t.string('unit_label', { nullable: true });
    t.string('name');
    t.string('object');
    t.string('type');
    t.int('updated');
  },
});
