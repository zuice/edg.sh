import React from 'react';
import { useColorMode, Box, theme } from '@chakra-ui/core';

import { NavbarLeft } from './NavbarLeft';
import { NavbarRight } from './NavbarRight';
import { Container } from '../Container';

export const Navbar = () => {
  const { colorMode } = useColorMode();

  return (
    <Box
      as="header"
      width="100%"
      height="65px"
      padding="10px 0"
      marginBottom="10px"
      borderBottom={
        colorMode === 'dark'
          ? `1px solid ${theme.colors.gray[700]}`
          : `1px solid ${theme.colors.gray[100]}`
      }
    >
      <Container direction="row" alignItems="center">
        <NavbarLeft />
        <NavbarRight />
      </Container>
    </Box>
  );
};
