/**
 * This file was automatically generated by GraphQL Nexus
 * Do not make changes to this file directly
 */

import * as Context from "../context"



declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  AuthPayload: { // root type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Link: { // root type
    createdAt: any; // DateTime!
    id: string; // String!
    organizationId?: string | null; // String
    slug: string; // String!
    url: string; // String!
    userId: string; // String!
  }
  Mutation: {};
  Organization: { // root type
    createdAt: any; // DateTime!
    domain: string; // String!
    id: string; // String!
    name: string; // String!
    ownerId: string; // String!
  }
  Query: {};
  User: { // root type
    createdAt: any; // DateTime!
    email: string; // String!
    id: string; // String!
    name: string; // String!
    password: string; // String!
    stripeId?: string | null; // String
    tokenVersion: number; // Int!
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
}

export interface NexusGenFieldTypes {
  AuthPayload: { // field return type
    token: string; // String!
    user: NexusGenRootTypes['User']; // User!
  }
  Link: { // field return type
    createdAt: any; // DateTime!
    id: string; // String!
    organization: NexusGenRootTypes['Organization'] | null; // Organization
    organizationId: string | null; // String
    slug: string; // String!
    url: string; // String!
    user: NexusGenRootTypes['User']; // User!
    userId: string; // String!
  }
  Mutation: { // field return type
    createLink: NexusGenRootTypes['Link']; // Link!
    createOrganization: NexusGenRootTypes['Organization']; // Organization!
    destroyLink: NexusGenRootTypes['Link']; // Link!
    destroyOrganization: NexusGenRootTypes['Organization']; // Organization!
    login: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    logout: boolean; // Boolean!
    refresh: NexusGenRootTypes['AuthPayload']; // AuthPayload!
    register: NexusGenRootTypes['AuthPayload']; // AuthPayload!
  }
  Organization: { // field return type
    createdAt: any; // DateTime!
    domain: string; // String!
    id: string; // String!
    links: NexusGenRootTypes['Link'][]; // [Link!]!
    members: NexusGenRootTypes['User'][]; // [User!]!
    name: string; // String!
    owner: NexusGenRootTypes['User']; // User!
    ownerId: string; // String!
  }
  Query: { // field return type
    links: NexusGenRootTypes['Link'][]; // [Link!]!
    me: NexusGenRootTypes['User'] | null; // User
    organizations: NexusGenRootTypes['Organization'][]; // [Organization!]!
  }
  User: { // field return type
    createdAt: any; // DateTime!
    email: string; // String!
    id: string; // String!
    links: NexusGenRootTypes['Link'][]; // [Link!]!
    name: string; // String!
    password: string; // String!
    stripeId: string | null; // String
    tokenVersion: number; // Int!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createLink: { // args
      org?: string | null; // String
      slug?: string | null; // String
      url: string; // String!
    }
    createOrganization: { // args
      domain: string; // String!
      name: string; // String!
    }
    destroyLink: { // args
      id: string; // String!
    }
    destroyOrganization: { // args
      id: string; // String!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    register: { // args
      email: string; // String!
      name: string; // String!
      password: string; // String!
    }
  }
  Organization: {
    links: { // args
      skip?: number | null; // Int
    }
    members: { // args
      skip?: number | null; // Int
    }
  }
  User: {
    links: { // args
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "AuthPayload" | "Link" | "Mutation" | "Organization" | "Query" | "User";

export type NexusGenInputNames = never;

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: Context.Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}