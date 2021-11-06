import { SetState } from 'zustand'
import { State } from '../useStore'

export interface UiSlice {
  isSideMenuOpen: boolean
  toggleSideMenuOpen: (isOpen?: boolean) => void
}

const createUiSlice = (set: SetState<State>): UiSlice => ({
  isSideMenuOpen: false,
  toggleSideMenuOpen: (isOpen) => {
    set((state) => ({ isSideMenuOpen: isOpen ?? !state.isSideMenuOpen }))
  },
})

export default createUiSlice
