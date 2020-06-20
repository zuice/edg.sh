import React, { FC, useState, useEffect } from 'react';

import { AuthContext } from '../context/AuthContext';
import { fetchRefreshToken } from '../utils/fetchRefreshToken';

export const AuthContextProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState<string | undefined>();

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const getRefreshToken = async () => {
      const token = await fetchRefreshToken();

      setAccessToken(token !== '' ? token : undefined);
      setIsLoading(false);
    };

    getRefreshToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isLoggedIn,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
