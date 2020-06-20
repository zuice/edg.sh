import React, { useContext } from 'react';
import { createClient, Provider } from 'urql';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Skeleton } from '@chakra-ui/core';

import { AuthContext } from '../context/AuthContext';
import { Container } from './Container';
import { Landing } from '../routes/Landing';
import { Auth } from '../routes/Auth';
import { Dashboard } from '../routes/Dashboard';
import { Error404 } from '../routes/Error404';

export const App = () => {
  const { accessToken, isLoading, isLoggedIn } = useContext(AuthContext);
  const client = createClient({
    url:
      process.env.NODE_ENV === 'production'
        ? 'https://api.edg.sh/'
        : process.env.REACT_APP_GRAPHQL_URL!,
    fetchOptions: {
      credentials: 'include',
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
      },
    },
  });

  return (
    <Provider value={client}>
      <Container>
        <BrowserRouter>
          {isLoading ? (
            <div>
              <Skeleton height="20px" my="10px" />
              <Skeleton height="20px" my="10px" />
              <Skeleton height="20px" my="10px" />
            </div>
          ) : (
            <>
              {!isLoggedIn ? (
                <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/auth" component={Auth} />
                  <Route path="*" component={Error404} />
                </Switch>
              ) : (
                <Switch>
                  <Route exact path="/" component={Dashboard} />
                  <Route path="*" component={Error404} />
                </Switch>
              )}
            </>
          )}
        </BrowserRouter>
      </Container>
    </Provider>
  );
};
