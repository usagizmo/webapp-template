import { useCallback, useEffect } from 'react'
import { auth } from '../libs/firebase'
import useStore from '../store/useStore'
import { useFetchCurrentUser } from './useFetchCurrentUser'

export const useUserChanged = () => {
  const token = useStore((state) => state.token)
  const setUser = useStore((state) => state.setUser)
  const resetUser = useStore((state) => state.resetUser)
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
