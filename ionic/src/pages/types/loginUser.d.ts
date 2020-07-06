/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { FusionAuthLoginInput } from "./../../graphql-global-types";

// ====================================================
// GraphQL mutation operation: loginUser
// ====================================================

export interface loginUser_login {
  __typename: "FusionAuthLoginResponse";
  token: string | null;
  user: any | null;
}

export interface loginUser {
  /**
   * perform the action: "login"
   */
  login: loginUser_login | null;
}

export interface loginUserVariables {
  body: FusionAuthLoginInput;
}
