import { useCallback, useEffect } from 'react'
import { auth } from '../libs/firebase'
import useAuthStore from '../store/useAuthStore'
import { useFetchCurrentUser } from './useFetchCurrentUser'

export let unsubscribeUser = () => {}

export const useUserChanged = () => {
  const token = useAuthStore((state) => state.token)
  const setUser = useAuthStore((state) => state.setUser)
  const resetUser = useAuthStore((state) => state.resetUser)
  const fetchCurrentUser = useFetchCurrentUser()

  const setCurrentUser = useCallback(
    async (firebaseUid) => {
      try {
        const user = await fetchCurrentUser(firebaseUid)
        setUser(user)
      } catch (error) {
        console.error(error)
        resetUser()
      }
    },
    [fetchCurrentUser, setUser, resetUser]
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
