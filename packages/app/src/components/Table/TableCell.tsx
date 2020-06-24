import React, { FC } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';

export const TableCell: FC<BoxProps> = props => (
  <Box
    as="td"
    px="6"
    py="4"
    lineHeight="1.25rem"
    whiteSpace="nowrap"
    {...props}
  />
);
