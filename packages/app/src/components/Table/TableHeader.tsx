import React, { FC } from 'react';
import { useColorMode, BoxProps, Box } from '@chakra-ui/core';

export const TableHeader: FC<BoxProps> = props => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="th"
      px="6"
      py="3"
      borderBottomWidth="1px"
      backgroundColor={colorMode === 'dark' ? 'gray.900' : 'gray.300'}
      textAlign="left"
      fontSize="xs"
      color={colorMode === 'dark' ? 'gray.500' : 'gray.900'}
      textTransform="uppercase"
      letterSpacing="wider"
      lineHeight="1rem"
      fontWeight="medium"
      {...props}
    />
  );
};
