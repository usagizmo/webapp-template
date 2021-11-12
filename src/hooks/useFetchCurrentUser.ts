import { useCallback } from 'react'
import { gql } from 'graphql-request'
import { returnCurrentUserProps, User } from '../types/dataTypes'
import useStore from '../store/useStore'

const GET_CURRENT_USER = gql`
  query GetCurrentUser($id: String!) {
    users_by_pk(id: $id) {
      ${returnCurrentUserProps}
    }
  }
`

interface QueryResult {
  users_by_pk: User
}

export const useFetchCurrentUser = () => {
  const graphQLClient = useStore((state) => state.graphQLClient)

  const fetchCurrentUser = useCallback(
    async (firebaseUid: string) => {
      const { users_by_pk: data } = await graphQLClient.request<QueryResult>(GET_CURRENT_USER, {
        id: firebaseUid,
      })
      return data
    },
    [graphQLClient]
  )

  return fetchCurrentUser
}
