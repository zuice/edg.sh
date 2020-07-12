import React, { useContext } from 'react';
import {
  useDisclosure,
  useColorMode,
  Flex,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Icon,
} from '@chakra-ui/core';

import { AuthContext } from '../../context/AuthContext';

export const NavbarRight = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { handleLogout } = useContext(AuthContext);

  return (
    <Flex width={['50%', '50%', '50%', '20%']} justifyContent="flex-end">
      <Button onClick={toggleColorMode} marginRight={1}>
        <Icon name={colorMode === 'dark' ? 'sun' : 'moon'} />
      </Button>
      <Button leftIcon="external-link" variantColor="red" onClick={onOpen}>
        Logout
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="0.25rem">
          <ModalCloseButton />
          <ModalHeader>Logout</ModalHeader>
          <ModalBody>Are you sure you would like to logout?</ModalBody>
          <ModalFooter>
            <Button leftIcon="not-allowed" onClick={onClose}>
              No
            </Button>
            <Button
              variantColor="red"
              leftIcon="external-link"
              marginLeft={3}
              onClick={handleLogout}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  );
};
