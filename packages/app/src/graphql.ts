import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export type Link = {
  __typename?: 'Link';
  id: Scalars['String'];
  slug: Scalars['String'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink: Link;
  login: AuthPayload;
  logout: Scalars['Boolean'];
  refresh: AuthPayload;
  register: AuthPayload;
};


export type MutationCreateLinkArgs = {
  url: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  links: Array<Link>;
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['String'];
  links: Array<Link>;
  name: Scalars['String'];
  password: Scalars['String'];
  stripeId?: Maybe<Scalars['String']>;
  tokenVersion: Scalars['Int'];
};


export type UserLinksArgs = {
  skip?: Maybe<Scalars['Int']>;
};

export type LinksQueryVariables = Exact<{ [key: string]: never; }>;


export type LinksQuery = (
  { __typename?: 'Query' }
  & { links: Array<(
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'slug' | 'url'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type RefreshMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshMutation = (
  { __typename?: 'Mutation' }
  & { refresh: (
    { __typename?: 'AuthPayload' }
    & Pick<AuthPayload, 'token'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type CreateLinkMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type CreateLinkMutation = (
  { __typename?: 'Mutation' }
  & { createLink: (
    { __typename?: 'Link' }
    & Pick<Link, 'id' | 'slug' | 'url'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id'>
    ) }
  ) }
);


export const LinksDocument = gql`
    query Links {
  links {
    id
    slug
    url
    user {
      id
      name
      email
    }
  }
}
    `;

export function useLinksQuery(options: Omit<Urql.UseQueryArgs<LinksQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<LinksQuery>({ query: LinksDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const RegisterDocument = gql`
    mutation Register($name: String!, $email: String!, $password: String!) {
  register(name: $name, email: $email, password: $password) {
    token
    user {
      id
    }
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RefreshDocument = gql`
    mutation Refresh {
  refresh {
    token
    user {
      id
    }
  }
}
    `;

export function useRefreshMutation() {
  return Urql.useMutation<RefreshMutation, RefreshMutationVariables>(RefreshDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CreateLinkDocument = gql`
    mutation CreateLink($url: String!) {
  createLink(url: $url) {
    id
    slug
    url
    user {
      id
    }
  }
}
    `;

export function useCreateLinkMutation() {
  return Urql.useMutation<CreateLinkMutation, CreateLinkMutationVariables>(CreateLinkDocument);
};