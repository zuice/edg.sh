import { config } from 'dotenv';
import { GraphQLServer } from 'graphql-yoga';
import { Request, Response } from 'express';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import { verify } from 'jsonwebtoken';

import { schema } from './schema';
import { createContext } from './context';
import { permissions } from './permissions';
import { prisma } from './lib/prisma';
import { IToken } from './types/IToken';
import { sendRefreshToken } from './utils/sendRefreshToken';
import { createRefreshToken, createAccessToken } from './auth';

config();

const port = Number(process.env.PORT) || 3001;
const app = new GraphQLServer({
  schema,
  context: createContext,
  middlewares: [permissions],
});

app.express.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://app.edg.sh/'
        : process.env.REACT_APP_URL,
    credentials: true,
  }),
);
app.express.use(cookieParser());
app.express.post('/refresh', async (req: Request, res: Response) => {
  const token = req.cookies.jid;

  if (!token) {
    return res.json({ token: '' });
  }

  try {
    const payload = verify(token, process.env.APP_SECRET!) as IToken;
    const user = await prisma.user.findOne({ where: { id: payload.user.id } });

    if (!user) {
      return res.json({ token: '' });
    }

    if (user.tokenVersion !== payload.user.tokenVersion) {
      return res.json({ token: '' });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res.json({ token: createAccessToken(user) });
  } catch (_) {
    return res.json({ token: '' });
  }
});
app.start(
  {
    port,
    playground: process.env.NODE_ENV === 'production' ? false : '/',
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://app.edg.sh/'
          : process.env.REACT_APP_URL,
      credentials: true,
    },
  },
  () => console.log(`🚀 Server listening on :${port}`),
);
