import React, { FC } from 'react';
import { useColorMode, BoxProps, Box } from '@chakra-ui/core';

type TableRowProps = BoxProps & {
  index: number;
};

export const TableRow: FC<TableRowProps> = props => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="tr"
      my={10}
      {...props}
      backgroundColor={
        props.index % 2
          ? colorMode === 'dark'
            ? 'gray.600'
            : 'gray.200'
          : colorMode === 'dark'
          ? 'gray.700'
          : 'gray.100'
      }
    />
  );
};
