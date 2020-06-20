import axios from 'axios';

export const fetchRefreshToken = async () => {
  const response = await axios.post<{ token: string }>(
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
  const { token } = response.data;

  return token;
};
