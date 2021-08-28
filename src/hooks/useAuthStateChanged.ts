import { useEffect } from 'react'
import firebase from '../libs/firebase'
import CONST from '../constants/const'
import useAuthStore from '../store/useAuthStore'
import useGraphQLClientStore from '../store/useGraphQLClientStore'

export let unsubscribeUser = () => {}

const getToken = async (user: firebase.User) => {
  const token = await user.getIdToken(true)
  const idTokenResult = await user.getIdTokenResult()
  const hasuraClaims = idTokenResult.claims[CONST.HASURA_TOKEN_KEY]
  return hasuraClaims ? token : ''
}

export const useAuthStateChanged = () => {
  const setToken = useAuthStore((state) => state.setToken)
  const resetToken = useAuthStore((state) => state.resetToken)
  const setGraphQLClient = useGraphQLClientStore((state) => state.setGraphQLClient)
  const resetGraphQLClient = useGraphQLClientStore((state) => state.resetGraphQLClient)

  useEffect(() => {
    const unsubscribeAuthStateChanged = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        unsubscribeUser()
        resetToken()
        resetGraphQLClient()
        return
      }

      const token = await getToken(user)
      if (token) {
        setToken(token)
        setGraphQLClient(token)
        return
      }

      const userRef = firebase.firestore().collection('user_meta').doc(user.uid)
      unsubscribeUser = userRef.onSnapshot(async () => {
        const token = await getToken(user)
        setToken(token)
        setGraphQLClient(token)
      })
    })
    return () => {
      unsubscribeUser()
      unsubscribeAuthStateChanged()
    }
  }, [setToken, resetToken, setGraphQLClient, resetGraphQLClient])
}
