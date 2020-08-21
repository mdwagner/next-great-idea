import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { getUsers } from "./types/getUsers";

const GET_USERS = gql`
  query getUsers {
    users {
      id
      email
      username
    }
  }
`;

export const UserList: React.FC = () => {
  const { loading, error, data } = useQuery<getUsers>(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data?.users.map(({ id, email, username }) => (
        <div key={id}>
          <p>username: {username}</p>
          <p>email: {email}</p>
          <p>id: {id}</p>
        </div>
      ))}
    </>
  );
};
