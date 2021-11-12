import { useEffect } from 'react'
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import CONST from '../constants/const'
import { auth, db } from '../libs/firebase'
import useStore from '../store/useStore'

let unsubscribeUser = () => {}

const getToken = async (user: FirebaseUser) => {
  const token = await user.getIdToken(true)
  const idTokenResult = await user.getIdTokenResult()
  const hasuraClaims = idTokenResult.claims[CONST.HASURA_TOKEN_KEY]
  return hasuraClaims ? token : ''
}

export const useAuthStateChanged = () => {
  const setToken = useStore((state) => state.setToken)
  const resetToken = useStore((state) => state.resetToken)

  useEffect(() => {
    const unsubscribeAuthStateChanged = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        unsubscribeUser()
        resetToken()
        return
      }

      const token = await getToken(user)
      if (token) {
        setToken(token)
        return
      }

      const userRef = doc(db, 'user_meta', user.uid)
      unsubscribeUser = onSnapshot(userRef, async () => {
        const token = await getToken(user)
        setToken(token)
      })
    })
    return () => {
      unsubscribeUser()
      unsubscribeAuthStateChanged()
    }
  }, [setToken, resetToken])
}
