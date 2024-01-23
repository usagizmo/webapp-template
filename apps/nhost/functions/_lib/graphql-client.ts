import { GraphQLClient } from 'graphql-request';
import { getSdk } from './$generated/graphql';

const endpoint = process.env.GRAPHQL_ENDPOINT;

// This GraphQL Client is only used in serverless functions (secure).
const client = new GraphQLClient(endpoint, {
  headers: {
    ['x-hasura-admin-secret']: process.env.HASURA_GRAPHQL_ADMIN_SECRET,
  },
});

export const sdk = getSdk(client);
