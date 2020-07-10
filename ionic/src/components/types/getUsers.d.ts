/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUsers
// ====================================================

export interface getUsers_users {
  __typename: "users";
  id: any;
  email: string;
  firstname: string;
  lastname: string;
}

export interface getUsers {
  /**
   * fetch data from the table: "users"
   */
  users: getUsers_users[];
}
