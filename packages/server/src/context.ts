import { PrismaClient } from '@prisma/client';
import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { RedisClient } from 'redis';

import { prisma } from './lib/prisma';
import { stripe } from './lib/stripe';
import { redis } from './lib/redis';
import { Dokku } from './lib/Dokku';

export interface Context {
  prisma: PrismaClient;
  stripe: Stripe;
  request: Request;
  response: Response;
  redis: RedisClient;
  dokku: Dokku;
}

export const createContext = (ctx: ContextParameters): Context => ({
  ...ctx,
  prisma,
  stripe,
  redis,
  dokku: new Dokku(),
});
