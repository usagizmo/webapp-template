import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import createAuthSlice, { AuthSlice } from './slices/create-auth-slice'

export type State = AuthSlice

export const store: StateCreator<State> = (set) => {
  return {
    ...createAuthSlice(set),
  }
}

const useStore = create(devtools(store))

export default useStore
