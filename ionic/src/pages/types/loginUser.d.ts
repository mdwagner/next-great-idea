/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: loginUser
// ====================================================

export interface loginUser_login {
  __typename: "FusionAuthLoginResponse";
  id: string;
  email: string;
  token: string;
  username: string;
}

export interface loginUser {
  /**
   * perform the action: "login"
   */
  login: loginUser_login;
}

export interface loginUserVariables {
  loginId: string;
  password: string;
}
