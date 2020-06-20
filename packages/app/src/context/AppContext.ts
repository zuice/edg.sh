import { createContext } from 'react';

interface IAppContext {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
}

export const AppContext = createContext<IAppContext>({
  accessToken: '',
  setAccessToken: () => {},
});
