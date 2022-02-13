import { SetState } from 'zustand'
import { State } from '../use-store'

export type LocalSlice = {
  isPageLoading: boolean
  startPageLoading: () => void
  endPageLoading: () => void
}

export const createLocalSlice = (set: SetState<State>): LocalSlice => ({
  isPageLoading: false,
  startPageLoading: () => {
    set({ isPageLoading: true })
  },
  endPageLoading: () => {
    set({ isPageLoading: false })
  },
})
