import * as Types from "../../graphql/types";

import gql from "graphql-tag";
import * as Urql from "urql";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type SignUpUserMutationVariables = Types.Exact<{
  email: Types.Scalars["String"];
  username: Types.Scalars["String"];
  password: Types.Scalars["String"];
}>;

export type SignUpUserMutation = { __typename?: "mutation_root" } & {
  signUp: { __typename?: "FusionAuthSignUpResponse" } & Pick<
    Types.FusionAuthSignUpResponse,
    "success"
  >;
};

export const SignUpUserDocument = gql`
  mutation signUpUser($email: String!, $username: String!, $password: String!) {
    signUp(email: $email, username: $username, password: $password) {
      success
    }
  }
`;

export function useSignUpUserMutation() {
  return Urql.useMutation<SignUpUserMutation, SignUpUserMutationVariables>(
    SignUpUserDocument
  );
}
