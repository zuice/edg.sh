import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider, createClient } from 'urql';

import { Landing } from '../routes/Landing';
import { Auth } from '../routes/Auth';
import { Error404 } from '../routes/Error404';
import { Container } from './Container';

const client = createClient({
  url:
    process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_GRAPHQL_URL!
      : 'http://localhost:3001',
});

export const App = () => (
  <Provider value={client}>
    <Container>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/auth" component={Auth} />
          <Route path="*" component={Error404} />
        </Switch>
      </BrowserRouter>
    </Container>
  </Provider>
);
