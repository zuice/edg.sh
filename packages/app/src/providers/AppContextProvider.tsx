import React, { FC, useState } from 'react';

import { AppContext } from '../context/AppContext';
import { User } from '../graphql';

type Me = Pick<User, 'id' | 'name' | 'email' | 'stripeId'>;

export const AppContextProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');
  const [me, setMe] = useState<Me | null>();

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken, me, setMe }}>
      {children}
    </AppContext.Provider>
  );
};
