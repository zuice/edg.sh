import React, { FC } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';

export const Table: FC<BoxProps> = props => (
  <Box
    width="100%"
    backgroundColor="gray.700"
    marginTop={3}
    shadow="sm"
    rounded="lg"
    overflow="hidden"
  >
    <Box as="table" width="full" {...props} />
  </Box>
);

export { TableBody } from './TableBody';
export { TableCell } from './TableCell';
export { TableHead } from './TableHead';
export { TableHeader } from './TableHeader';
export { TableRow } from './TableRow';
