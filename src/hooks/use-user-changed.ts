import { useCallback, useEffect } from 'react'
import { useGetCurrentUserQuery } from '../generated/graphql'
import { auth } from '../libs/firebase'
import useStore from '../store/use-store'
import { User } from '../types/data-types'

export const useUserChanged = () => {
  const token = useStore((state) => state.token)
  const setUser = useStore((state) => state.setUser)
  const resetUser = useStore((state) => state.resetUser)

  const setCurrentUser = useCallback(
    async (firebaseUid) => {
      try {
        const { users_by_pk: user } = await useGetCurrentUserQuery.fetcher({ id: firebaseUid })()
        setUser(user as User)
      } catch (error) {
        console.error(error)
        resetUser()
      }
    },
    [resetUser, setUser]
  )

  useEffect(() => {
    const firebaseUid = auth.currentUser?.uid
    if (!token || !firebaseUid) {
      resetUser()
      return
    }

    setCurrentUser(firebaseUid)
  }, [token, resetUser, setCurrentUser])
}
