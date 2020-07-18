import React from 'react';
import {
  useDisclosure,
  Flex,
  Heading,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Grid,
} from '@chakra-ui/core';

import { Link } from '../Link';
import { ButtonLinks } from './ButtonLinks';

export const NavbarLeft = () => {
  const { isOpen, onToggle, onClose } = useDisclosure(false);

  return (
    <>
      <Flex width="100%">
        <IconButton
          aria-label="open-menu"
          icon={isOpen ? 'arrow-back' : 'arrow-forward'}
          display={{ sm: 'inherit', md: 'none' }}
          marginRight={{ xs: 1, sm: 3 }}
          onClick={onToggle}
        />
        <Link to="/">
          <Heading size="xl">edg.sh</Heading>
        </Link>
        <ButtonLinks />
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <Grid width="100%">
              <ButtonLinks mobile />
            </Grid>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
