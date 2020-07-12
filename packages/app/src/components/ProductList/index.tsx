import React, { FC } from 'react';
import { Grid } from '@chakra-ui/core';

import { Product as ProductType, Price } from '../../graphql';
import { Product } from './Product';

interface ProductListProps {
  subscriptions: Array<{ __typename?: 'Product' } & Pick<ProductType, 'id'>>;
  products: Array<
    Pick<ProductType, 'id' | 'name' | 'description' | 'active' | 'livemode'> & {
      prices: Array<Pick<Price, 'id' | 'unitAmount'>>;
    }
  >;
}

export const ProductList: FC<ProductListProps> = ({
  subscriptions,
  products,
}) => {
  const idsList = subscriptions.map(subscription => subscription.id);

  return (
    <Grid
      width="100%"
      templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
      gap={6}
    >
      <Product
        disabled
        product={{
          id: 'test',
          name: 'Edg.sh Free',
          description:
            'The plan for people who just want to make some quick custom links, no domain needed.',
          active: true,
          livemode: false,
          prices: [
            {
              id: 'free',
              unitAmount: 0,
            },
          ],
        }}
      />
      {products.map(product => (
        <Product
          current={idsList.indexOf(product.id) >= 0}
          key={product.id}
          product={product}
        />
      ))}
      <Product
        product={{
          id: 'test',
          name: 'Edg.sh Business',
          description:
            'The plan for businesses who need to cover multiple domains, and support lots of traffic.',
          active: true,
          livemode: false,
          prices: [
            {
              id: 'business',
              unitAmount: 1999,
            },
          ],
        }}
      />
    </Grid>
  );
};
