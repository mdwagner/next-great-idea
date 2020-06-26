import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';


const USER_LIST = gql `
{
  users {
    id
    email
    firstname
    lastname
  }
}
`

export const UserList: React.FC = () => {
    const { loading, error, data } = useQuery(USER_LIST);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ id, email, firstname, lastname } : {id:any, email:any, firstname:any, lastname:any}) => (
    <div key={id}>
      <p>
        name: {firstname + " " + lastname}
      </p>
      <p>
        email: {email}
      </p>
      <p>
        id: {id}
      </p>
    </div>
  ));
};