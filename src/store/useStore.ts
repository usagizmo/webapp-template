import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import createAuthSlice, { AuthSlice } from './slices/createAuthSlice'
import createGraphQLClientSlice, { GraphQLClientSlice } from './slices/createGraphQLClientSlice'

export type State = GraphQLClientSlice & AuthSlice

export const store: StateCreator<State> = (set) => {
  return {
    ...createGraphQLClientSlice(),
    ...createAuthSlice(set),
  }
}

const useStore = create(devtools(store))

export default useStore
