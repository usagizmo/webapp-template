import { SetState } from 'zustand'
import { State } from '../use-store'
import { User } from '../../types/data-types'
import { cookie } from '../../libs/cookie'

export interface AuthSlice {
  token: string | null
  user: User | null
  setToken: (token: string) => void
  resetToken: () => void
  setUser: (user: User) => void
  resetUser: () => void
}

const createAuthSlice = (set: SetState<State>): AuthSlice => ({
  token: null, // Updated by useAuthSliceChanged
  user: null, // Updated by useUserChanged
  setToken: (token: string) => {
    set({ token })
    cookie.setToken(token)
  },
  resetToken: () => {
    set({ token: null })
    cookie.resetToken()
  },
  setUser: (user: User) => {
    set({ user })
  },
  resetUser: () => {
    set({ user: null })
  },
})

export default createAuthSlice
