import React from "react";
import { ApolloProvider as Provider } from "@apollo/react-hooks";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from "apollo-boost";

const cache = new InMemoryCache();
const link = new HttpLink({
  uri:
    process.env.HASURA_GRAPHQL_ENDPOINT ||
    "http://host.docker.internal:8080/v1/graphql",
  headers: {
    "X-Hasura-Admin-Secret":
      process.env.NODE_ENV === "production" ? "" : "secret",
  },
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
});

const defaultCacheData = {
  isLoggedIn: !!window.localStorage.getItem("token"),
  userId: null,
};

cache.writeData({ data: defaultCacheData });

const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  link,
});

client.onResetStore(async () => cache.writeData({ data: defaultCacheData }));

export const ApolloProvider: React.FC = ({ children }) => {
  return <Provider client={client}>{children}</Provider>;
};
