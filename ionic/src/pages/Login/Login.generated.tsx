import * as Types from "../../graphql/types";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type LoginUserMutationVariables = Types.Exact<{
  loginId: Types.Scalars["String"];
  password: Types.Scalars["String"];
}>;

export type LoginUserMutation = { __typename?: "mutation_root" } & {
  login: { __typename?: "FusionAuthLoginResponse" } & Pick<
    Types.FusionAuthLoginResponse,
    "id" | "email" | "token" | "username"
  >;
};

export const LoginUserDocument = gql`
  mutation loginUser($loginId: String!, $password: String!) {
    login(loginId: $loginId, password: $password) {
      id
      email
      token
      username
    }
  }
`;

export function useLoginUserMutation() {
  return Urql.useMutation<LoginUserMutation, LoginUserMutationVariables>(
    LoginUserDocument
  );
}
