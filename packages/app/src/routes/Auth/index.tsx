import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Link } from '../../components/Link';
import { Login } from './Login';
import { Register } from './Register';
import { Error404 } from '../Error404';
import { Icon } from '@chakra-ui/core';

export const Auth = () => {
  const match = useRouteMatch();

  return (
    <>
      <Link to="/">
        <Icon name="arrow-back" /> Back
      </Link>
      <Switch>
        <Route exact path={`${match.path}/login`} component={Login} />
        <Route exact path={`${match.path}/register`} component={Register} />
        <Route path="*" component={Error404} />
      </Switch>
    </>
  );
};
