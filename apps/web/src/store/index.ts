import { atom } from 'jotai'

export const isPageLoadingAtom = atom(false)
export const startPageLoadingAtom = atom(null, (_get, set) =>
  set(isPageLoadingAtom, true)
)
export const endPageLoadingAtom = atom(null, (_get, set) =>
  set(isPageLoadingAtom, false)
)
