import create, { StateCreator } from 'zustand'
import { devtools } from 'zustand/middleware'
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

export const useStore = create(
  process.env.NODE_ENV === 'development' ? devtools(store) : store
)
