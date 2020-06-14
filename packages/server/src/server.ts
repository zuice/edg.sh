import { config } from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';

import { schema } from './schema';
import { createContext } from './context';
import { permissions } from './permissions';

config();

const port = Number(process.env.PORT) || 3001;

new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
}).start(
  { port, playground: process.env.NODE_ENV === 'production' ? false : '/' },
  () => console.log(`🚀 Server listening on :${port}`),
);
