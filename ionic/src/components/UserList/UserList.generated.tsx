import * as Types from "../../graphql/types";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useGetUsersQuery(
  options: Omit<Urql.UseQueryArgs<GetUsersQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetUsersQuery>({ query: GetUsersDocument, ...options });
}
