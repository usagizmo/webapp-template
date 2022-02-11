import { useCallback } from 'react'
import { signOut as firebaseSignOut } from 'firebase/auth'
import { auth } from '@/libs/firebase'

export const useSignOut = () => {
  const signOut = useCallback(async () => {
    await firebaseSignOut(auth)
  }, [])

  return {
    signOut,
  }
}
