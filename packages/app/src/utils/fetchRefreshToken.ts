import axios from 'axios';
import { User } from '../graphql';

export const fetchRefreshToken = async () => {
  const response = await axios.post<{
    token: string;
    user: Pick<User, 'id' | 'name' | 'email' | 'stripeId'>;
  }>(
    '/refresh',
    {},
    {
      baseURL:
        process.env.NODE_ENV === 'production'
          ? 'https://api.edg.sh/'
          : 'http://localhost:3001/',
      withCredentials: true,
    },
  );
  const data = response.data;

  return data;
};
