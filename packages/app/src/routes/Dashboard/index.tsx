import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import { Navbar } from '../../components/Navbar';
import { Container } from '../../components/Container';
import { Links } from './Links';
import { Orgs } from './Orgs';
import { Error404 } from '../Error404';

export const Dashboard = () => (
  <>
    <Helmet>
      <title>Dashboard - Edg.sh</title>
    </Helmet>
    <Navbar />
    <Container>
      <Switch>
        <Route
          exact
          path="/"
          component={() => <span>Welcome to your dashboard.</span>}
        />
        <Route path="/links" component={Links} />
        <Route path="/orgs" component={Orgs} />
        <Route path="*" component={Error404} />
      </Switch>
    </Container>
  </>
);
