import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
import createAuthSlice, { AuthSlice } from './slices/createAuthSlice'
import createGraphQLClientSlice, { GraphQLClientSlice } from './slices/createGraphQLClientSlice'
import createDataSlice, { DataSlice } from './slices/createDataSlice/createDataSlice'
import createUiSlice, { UiSlice } from './slices/createUiSlice'
import createSelectedRelationNodeSlice, {
  SelectedRelationNodeSlice,
} from './slices/createSelectedRelationNodeSlice'

export type State = DataSlice & UiSlice & SelectedRelationNodeSlice & GraphQLClientSlice & AuthSlice

export type ByIdProp =
  | 'nodeById'
  | 'relationById'
  | 'groupById'
  | 'workspaceById'
  | 'workspaceNodeById'

export const store: StateCreator<State> = (set, get) => {
  return {
    ...createUiSlice(set),
    ...createGraphQLClientSlice(),
    ...createAuthSlice(set),
    ...createDataSlice(set, get),
    ...createSelectedRelationNodeSlice(set),
  }
}

const useStore = create(devtools(store))

export default useStore
