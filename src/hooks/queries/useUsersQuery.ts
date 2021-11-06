import { useCallback } from 'react'
import { useQuery } from 'react-query'
import { User } from '../../types/dataTypes'
import { GET_USERS } from '../../queries/queries'
import QUERY_KEY from '../../constants/query-key'
import useStore from '../../store/useStore'

interface UsersRes {
  users: User[]
}

export const useUsersQuery = () => {
  const graphQLClient = useStore((state) => state.graphQLClient)

  const fetchUsers = useCallback(async () => {
    return (await graphQLClient.request<UsersRes>(GET_USERS)).users
  }, [graphQLClient])

  return useQuery<User[], Error>({
    queryKey: QUERY_KEY.USERS,
    queryFn: fetchUsers,
    staleTime: Infinity,
  })
}
