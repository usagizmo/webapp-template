import { useMitt } from 'react-mitt'
import { useEffectOnce } from 'react-use'
import { EMITTER } from '../../constants/emitter'
import { Mouse } from '../../store'

type Callback = (mouse: Mouse) => void

const useMouseEvent = (emitterType: 'mouseDown' | 'mouseMove' | 'mouseUp', callback?: Callback) => {
  const { emitter } = useMitt()
  useEffectOnce(() => {
    const handle = (mouse: Mouse) => void callback?.(mouse)
    emitter.on(EMITTER[emitterType], handle)
    return () => void emitter.off(EMITTER[emitterType], handle)
  })
}

const useMouseDown = (callback?: Callback): void => {
  useMouseEvent('mouseDown', callback)
}

const useMouseMove = (callback?: Callback): void => {
  useMouseEvent('mouseMove', callback)
}

const useMouseUp = (callback?: (mouse: Mouse) => void): void => {
  useMouseEvent('mouseUp', callback)
}

export { useMouseDown, useMouseMove, useMouseUp }
