import React, { FC, forwardRef, Ref } from 'react';
import { ButtonProps, Button } from '@chakra-ui/core';
import { NavLinkProps, Link as RouterLink } from 'react-router-dom';

type LinkProps = ButtonProps & NavLinkProps;

export const ButtonLink: FC<LinkProps> = forwardRef(
  (props: LinkProps, ref: Ref<any>) => (
    <Button ref={ref} as={RouterLink as any} {...props} />
  ),
);
