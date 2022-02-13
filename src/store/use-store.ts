import create, { StateCreator } from 'zustand'
import { LocalSlice, createLocalSlice } from '@/store/slices/create-local-slice'

export type State = LocalSlice

export const store: StateCreator<State> = (set) => {
  return {
    ...createLocalSlice(set),
  }
}

export const useStore = create(store)
