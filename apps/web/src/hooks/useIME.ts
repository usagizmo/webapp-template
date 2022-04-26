import type { KeyboardEventHandler } from 'react'
import { useState } from 'react'

export const useIME = (): [
  boolean,
  {
    onCompositionStart: KeyboardEventHandler
    onCompositionEnd: KeyboardEventHandler
  }
] => {
  const [isIME, setIsIME] = useState(false)
  const bindings = {
    onCompositionStart: () => setIsIME(true),
    onCompositionEnd: () => setIsIME(false),
  }

  return [isIME, bindings]
}
