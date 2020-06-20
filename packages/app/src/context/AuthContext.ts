import { createContext } from 'react';
import { UseMutationState } from 'urql';

import { LoginMutation, RegisterMutation } from '../graphql';

interface IAuthContext {
  handleLogin: (values: { email: string; password: string }) => void;
  loginPayload: UseMutationState<LoginMutation>;
  handleRegister: (values: {
    name: string;
    email: string;
    password: string;
  }) => void;
  registerPayload: UseMutationState<RegisterMutation>;
  handleLogout: () => void;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  handleLogin: () => {},
  loginPayload: { fetching: false, stale: true },
  handleRegister: () => {},
  registerPayload: { fetching: false, stale: true },
  handleLogout: () => {},
  isLoading: true,
  isLoggedIn: false,
});
