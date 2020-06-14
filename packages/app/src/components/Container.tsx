import React, { FC } from 'react';
import { Flex } from '@chakra-ui/core';

export const Container: FC = ({ children }) => (
  <Flex flex="1" direction="column">
    {children}
  </Flex>
);
