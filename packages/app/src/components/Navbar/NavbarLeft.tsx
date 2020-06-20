import React from 'react';
import { Flex, Heading } from '@chakra-ui/core';
import { useHistory } from 'react-router-dom';

import { Link } from '../Link';
import { ButtonLink } from '../ButtonLink';

export const NavbarLeft = () => {
  const history = useHistory();

  return (
    <Flex width="100%">
      <Link to="/">
        <Heading size="xl">edg.sh</Heading>
      </Link>
      <ButtonLink
        to="/links"
        leftIcon="link"
        variant={history.location.pathname === '/links' ? 'solid' : 'ghost'}
        variantColor={
          history.location.pathname === '/links' ? 'green' : undefined
        }
        marginLeft="10px"
      >
        My Links
      </ButtonLink>
      <ButtonLink
        to="/upgrade"
        leftIcon="star"
        variant={history.location.pathname === '/upgrade' ? 'solid' : 'ghost'}
        variantColor={
          history.location.pathname === '/upgrade' ? 'green' : undefined
        }
      >
        Upgrade
      </ButtonLink>
    </Flex>
  );
};
