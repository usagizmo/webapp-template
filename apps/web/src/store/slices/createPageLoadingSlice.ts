import type { SetState } from 'zustand'
import type { State } from '../useStore'

export type PageLoadingSlice = {
  isPageLoading: boolean
  startPageLoading: () => void
  endPageLoading: () => void
}

export const createPageLoadingSlice = (
  set: SetState<State>
): PageLoadingSlice => ({
  isPageLoading: false,
  startPageLoading: () => {
    set({ isPageLoading: true })
  },
  endPageLoading: () => {
    set({ isPageLoading: false })
  },
})
