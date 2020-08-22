import * as Types from "../../graphql/types";

import { gql } from "apollo-boost";
import * as ApolloReactCommon from "apollo-boost";
import * as ApolloReactHooks from "@apollo/react-hooks";
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

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      loginId: // value for 'loginId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginUserMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginUserMutation,
    LoginUserMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    LoginUserMutation,
    LoginUserMutationVariables
  >(LoginUserDocument, baseOptions);
}
export type LoginUserMutationHookResult = ReturnType<
  typeof useLoginUserMutation
>;
