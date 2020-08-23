import React from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url:
    process.env.HASURA_GRAPHQL_ENDPOINT ||
    "http://host.docker.internal:8080/v1/graphql",
  fetchOptions: () => {
    const headers = new Headers();
    const token = window.localStorage.getItem("token");

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    if (process.env.NODE_ENV !== "production") {
      headers.set("X-Hasura-Admin-Secret", "secret");
    }

    return {
      headers,
    };
  },
  requestPolicy: "network-only",
});

export const GraphqlProvider: React.FC = ({ children }) => {
  return <Provider value={client}>{children}</Provider>;
};
