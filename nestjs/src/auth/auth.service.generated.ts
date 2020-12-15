import * as Types from '../graphql/types';

import { GraphQLClient } from 'graphql-request';
import { print } from 'graphql';
import gql from 'graphql-tag';
export type CreateUserMutationVariables = Types.Exact<{
  external_user_id: Types.Scalars['uuid'];
  email: Types.Scalars['String'];
  username: Types.Scalars['String'];
}>;

export type CreateUserMutation = { __typename?: 'mutation_root' } & {
  insert_users_one: Types.Maybe<
    { __typename?: 'users' } & Pick<Types.Users, 'id'>
  >;
};

export const CreateUserDocument = gql`
  mutation CreateUser(
    $external_user_id: uuid!
    $email: String!
    $username: String!
  ) {
    insert_users_one(
      object: {
        external_user_id: $external_user_id
        email: $email
        username: $username
      }
    ) {
      id
    }
  }
`;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (sdkFunction) => sdkFunction();
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    CreateUser(
      variables: CreateUserMutationVariables,
    ): Promise<CreateUserMutation> {
      return withWrapper(() =>
        client.request<CreateUserMutation>(
          print(CreateUserDocument),
          variables,
        ),
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
