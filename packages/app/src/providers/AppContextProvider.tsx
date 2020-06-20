import React, { FC, useState } from 'react';

import { AppContext } from '../context/AppContext';

export const AppContextProvider: FC = ({ children }) => {
  const [accessToken, setAccessToken] = useState('');

  return (
    <AppContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AppContext.Provider>
  );
};
