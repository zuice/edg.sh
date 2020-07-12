import { objectType } from '@nexus/schema';

export const Price = objectType({
  name: 'Price',
  definition(t) {
    t.id('id');
    t.string('product');
    t.boolean('active');
    t.string('object');
    t.int('unitAmount', { nullable: true });
  },
});
