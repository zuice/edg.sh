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
        variant={
          history.location.pathname.indexOf('links') >= 0 ? 'solid' : 'ghost'
        }
        variantColor={
          history.location.pathname.indexOf('links') >= 0 ? 'green' : undefined
        }
        marginLeft="10px"
      >
        My Links
      </ButtonLink>
      <ButtonLink
        to="/upgrade"
        leftIcon="star"
        variant={
          history.location.pathname.indexOf('upgrade') >= 0 ? 'solid' : 'ghost'
        }
        variantColor={
          history.location.pathname.indexOf('upgrade') >= 0
            ? 'green'
            : undefined
        }
        marginLeft="10px"
      >
        Upgrade
      </ButtonLink>
    </Flex>
  );
};
