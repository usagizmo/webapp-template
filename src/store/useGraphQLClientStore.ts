import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { GraphQLClient } from 'graphql-request'
import ENV from '../constants/env'

const getHeaders = (token?: string): HeadersInit => {
  return token
    ? {
        authorization: `Bearer ${token}`,
      }
    : {}
}

const getGraphQlClient = (token?: string) => {
  const headers = getHeaders(token)
  return new GraphQLClient(ENV.GRAPHQL_ENDPOINT, {
    headers,
  })
}

interface GraphQLClientState {
  graphQLClient: GraphQLClient
  setGraphQLClient: (token: string) => void
  resetGraphQLClient: () => void
}

const graphQLClientStore: StateCreator<GraphQLClientState> = (set) => ({
  graphQLClient: getGraphQlClient(),
  setGraphQLClient: (token: string) => {
    const graphQLClient = getGraphQlClient(token)
    set({ graphQLClient })
  },
  resetGraphQLClient: () => {
    set({ graphQLClient: getGraphQlClient() })
  },
})

const useGraphQLClientStore = create(devtools(graphQLClientStore))

export default useGraphQLClientStore
