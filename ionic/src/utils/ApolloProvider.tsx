import React from 'react';
import { ApolloProvider as Provider } from '@apollo/react-hooks';
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink
} from 'apollo-boost';

const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.HASURA_GRAPHQL_ENDPOINT || "http://host.docker.internal:8080/v1/graphql",
  headers: {
    'authorization': `Bearer ${window.localStorage.getItem('token') || ''}`,
    'x-hasura-admin-secret': process.env.NODE_ENV === 'production' ? '' : 'secret'
  }
});

const client = new ApolloClient<NormalizedCacheObject>({
  cache,
  link
});

cache.writeData({
  data: {
    isLoggedIn: !!window.localStorage.getItem('token')
  }
});

export const ApolloProvider: React.FC = ({ children }) => {
  return (
    <Provider client={client}>
      {children}
    </Provider>
  );
}
