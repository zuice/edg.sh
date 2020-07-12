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
    t.string('object');
    t.string('type');
    t.int('updated');
    t.field('prices', {
      type: 'Price',
      list: true,
      resolve: async (parent, _args, ctx) => {
        const { id } = parent;
        const prices = await ctx.stripe.prices.list({ product: id });
        const pricesFormatted = prices.data.map(price => ({
          ...price,
          product: price.product as string,
          unitAmount: price.unit_amount,
        }));

        return pricesFormatted;
      },
    });
  },
});
