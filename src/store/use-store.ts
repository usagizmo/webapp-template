import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import { AuthSlice, createAuthSlice } from './slices/create-auth-slice'

export type State = AuthSlice

export const store: StateCreator<State> = (set) => {
  return {
    ...createAuthSlice(set),
  }
}

export const useStore = create(devtools(store))
