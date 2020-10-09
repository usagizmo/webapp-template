import { useMitt } from 'react-mitt'
import { useEffectOnce } from 'react-use'
import { EMITTER } from '../../constants/emitter'
import { Mouse } from '../../store'

const useMouseDown = (callback: (mouse: Mouse) => void): void => {
  const { emitter } = useMitt()
  useEffectOnce(() => {
    emitter.on(EMITTER.mouseDown, callback)
    return () => void emitter.off(EMITTER.mouseDown, callback)
  })
}

const useMouseMove = (callback: (mouse: Mouse) => void): void => {
  const { emitter } = useMitt()
  useEffectOnce(() => {
    emitter.on(EMITTER.mouseMove, callback)
    return () => void emitter.off(EMITTER.mouseMove, callback)
  })
}

const useMouseUp = (callback: (mouse: Mouse) => void): void => {
  const { emitter } = useMitt()
  useEffectOnce(() => {
    emitter.on(EMITTER.mouseUp, callback)
    return () => void emitter.off(EMITTER.mouseUp, callback)
  })
}

export { useMouseDown, useMouseMove, useMouseUp }
