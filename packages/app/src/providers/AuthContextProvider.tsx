import React, { FC, useState, useEffect, useContext } from 'react';
import { UseMutationState } from 'urql';

import { AuthContext } from '../context/AuthContext';
import { AppContext } from '../context/AppContext';
import { fetchRefreshToken } from '../utils/fetchRefreshToken';
import {
  LoginMutation,
  RegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  LoginMutationVariables,
  RegisterMutationVariables,
} from '../graphql';

export const AuthContextProvider: FC = ({ children }) => {
  const { accessToken, setAccessToken, setMe } = useContext(AppContext);
  const [urqlLoginPayload, getLoginPayload] = useLoginMutation();
  const [loginPayload, setLoginPayload] = useState<
    UseMutationState<LoginMutation>
  >({ fetching: false, stale: false });
  const [urqlRegisterPayload, getRegisterPayload] = useRegisterMutation();
  const [registerPayload, setRegisterPayload] = useState<
    UseMutationState<RegisterMutation>
  >({ fetching: false, stale: false });
  const [, getLogoutPayload] = useLogoutMutation();
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const getRefreshToken = async () => {
      try {
        const { token, user } = await fetchRefreshToken();

        setAccessToken(token !== '' ? token : '');
        setMe(user);
        setIsLoading(false);
      } catch (_) {
        setIsLoading(false);
      }
    };

    getRefreshToken();
  }, [setAccessToken, setMe]);

  useEffect(() => {
    if (urqlLoginPayload.data && !urqlLoginPayload.fetching) {
      const { token } = urqlLoginPayload.data.login;

      setAccessToken(token);
    }

    setLoginPayload(urqlLoginPayload);
  }, [urqlLoginPayload, setAccessToken]);

  useEffect(() => {
    if (urqlRegisterPayload.data && !urqlRegisterPayload.fetching) {
      const { token } = urqlRegisterPayload.data.register;

      setAccessToken(token);
    }

    setRegisterPayload(urqlRegisterPayload);
  }, [urqlRegisterPayload, setAccessToken]);

  const handleLogin = (values: LoginMutationVariables) => {
    getLoginPayload(values, { requestPolicy: 'network-only' });
  };

  const handleRegister = (values: RegisterMutationVariables) => {
    getRegisterPayload(values, { requestPolicy: 'network-only' });
  };

  const handleLogout = () => {
    getLogoutPayload(undefined, { requestPolicy: 'network-only' });
    setAccessToken('');
  };

  return (
    <AuthContext.Provider
      value={{
        handleLogin,
        loginPayload,
        handleRegister,
        registerPayload,
        handleLogout,
        isLoading,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
