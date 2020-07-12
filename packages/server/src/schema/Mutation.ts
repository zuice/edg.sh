import { mutationType, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import { sendRefreshToken } from '../utils/sendRefreshToken';
import { createRefreshToken, createAccessToken } from '../auth';
import { decode } from 'jsonwebtoken';
import { IToken } from '../types/IToken';
import { getUserId } from '../utils/getUserId';
import { generateSlug } from '../utils/generateSlug';
import { getDomainWithoutProtocol } from '../utils/getDomainWithoutProtocol';
import Stripe from 'stripe';

export const Mutation = mutationType({
  definition(t) {
    t.field('register', {
      type: 'AuthPayload',
      args: {
        name: stringArg({ nullable: false }),
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword,
          },
        });

        sendRefreshToken(ctx.response, createRefreshToken(user));

        const token = createAccessToken(user);

        return { token, user };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg({ nullable: false }),
        password: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: { email },
        });

        if (!user) {
          throw new Error(`No user with the email: ${email}.`);
        }

        const match = await compare(password, user.password);

        if (!match) {
          throw new Error(`Password does not match.`);
        }

        sendRefreshToken(ctx.response, createRefreshToken(user));

        const token = createAccessToken(user);

        return { token, user };
      },
    });

    t.field('logout', {
      type: 'Boolean',
      resolve: async (_parent, _args, ctx) => {
        const authorization = ctx.request.get('Authorization');

        if (authorization) {
          const rawToken = authorization.replace('Bearer ', '');
          const token = decode(rawToken) as IToken;

          sendRefreshToken(ctx.response, '');

          const user = await ctx.prisma.user.findOne({
            where: { id: token.user.id },
          });

          if (user) {
            await ctx.prisma.user.update({
              where: { id: token.user.id },
              data: {
                tokenVersion: user.tokenVersion + 1,
              },
            });
          }
          await ctx.redis.setAsync(token.jti, rawToken);
        }

        return true;
      },
    });

    t.field('createSubscription', {
      type: 'Boolean',
      args: {
        token: stringArg({ nullable: true }),
        priceId: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { token, priceId }, ctx) => {
        const id = getUserId(ctx);
        const customer = await ctx.stripe.customers.create();
        let source: Stripe.CustomerSource | null;

        if (token) {
          source = await ctx.stripe.customers.createSource(customer.id, {
            source: token,
          });

          if (source) {
            await ctx.stripe.customers.update(customer.id, {
              default_source: source.id,
            });
          } else {
            throw new Error(
              "Your payment method could not be set on Stripe's side.",
            );
          }
        }

        await ctx.stripe.subscriptions.create({
          customer: customer.id,
          items: [{ price: priceId }],
        });
        await ctx.prisma.user.update({
          where: { id },
          data: { stripeId: customer.id },
        });

        return true;
      },
    });

    t.field('createLink', {
      type: 'Link',
      args: {
        url: stringArg({ nullable: false }),
        org: stringArg({ nullable: true }),
        slug: stringArg({ nullable: true }),
      },
      resolve: async (_parent, { url, slug, org }, ctx) => {
        const id = getUserId(ctx);
        const newSlug = slug && slug !== '' ? slug : generateSlug();

        const link = await ctx.prisma.link.create({
          data: {
            url,
            slug: newSlug,
            user: { connect: { id } },
            organization:
              org && org !== ''
                ? {
                    connect: { id: org },
                  }
                : undefined,
          },
        });

        return link;
      },
    });

    t.field('createOrganization', {
      type: 'Organization',
      args: {
        name: stringArg({ nullable: false }),
        domain: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { name, domain }, ctx) => {
        const id = getUserId(ctx);
        const domainWithoutProtocol = getDomainWithoutProtocol(domain);
        const organization = await ctx.prisma.organization.create({
          data: {
            name,
            domain: domainWithoutProtocol,
            owner: { connect: { id } },
            members: { connect: { id } },
          },
        });

        return organization;
      },
    });

    t.field('destroyLink', {
      type: 'Link',
      args: {
        id: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { id }, ctx) => {
        const link = await ctx.prisma.link.findOne({ where: { id } });
        const userId = getUserId(ctx);

        if (!link) {
          throw new Error('Link does not exist.');
        }

        if (link.userId === userId) {
          const deleted = await ctx.prisma.link.delete({ where: { id } });

          return deleted;
        }

        throw new Error('You have no permission for this action.');
      },
    });

    t.field('destroyOrganization', {
      type: 'Organization',
      args: {
        id: stringArg({ nullable: false }),
      },
      resolve: async (_parent, { id }, ctx) => {
        const organization = await ctx.prisma.organization.findOne({
          where: { id },
        });
        const userId = getUserId(ctx);

        if (!organization) {
          throw new Error('Organization does not exist.');
        }

        if (organization.ownerId === userId) {
          const deleted = await ctx.prisma.organization.delete({
            where: { id },
          });

          return deleted;
        }

        throw new Error('You have no permission for this action.');
      },
    });
  },
});
