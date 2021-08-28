import { useCallback } from 'react'
import firebase from '../libs/firebase'

export const useLogout = () => {
  const logout = useCallback(async () => {
    await firebase.auth().signOut()
  }, [])

  return {
    logout,
  }
}
