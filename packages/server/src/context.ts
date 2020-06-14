import { PrismaClient } from '@prisma/client';
import { Stripe } from 'stripe';
import { Request } from 'express';
import { ContextParameters } from 'graphql-yoga/dist/types';
import { RedisClient } from 'redis';

import { redis } from './lib/redis';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_PUBLISHABLE_KEY!, {
  apiVersion: '2020-03-02',
});

export interface Context {
  prisma: PrismaClient;
  stripe: Stripe;
  request: Request;
  redis: RedisClient;
}

export const createContext = (request: ContextParameters): Context => ({
  ...request,
  prisma,
  stripe,
  redis,
});
