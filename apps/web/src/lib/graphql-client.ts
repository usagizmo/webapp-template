import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { ApolloLink, concat, split } from '@apollo/client/link/core';
import { PUBLIC_GRAPHQL_ENDPOINT } from '$env/static/public';
import { browser } from '$app/environment';
import { nhost } from './nhost';

const httpLink = new HttpLink({ uri: PUBLIC_GRAPHQL_ENDPOINT });

const wsLink = browser
  ? new WebSocketLink({
      uri: PUBLIC_GRAPHQL_ENDPOINT.replace(/^http/, 'ws'),
    })
  : null;

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = nhost.auth.getAccessToken();
  operation.setContext({
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
  return forward(operation);
});

const link = browser
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      concat(authMiddleware, wsLink!),
      concat(authMiddleware, httpLink),
    )
  : concat(authMiddleware, httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
