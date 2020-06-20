import React, { FC } from 'react';
import { Flex } from '@chakra-ui/core';

export const Container: FC = ({ children }) => (
  <Flex width="95%" margin="0 auto" flex="1" direction="column">
    {children}
  </Flex>
);
