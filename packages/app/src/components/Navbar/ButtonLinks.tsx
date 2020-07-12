import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';

import { ButtonLink } from '../ButtonLink';

interface ButtonLinksProps {
  mobile?: boolean;
}

export const ButtonLinks: FC<ButtonLinksProps> = ({ mobile }) => {
  const history = useHistory();

  return (
    <>
      <ButtonLink
        to="/links"
        display={
          !mobile ? { xs: 'none', sm: 'none', md: 'inherit' } : undefined
        }
        marginBottom={mobile ? 3 : undefined}
        marginLeft={!mobile ? 3 : undefined}
        leftIcon="link"
        variant={
          history.location.pathname.indexOf('links') >= 0 ? 'solid' : 'ghost'
        }
        variantColor={
          history.location.pathname.indexOf('links') >= 0 ? 'green' : undefined
        }
      >
        My Links
      </ButtonLink>
      <ButtonLink
        to="/orgs"
        display={
          !mobile ? { xs: 'none', sm: 'none', md: 'inherit' } : undefined
        }
        marginBottom={mobile ? 3 : undefined}
        marginLeft={!mobile ? 3 : undefined}
        leftIcon="chat"
        variant={
          history.location.pathname.indexOf('orgs') >= 0 ? 'solid' : 'ghost'
        }
        variantColor={
          history.location.pathname.indexOf('orgs') >= 0 ? 'green' : undefined
        }
      >
        My Orgs
      </ButtonLink>
      <ButtonLink
        to="/upgrade"
        width={mobile ? '100%' : undefined}
        display={
          !mobile ? { xs: 'none', sm: 'none', md: 'inherit' } : undefined
        }
        marginBottom={mobile ? 3 : undefined}
        marginLeft={!mobile ? 3 : undefined}
        leftIcon="star"
        variant={
          history.location.pathname.indexOf('upgrade') >= 0 ? 'solid' : 'ghost'
        }
        variantColor={
          history.location.pathname.indexOf('upgrade') >= 0
            ? 'green'
            : undefined
        }
      >
        Upgrade
      </ButtonLink>
    </>
  );
};
