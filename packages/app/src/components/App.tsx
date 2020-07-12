import React, { useContext } from 'react';
import { createClient, Provider } from 'urql';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import { AppContext } from '../context/AppContext';
import { AuthContextProvider } from '../providers/AuthContextProvider';
import { Router } from './Router';

const stripe = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

export const App = () => {
  const { accessToken } = useContext(AppContext);
  const client = createClient({
    // exchanges: [],
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
        <Elements stripe={stripe}>
          <Router />
        </Elements>
      </AuthContextProvider>
    </Provider>
  );
};
