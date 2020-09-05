import { atom } from 'recoil'

export interface Size {
  width: number
  height: number
}

export const windowSizeState = atom<Size>({
  key: 'windowSizeState',
  default: { width: 0, height: 0 },
})
