import type { StateCreator } from 'zustand'
import create from 'zustand'
import { devtools } from 'zustand/middleware'
import type { PageLoadingSlice } from './slices/createPageLoadingSlice'
import { createPageLoadingSlice } from './slices/createPageLoadingSlice'

export type State = PageLoadingSlice // & OtherSlices

export const store: StateCreator<State> = (set) => {
  return {
    ...createPageLoadingSlice(set),
  }
}

export const useStore = create(
  process.env.NODE_ENV === 'development' ? devtools(store) : store
)
