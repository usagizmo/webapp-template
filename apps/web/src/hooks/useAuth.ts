import { useCallback, useEffect } from 'react'
import { CONST } from 'constants/const'
import type { User as FirebaseUser } from 'firebase/auth'
import {
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  getRedirectResult,
} from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
} from 'next-auth/react'
import { auth, db } from '@/lib/firebase'
import { useStore } from '@/store/useStore'

let unsubscribeUser = () => {
  // This is intentional
}

type Inputs = {
  email: string
  password: string
}

export const useAuth = () => {
  const startPageLoading = useStore((state) => state.startPageLoading)
  const endPageLoading = useStore((state) => state.endPageLoading)

  const setIdToken = useCallback(async (user: FirebaseUser) => {
    const idToken = await getIdTokenByFirebaseUser(user)
    if (idToken) {
      nextAuthSignIn('credentials', { idToken })
      return
    }

    const userMetasRef = doc(db, 'userMetas', user.uid)
    unsubscribeUser = onSnapshot(userMetasRef, async (doc) => {
      if (!doc.data()) return
      const lazyIdToken = await getIdTokenByFirebaseUser(user)
      nextAuthSignIn('credentials', { idToken: lazyIdToken })
    })
  }, [])

  const createUserWithEmailAndPassword = useCallback(
    async ({ email, password }: Inputs) => {
      startPageLoading()

      let user
      try {
        const { user: credentialUser } =
          await firebaseCreateUserWithEmailAndPassword(auth, email, password)
        user = credentialUser
      } catch (err: any) {
        alert(err.message)
        endPageLoading()
        return
      }
      setIdToken(user)
    },
    [endPageLoading, setIdToken, startPageLoading]
  )

  const signInWithEmailAndPassword = useCallback(
    async ({ email, password }: Inputs) => {
      startPageLoading()

      let user
      try {
        const { user: credentialUser } =
          await firebaseSignInWithEmailAndPassword(auth, email, password)
        user = credentialUser
      } catch (err: any) {
        alert(err.message)
        endPageLoading()
        return
      }
      setIdToken(user)
    },
    [endPageLoading, setIdToken, startPageLoading]
  )

  const signInWithGoogle = useCallback(async () => {
    const googleProvider = new GoogleAuthProvider()

    startPageLoading()

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
      endPageLoading()
      return
    }
    setIdToken(user)
  }, [endPageLoading, setIdToken, startPageLoading])

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
  return hasuraClaims ? idToken : null
}
