import { makeSchema } from '@nexus/schema';
import { nexusPrismaPlugin } from 'nexus-prisma';

import { AuthPayload } from './AuthPayload';
import { User } from './User';
import { Link } from './Link';
import { Query } from './Query';
import { Mutation } from './Mutation';

export const schema = makeSchema({
  types: [AuthPayload, User, Link, Query, Mutation],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: `${__dirname}/../../schema.graphql`,
    typegen: `${__dirname}/../generated/nexus.ts`,
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'client',
      },
      {
        source: require.resolve('../context'),
        alias: 'Context',
      },
    ],
  },
});
