import * as Types from "../../graphql/types";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetIdeasQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetIdeasQuery = { __typename?: "query_root" } & {
  ideas: Array<
    { __typename?: "ideas" } & Pick<
      Types.Ideas,
      "id" | "title" | "description"
    > & { user: { __typename?: "users" } & Pick<Types.Users, "username"> }
  >;
};

export const GetIdeasDocument = gql`
  query getIdeas {
    ideas {
      id
      title
      description
      user {
        username
      }
    }
  }
`;

export function useGetIdeasQuery(
  options: Omit<Urql.UseQueryArgs<GetIdeasQueryVariables>, "query"> = {}
) {
  return Urql.useQuery<GetIdeasQuery>({ query: GetIdeasDocument, ...options });
}
