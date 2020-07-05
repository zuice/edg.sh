import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { DashboardHeader } from '../../../components/DashboardHeader';
import { Links as LinksPage } from './Links';
import { Create } from './Create';
import { ButtonLink } from '../../../components/ButtonLink';
import { Error404 } from '../../Error404';

export const Links = () => {
  const match = useRouteMatch();

  return (
    <>
      <Helmet>
        <title>My Links - Edg.sh</title>
      </Helmet>
      <DashboardHeader title="Links">
        <ButtonLink to="/links/create" leftIcon="add">
          Create
        </ButtonLink>
      </DashboardHeader>
      <Switch>
        <Route exact path={`${match.path}/`} component={LinksPage} />
        <Route exact path={`${match.path}/create`} component={Create} />
        <Route path="*" component={Error404} />
      </Switch>
    </>
  );
};
