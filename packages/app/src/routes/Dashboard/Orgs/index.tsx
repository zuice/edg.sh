import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import { DashboardHeader } from '../../../components/DashboardHeader';
import { Orgs as OrgsPage } from './Orgs';
import { Create } from './Create';
import { ButtonLink } from '../../../components/ButtonLink';
import { Error404 } from '../../Error404';

export const Orgs = () => {
  const match = useRouteMatch();

  return (
    <>
      <DashboardHeader title="Organizations">
        <ButtonLink to="/orgs/create" leftIcon="add">
          Create
        </ButtonLink>
      </DashboardHeader>
      <Switch>
        <Route exact path={`${match.path}/`} component={OrgsPage} />
        <Route exact path={`${match.path}/create`} component={Create} />
        <Route path="*" component={Error404} />
      </Switch>
    </>
  );
};
