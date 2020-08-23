import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_IDEAS = gql`
  query getIdeas {
    ideas {
      id
      title
      description
      user {
        email
      }
    }
  }
`;

export const IdeasList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_IDEAS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <>
      {data?.users.map(
        ({
          id,
          title,
          description,
          email,
        }: {
          id: any;
          title: any;
          description: any;
          email: any;
        }) => (
          <div key={id}>
            <p>title: {title}</p>
            <p>description: {description}</p>
            <p>creator: {email}</p>
            <p>id: {id}</p>
          </div>
        )
      )}
    </>
  );
};
