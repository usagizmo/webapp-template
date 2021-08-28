import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import firebase from '../libs/firebase'

export const useFirebaseAuth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(false)

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }, [])

  const onChangePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const resetPassword = useCallback(() => {
    setPassword('')
  }, [])

  const toggleIsLogin = useCallback(() => {
    setIsLogin(!isLogin)
  }, [isLogin])

  const login = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      if (isLogin) {
        try {
          await firebase.auth().signInWithEmailAndPassword(email, password)
        } catch (e) {
          console.error(e)
        }
      } else {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (e) {
          console.error(e)
        }
      }
      resetPassword()
    },
    [isLogin, email, password, resetPassword]
  )

  return {
    email,
    password,
    isLogin,
    onChangeEmail,
    onChangePassword,
    resetPassword,
    toggleIsLogin,
    login,
  }
}
