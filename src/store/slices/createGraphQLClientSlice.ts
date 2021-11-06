import { GraphQLClient } from 'graphql-request'
import ENV from '../../constants/env'

const getHeaders = (token?: string): HeadersInit => {
  return token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {}
}

export const getGraphQlClient = (token?: string) => {
  const headers = getHeaders(token)
  return new GraphQLClient(ENV.GRAPHQL_ENDPOINT, {
    headers,
  })
}

export interface GraphQLClientSlice {
  graphQLClient: GraphQLClient
}

const createRelationSlice = (): GraphQLClientSlice => ({
  graphQLClient: getGraphQlClient(), // Updated by createAuthSlice
})

export default createRelationSlice
