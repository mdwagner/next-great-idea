import * as Types from "../../graphql/types";

import { gql } from "apollo-boost";
import * as ApolloReactCommon from "apollo-boost";
import * as ApolloReactHooks from "@apollo/react-hooks";
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

/**
 * __useSignUpUserMutation__
 *
 * To run a mutation, you first call `useSignUpUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpUserMutation, { data, loading, error }] = useSignUpUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignUpUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignUpUserMutation,
    SignUpUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    SignUpUserMutation,
    SignUpUserMutationVariables
  >(SignUpUserDocument, baseOptions);
}
export type SignUpUserMutationHookResult = ReturnType<
  typeof useSignUpUserMutation
>;
