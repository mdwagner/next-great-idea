/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: signUpUser
// ====================================================

export interface signUpUser_signUp {
  __typename: "FusionAuthSignUpResponse";
  success: boolean;
}

export interface signUpUser {
  /**
   * perform the action: "signUp"
   */
  signUp: signUpUser_signUp;
}

export interface signUpUserVariables {
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  password: string;
}
