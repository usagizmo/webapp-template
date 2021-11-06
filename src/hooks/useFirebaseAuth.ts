import { useCallback } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../libs/firebase'

type Inputs = {
  email: string
  password: string
}

export const useFirebaseAuth = () => {
  const _signInWithEmailAndPassword = useCallback(async ({ email, password }: Inputs) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      alert(err.message)
    }
  }, [])

  const _createUserWithEmailAndPassword = useCallback(async ({ email, password }: Inputs) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      alert(err.message)
      console.error(err)
    }
  }, [])

  const signInWithGoogle = useCallback(async () => {
    try {
      const googleProvider = new GoogleAuthProvider()
      await signInWithRedirect(auth, googleProvider)
    } catch (err: any) {
      alert(err.message)
      console.error(err)
    }
  }, [])

  return {
    signInWithEmailAndPassword: _signInWithEmailAndPassword,
    createUserWithEmailAndPassword: _createUserWithEmailAndPassword,
    signInWithGoogle,
  }
}
