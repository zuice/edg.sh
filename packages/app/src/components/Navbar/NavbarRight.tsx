import React, { useContext } from 'react';
import {
  Flex,
  Button,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/core';

import { AuthContext } from '../../context/AuthContext';

export const NavbarRight = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleLogout } = useContext(AuthContext);

  return (
    <Flex width="20%" justifyContent="flex-end">
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
              marginLeft="10px"
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
