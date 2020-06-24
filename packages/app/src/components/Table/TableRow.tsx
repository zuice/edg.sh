import React, { FC } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';

export const TableRow: FC<BoxProps> = props => <Box as="tr" {...props} />;
