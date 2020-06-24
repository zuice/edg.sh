import React, { FC } from 'react';
import { Flex, Heading } from '@chakra-ui/core';

interface IDashboardHeaderProps {
  title: string;
}

export const DashboardHeader: FC<IDashboardHeaderProps> = ({
  title,
  children,
}) => (
  <Flex width="100%">
    <Heading width="50%" size="lg">
      {title}
    </Heading>
    <Flex width="50%" justifyContent="flex-end">
      {children}
    </Flex>
  </Flex>
);
