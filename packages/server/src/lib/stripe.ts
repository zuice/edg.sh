import Stripe from 'stripe';
import { config } from 'dotenv';

config();

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2020-03-02',
});
