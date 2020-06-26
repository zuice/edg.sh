import React from 'react';
import { Flex, Spinner } from '@chakra-ui/core';

export const Loading = () => (
  <Flex
    width="100vw"
    height="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <Spinner
      size="xl"
      alignItems="center"
      justifyContent="center"
      color="orange.500"
    />
  </Flex>
);
