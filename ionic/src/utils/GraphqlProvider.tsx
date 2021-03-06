import React from "react";
import { createClient, Provider } from "urql";

const client = createClient({
  url: process.env.REACT_APP_GRAPHQL_URL!,
  fetchOptions: () => {
    const headers: Record<string, string> = {};
    const token = window.localStorage.getItem("token");

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    if (process.env.NODE_ENV !== "production") {
      headers["X-Hasura-Admin-Secret"] = process.env.REACT_APP_ADMIN_SECRET!;
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
