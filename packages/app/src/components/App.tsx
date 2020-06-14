import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Landing } from '../routes/Landing';
import { Auth } from '../routes/Auth';
import { Error404 } from '../routes/Error404';
import { Container } from './Container';

export const App = () => (
  <Container>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/auth" component={Auth} />
        <Route path="*" component={Error404} />
      </Switch>
    </BrowserRouter>
  </Container>
);
