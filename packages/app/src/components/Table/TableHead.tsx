import React, { FC } from 'react';
import { BoxProps, Box } from '@chakra-ui/core';

export const TableHead: FC<BoxProps> = props => <Box as="thead" {...props} />;
