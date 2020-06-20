import React, { useContext } from 'react';
import { createClient, Provider } from 'urql';

import { AppContext } from '../context/AppContext';
import { AuthContextProvider } from '../providers/AuthContextProvider';
import { Router } from './Router';

export const App = () => {
  const { accessToken } = useContext(AppContext);
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
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </Provider>
  );
};
