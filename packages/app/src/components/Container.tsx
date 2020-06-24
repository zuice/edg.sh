import React, { FC } from 'react';
import { Flex } from '@chakra-ui/core';

interface IContainerProps {
  direction?: 'column' | 'row';
  alignItems?: 'flex-start' | 'center' | 'flex-end';
}

export const Container: FC<IContainerProps> = ({
  children,
  direction,
  alignItems,
}) => (
  <Flex
    width={['95%', '95%', '75%']}
    height="100%"
    margin="0 auto"
    flex="1"
    direction={direction ? direction : 'column'}
    alignItems={alignItems ? alignItems : 'flex-start'}
  >
    {children}
  </Flex>
);
