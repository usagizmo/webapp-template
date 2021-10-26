import { useCallback } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../libs/firebase'

export const useLogout = () => {
  const logout = useCallback(async () => {
    await signOut(auth)
  }, [])

  return {
    logout,
  }
}
