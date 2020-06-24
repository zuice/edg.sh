import React from 'react';
import { Box, theme } from '@chakra-ui/core';

import { NavbarLeft } from './NavbarLeft';
import { NavbarRight } from './NavbarRight';
import { Container } from '../Container';

export const Navbar = () => (
  <Box
    as="header"
    width="100%"
    height="65px"
    padding="10px 0"
    marginBottom="10px"
    borderBottom={`1px solid ${theme.colors.gray[700]}`}
  >
    <Container direction="row" alignItems="center">
      <NavbarLeft />
      <NavbarRight />
    </Container>
  </Box>
);
