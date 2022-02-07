import { useCallback } from 'react'
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'firebase/auth'
import { auth } from '../libs/firebase'

type Inputs = {
  email: string
  password: string
}

export const useFirebaseAuth = () => {
  const signInWithEmailAndPassword = useCallback(async ({ email, password }: Inputs) => {
    try {
      await firebaseSignInWithEmailAndPassword(auth, email, password)
    } catch (err: any) {
      alert(err.message)
    }
  }, [])

  const createUserWithEmailAndPassword = useCallback(async ({ email, password }: Inputs) => {
    try {
      await firebaseCreateUserWithEmailAndPassword(auth, email, password)
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
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithGoogle,
  }
}
