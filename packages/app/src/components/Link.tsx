import React, { FC, forwardRef, Ref } from 'react';
import {
  LinkProps as ChakraLinkProps,
  Link as ChakraLink,
} from '@chakra-ui/core';
import { NavLinkProps, Link as RouterLink } from 'react-router-dom';

type LinkProps = ChakraLinkProps & NavLinkProps;

export const Link: FC<LinkProps> = forwardRef(
  (props: LinkProps, ref: Ref<any>) => (
    <ChakraLink
      ref={ref}
      as={RouterLink as any}
      color="orange.500"
      {...props}
    />
  ),
);
