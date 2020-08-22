import * as Types from "../../graphql/types";

import { gql } from "apollo-boost";
import * as ApolloReactCommon from "apollo-boost";
import * as ApolloReactHooks from "@apollo/react-hooks";
export type GetUsersQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetUsersQuery = { __typename?: "query_root" } & {
  users: Array<
    { __typename?: "users" } & Pick<Types.Users, "id" | "email" | "username">
  >;
};

export const GetUsersDocument = gql`
  query getUsers {
    users {
      id
      email
      username
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >
) {
  return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    baseOptions
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
