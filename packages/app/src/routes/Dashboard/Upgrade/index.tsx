import React from 'react';
import { Helmet } from 'react-helmet';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Grid,
} from '@chakra-ui/core';

import { useProductsQuery } from '../../../graphql';
import { ProductList } from '../../../components/ProductList';
import { ProductSkeleton } from '../../../components/ProductList/ProductSkeleton';

export const Upgrade = () => {
  const [productsPayload] = useProductsQuery();

  if (productsPayload.data) {
    return (
      <>
        <Helmet>
          <title>Upgrade - Edg.sh</title>
        </Helmet>
        <ProductList
          subscriptions={productsPayload.data.subscriptions}
          products={productsPayload.data.products}
        />
      </>
    );
  }

  if (productsPayload.error) {
    return (
      <Alert width="100%" marginTop={3} borderRadius={5} status="error">
        <AlertIcon />
        <AlertTitle mr={2}>Error!</AlertTitle>
        <AlertDescription>
          We had an issue grabbing your organizations.
        </AlertDescription>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  }

  return (
    <Grid
      width="100%"
      templateColumns="repeat(auto-fit, minmax(240px, 1fr))"
      gap={6}
    >
      <ProductSkeleton />
      <ProductSkeleton />
      <ProductSkeleton />
    </Grid>
  );
};
