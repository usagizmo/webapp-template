import { SetState } from 'zustand'
import { State } from '@/store/use-store'

export type LocalSlice = {
  isMenuOpen: boolean
  openMenu: () => void
  closeMenu: () => void
}

export const createLocalSlice = (set: SetState<State>): LocalSlice => ({
  isMenuOpen: false,
  openMenu: () => {
    set({ isMenuOpen: true })
  },
  closeMenu: () => {
    set({ isMenuOpen: false })
  },
})
