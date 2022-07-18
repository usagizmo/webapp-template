import { useCallback } from 'react'
import {
  useSignInEmailPassword,
  useSignOut,
  useSignUpEmailPassword,
} from '@nhost/nextjs'

export type Inputs = {
  displayName: string
  email: string
  password: string
}

export const useAuth = () => {
  const { signUpEmailPassword } = useSignUpEmailPassword()
  const { signInEmailPassword } = useSignInEmailPassword()
  const { signOut: nhostSignOut } = useSignOut()

  const createUserWithEmailAndPassword = useCallback(
    async ({ email, password, displayName }: Inputs) => {
      await signUpEmailPassword(email, password, {
        displayName,
      })
    },
    [signUpEmailPassword]
  )

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: Inputs) => {
      await signInEmailPassword(email, password)
    },
    [signInEmailPassword]
  )

  const signOut = useCallback(async () => {
    await nhostSignOut()
  }, [nhostSignOut])

  return {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  }
}
