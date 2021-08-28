import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { User } from '../types/types'
import { GET_USERS } from '../queries/queries'
import QUERY_KEY from '../constants/query-key'
import useGraphQLClientStore from '../store/useGraphQLClientStore'

interface UsersRes {
  users: User[]
}

export const useQueryUsers = () => {
  const graphQLClient = useGraphQLClientStore((state) => state.graphQLClient)

  const fetchUsers = useCallback(async () => {
    const { users: data } = await graphQLClient.request<UsersRes>(GET_USERS)
    return data
  }, [graphQLClient])

  return useQuery<User[], Error>({
    queryKey: QUERY_KEY.USERS,
    queryFn: fetchUsers,
    // staleTime: Infinity,
    refetchOnWindowFocus: false,
  })
}
