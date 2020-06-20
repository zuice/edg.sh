import { createContext } from 'react';

interface IAuthContext {
  isLoading: boolean;
  isLoggedIn: boolean;
  accessToken?: string;
  setAccessToken: (accessToken?: string) => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLoading: true,
  isLoggedIn: false,
  accessToken: undefined,
  setAccessToken: (_?: string) => {},
});
