import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

import { Container } from '../../components/Container';
import { Login } from './Login';
import { Register } from './Register';
import { Error404 } from '../Error404';

export const Auth = () => {
  const match = useRouteMatch();

  return (
    <Container>
      <Switch>
        <Route exact path={`${match.path}/login`} component={Login} />
        <Route exact path={`${match.path}/register`} component={Register} />
        <Route path="*" component={Error404} />
      </Switch>
    </Container>
  );
};
