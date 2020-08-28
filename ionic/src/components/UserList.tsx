import React from "react";
import { useGetUsersQuery } from "./UserList/UserList.generated";

export const UserList: React.FC = () => {
  const [{ fetching: loading, data, error }] = useGetUsersQuery();

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
