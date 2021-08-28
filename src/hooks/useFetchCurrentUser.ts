import { useCallback } from 'react'
import { User } from '../types/types'
import { GET_CURRENT_USER } from '../queries/queries'
import useGraphQLClientStore from '../store/useGraphQLClientStore'

interface CurrentUserRes {
  users_by_pk: User
}

export const useFetchCurrentUser = () => {
  const graphQLClient = useGraphQLClientStore((state) => state.graphQLClient)

  const fetchCurrentUser = useCallback(
    async (firebaseUid: string) => {
      const { users_by_pk: data } = await graphQLClient.request<CurrentUserRes>(GET_CURRENT_USER, {
        id: firebaseUid,
      })
      return data
    },
    [graphQLClient]
  )

  return fetchCurrentUser
}
