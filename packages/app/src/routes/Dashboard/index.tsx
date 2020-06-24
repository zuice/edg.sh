import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Container } from '../../components/Container';
import { Links } from './Links';
import { Error404 } from '../Error404';

export const Dashboard = () => (
  <>
    <Navbar />
    <Container>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <span>Welcome to your dashboard.</span>}
        />
        <Route path="/links" component={Links} />
        <Route path="*" component={Error404} />
      </Switch>
    </Container>
  </>
);
