import { createContext } from 'react';
import { User } from '../graphql';

type Me = Pick<User, 'id' | 'name' | 'email' | 'stripeId'>;
interface IAppContext {
  accessToken: string;
  setAccessToken: (accessToken: string) => void;
  me?: Me | null;
  setMe: (user?: Me | null) => void;
}

export const AppContext = createContext<IAppContext>({
  accessToken: '',
  setAccessToken: () => {},
  setMe: () => {},
});
