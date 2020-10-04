import { useMitt } from 'react-mitt'
import { useEffectOnce } from 'react-use'
import { EMITTER } from '../../constants/emitter'

const useMouseMove = (callback: (mouse: { x: number; y: number }) => void): void => {
  const { emitter } = useMitt()
  useEffectOnce(() => {
    emitter.on(EMITTER.mouseMove, callback)
    return () => void emitter.off(EMITTER.mouseMove, callback)
  })
}

export default useMouseMove
