import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import createAuthSlice, { AuthSlice } from './slices/createAuthSlice'
import createGraphQLClientSlice, { GraphQLClientSlice } from './slices/createGraphQLClientSlice'
import createUiSlice, { UiSlice } from './slices/createUiSlice'
import createSelectedRelationNodeSlice, {
  SelectedRelationNodeSlice,
} from './slices/createSelectedRelationNodeSlice'

export type State = UiSlice & SelectedRelationNodeSlice & GraphQLClientSlice & AuthSlice

export const store: StateCreator<State> = (set) => {
  return {
    ...createUiSlice(set),
    ...createGraphQLClientSlice(),
    ...createAuthSlice(set),
    ...createSelectedRelationNodeSlice(set),
  }
}

const useStore = create(devtools(store))

export default useStore
