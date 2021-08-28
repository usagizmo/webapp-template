import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { User } from '../types/types'

interface AuthState {
  token: string | null
  user: User | null
  setToken: (token: string) => void
  resetToken: () => void
  setUser: (user: User) => void
  resetUser: () => void
}

const authStore: StateCreator<AuthState> = (set) => ({
  token: null, // Updated by useAuthStateChanged
  user: null, // Updated by useUserChanged
  setToken: (token: string) => {
    set({ token })
  },
  resetToken: () => {
    set({ token: null })
  },
  setUser: (user: User) => {
    set({ user })
  },
  resetUser: () => {
    set({ user: null })
  },
})

const useAuthStore = create(devtools(authStore))

export default useAuthStore
