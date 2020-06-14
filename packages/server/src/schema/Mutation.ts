import { mutationType, stringArg } from '@nexus/schema';
import { compare, hash } from 'bcryptjs';
import { signToken } from '../utils/signToken';

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

        const token = signToken(user);

        return {
          token,
          user,
        };
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

        const token = signToken(user);

        return { token, user };
      },
    });
  },
});
