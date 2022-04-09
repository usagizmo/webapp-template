import create, { StateCreator } from 'zustand'
import {
  createPageLoadingSlice,
  PageLoadingSlice,
} from './slices/createPageLoadingSlice'

export type State = PageLoadingSlice // & OtherSlices

export const store: StateCreator<State> = (set) => {
  return {
    ...createPageLoadingSlice(set),
  }
}

export const useStore = create(store)
