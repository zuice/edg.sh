import { mutationType, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import { sendRefreshToken } from '../utils/sendRefreshToken';
import { createRefreshToken, createAccessToken } from '../auth';
import { verify, decode } from 'jsonwebtoken';
import { IToken } from '../types/IToken';
import { getUserId } from '../utils/getUserId';
import { generateSlug } from '../utils/generateSlug';

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

    t.field('refresh', {
      type: 'AuthPayload',
      resolve: async (_parent, _args, ctx) => {
        const refreshToken = ctx.request.cookies.jid;
        const payload = verify(refreshToken, process.env.APP_SECRET!) as IToken;
        const user = await ctx.prisma.user.findOne({
          where: { id: payload.user.id },
        });

        if (!user) {
          throw new Error('User not found');
        }

        sendRefreshToken(ctx.response, createRefreshToken(user));

        const token = createAccessToken(user);

        return { token, user };
      },
    });

    t.field('createLink', {
      type: 'Link',
      args: {
        url: stringArg({ nullable: false }),
        org: stringArg({ nullable: true }),
      },
      resolve: async (_parent, { url, org }, ctx) => {
        const id = getUserId(ctx);
        const slug = generateSlug();

        const link = ctx.prisma.link.create({
          data: {
            url,
            slug,
            user: { connect: { id } },
            organization: {
              connect: { id: org && org !== '' ? org : undefined },
            },
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
        const organization = ctx.prisma.organization.create({
          data: {
            name,
            domain,
            owner: { connect: { id } },
            members: { connect: { id } },
          },
        });

        return organization;
      },
    });
  },
});
