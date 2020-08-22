import React from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url:
    process.env.HASURA_GRAPHQL_ENDPOINT ||
    "http://host.docker.internal:8080/v1/graphql",
  fetch: (input, init) => {
    const token = window.localStorage.getItem("token");
    const authHeader: object = token
      ? { Authorization: `Bearer ${token}` }
      : {};

    return fetch(input, {
      ...init,
      headers: {
        ...init?.headers,
        ...authHeader,
      },
    });
  },
  fetchOptions: {
    headers: {
      "X-Hasura-Admin-Secret":
        process.env.NODE_ENV === "production" ? "" : "secret",
    },
  },
});

export const GraphqlProvider: React.FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
