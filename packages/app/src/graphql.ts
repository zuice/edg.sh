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
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};


export type Link = {
  __typename?: 'Link';
  createdAt: Scalars['DateTime'];
  id: Scalars['String'];
  organization?: Maybe<Organization>;
  organizationId?: Maybe<Scalars['String']>;
  slug: Scalars['String'];
  url: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createLink: Link;
  createOrganization: Organization;
  destroyLink: Link;
  destroyOrganization: Organization;
  login: AuthPayload;
  logout: Scalars['Boolean'];
  refresh: AuthPayload;
  register: AuthPayload;
};


export type MutationCreateLinkArgs = {
  org?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
  url: Scalars['String'];
};


export type MutationCreateOrganizationArgs = {
  domain: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDestroyLinkArgs = {
  id: Scalars['String'];
};


export type MutationDestroyOrganizationArgs = {
  id: Scalars['String'];
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

export type Organization = {
  __typename?: 'Organization';
  createdAt: Scalars['DateTime'];
  domain: Scalars['String'];
  id: Scalars['String'];
  links: Array<Link>;
  members: Array<User>;
  name: Scalars['String'];
  owner: User;
  ownerId: Scalars['String'];
};


export type OrganizationLinksArgs = {
  skip?: Maybe<Scalars['Int']>;
};


export type OrganizationMembersArgs = {
  skip?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  links: Array<Link>;
  me?: Maybe<User>;
  organizations: Array<Organization>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime'];
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
    & Pick<Link, 'id' | 'slug' | 'url' | 'createdAt'>
    & { organization?: Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name' | 'domain'>
    )>, user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ) }
  )> }
);

export type OrganizationsQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganizationsQuery = (
  { __typename?: 'Query' }
  & { organizations: Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name' | 'domain' | 'createdAt'>
    & { owner: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    ), members: Array<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'email'>
    )>, links: Array<(
      { __typename?: 'Link' }
      & Pick<Link, 'id' | 'slug' | 'url'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'name' | 'email'>
      ) }
    )> }
  )> }
);

export type OrganizationsDropdownQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganizationsDropdownQuery = (
  { __typename?: 'Query' }
  & { organizations: Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name'>
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
  org?: Maybe<Scalars['String']>;
  slug?: Maybe<Scalars['String']>;
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

export type CreateOrganizationMutationVariables = Exact<{
  name: Scalars['String'];
  domain: Scalars['String'];
}>;


export type CreateOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { createOrganization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name' | 'domain'>
  ) }
);

export type DestroyLinkMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyLinkMutation = (
  { __typename?: 'Mutation' }
  & { destroyLink: (
    { __typename?: 'Link' }
    & Pick<Link, 'id'>
  ) }
);

export type DestroyOrganizationMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DestroyOrganizationMutation = (
  { __typename?: 'Mutation' }
  & { destroyOrganization: (
    { __typename?: 'Organization' }
    & Pick<Organization, 'id'>
  ) }
);


export const LinksDocument = gql`
    query Links {
  links {
    id
    slug
    url
    organization {
      id
      name
      domain
    }
    createdAt
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
export const OrganizationsDocument = gql`
    query Organizations {
  organizations {
    id
    name
    domain
    createdAt
    owner {
      id
      name
      email
    }
    members {
      id
      name
      email
    }
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
}
    `;

export function useOrganizationsQuery(options: Omit<Urql.UseQueryArgs<OrganizationsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OrganizationsQuery>({ query: OrganizationsDocument, ...options });
};
export const OrganizationsDropdownDocument = gql`
    query OrganizationsDropdown {
  organizations {
    id
    name
  }
}
    `;

export function useOrganizationsDropdownQuery(options: Omit<Urql.UseQueryArgs<OrganizationsDropdownQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<OrganizationsDropdownQuery>({ query: OrganizationsDropdownDocument, ...options });
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
    mutation CreateLink($url: String!, $org: String, $slug: String) {
  createLink(url: $url, org: $org, slug: $slug) {
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
export const CreateOrganizationDocument = gql`
    mutation CreateOrganization($name: String!, $domain: String!) {
  createOrganization(name: $name, domain: $domain) {
    id
    name
    domain
  }
}
    `;

export function useCreateOrganizationMutation() {
  return Urql.useMutation<CreateOrganizationMutation, CreateOrganizationMutationVariables>(CreateOrganizationDocument);
};
export const DestroyLinkDocument = gql`
    mutation DestroyLink($id: String!) {
  destroyLink(id: $id) {
    id
  }
}
    `;

export function useDestroyLinkMutation() {
  return Urql.useMutation<DestroyLinkMutation, DestroyLinkMutationVariables>(DestroyLinkDocument);
};
export const DestroyOrganizationDocument = gql`
    mutation DestroyOrganization($id: String!) {
  destroyOrganization(id: $id) {
    id
  }
}
    `;

export function useDestroyOrganizationMutation() {
  return Urql.useMutation<DestroyOrganizationMutation, DestroyOrganizationMutationVariables>(DestroyOrganizationDocument);
};