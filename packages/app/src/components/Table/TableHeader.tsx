import React, { FC } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';

export const TableHeader: FC<BoxProps> = props => (
  <Box
    as="th"
    px="6"
    py="3"
    borderBottomWidth="1px"
    backgroundColor="gray.900"
    textAlign="left"
    fontSize="xs"
    color="gray.500"
    textTransform="uppercase"
    letterSpacing="wider"
    lineHeight="1rem"
    fontWeight="medium"
    {...props}
  />
);
