import React from 'react';
import { useColorMode, Flex, Skeleton, theme } from '@chakra-ui/core';

export const ProductSkeleton = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex
      width="100%"
      direction="column"
      padding={5}
      border={`1px solid ${
        colorMode === 'dark' ? theme.colors.gray[700] : theme.colors.gray[200]
      }`}
      borderRadius={5}
    >
      <Skeleton width="100%" height={8} />
      <Skeleton width="100%" marginTop={4} height={2} />
      <Skeleton width="100%" marginTop={2} height={2} />
      <Skeleton width="100%" marginTop={2} height={2} />
      <Skeleton width="100%" marginTop={2} height={2} />
      <Skeleton width="100%" marginTop={4} height={5} />
      <Skeleton width="100%" marginTop={4} height={1} />
      <Skeleton width="130px" marginTop={4} height={10} />
    </Flex>
  );
};
