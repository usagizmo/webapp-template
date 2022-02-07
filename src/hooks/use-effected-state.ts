import { Dispatch, SetStateAction, useEffect, useState } from 'react'

export const useEffectedState = <T>(stateValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [value, set] = useState(stateValue)
  useEffect(() => set(stateValue), [stateValue])
  return [value, set]
}
