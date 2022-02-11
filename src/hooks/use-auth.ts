import { useCallback, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  User as FirebaseUser,
  signOut as firebaseSignOut,
  getRedirectResult,
} from 'firebase/auth'
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react'
import { CONST } from '@/constants/const'
import { auth, firestore } from '@/libs/firebase'

let unsubscribeUser = () => {
  // This is intentional
}

type Inputs = {
  email: string
  password: string
}

export const useAuth = () => {
  const setIdToken = useCallback(async (user: FirebaseUser) => {
    const idToken = await getIdTokenByFirebaseUser(user)
    if (idToken) {
      nextAuthSignIn('credentials', { idToken })
      return
    }

    const userRef = doc(firestore, 'user_meta', user.uid)
    unsubscribeUser = onSnapshot(userRef, async () => {
      const lazyIdToken = await getIdTokenByFirebaseUser(user)
      nextAuthSignIn('credentials', { idToken: lazyIdToken })
    })
  }, [])

  const createUserWithEmailAndPassword = useCallback(
    async ({ email, password }: Inputs) => {
      let user
      try {
        const { user: credentialUser } =
          await firebaseCreateUserWithEmailAndPassword(auth, email, password)
        user = credentialUser
      } catch (err: any) {
        alert(err.message)
        return
      }
      setIdToken(user)
    },
    [setIdToken]
  )

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: Inputs) => {
      let user
      try {
        const { user: credentialUser } =
          await firebaseSignInWithEmailAndPassword(auth, email, password)
        user = credentialUser
      } catch (err: any) {
        alert(err.message)
        return
      }
      setIdToken(user)
    },
    [setIdToken]
  )

  const signInWithGoogle = useCallback(async () => {
    const googleProvider = new GoogleAuthProvider()

    let user
    try {
      await signInWithRedirect(auth, googleProvider)
      const { user: credentialUser } = (await getRedirectResult(auth)) ?? {}
      if (!credentialUser) {
        throw new Error('No user')
      }

      user = credentialUser
    } catch (err: any) {
      alert(err.message)
      return
    }
    setIdToken(user)
  }, [setIdToken])

  const signOut = useCallback(async () => {
    await firebaseSignOut(auth)
    await nextAuthSignOut()
  }, [])

  // Excute unsubscribeUser() when the component unmounts
  useEffect(() => () => unsubscribeUser(), [])

  return {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithGoogle,
    signOut,
  }
}

const getIdTokenByFirebaseUser = async (user: FirebaseUser) => {
  const idToken = await user.getIdToken(true)
  const idTokenResult = await user.getIdTokenResult()
  const hasuraClaims = idTokenResult.claims[CONST.HASURA_TOKEN_KEY]
  return hasuraClaims ? idToken : ''
}
