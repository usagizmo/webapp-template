import { useMitt } from 'react-mitt'
import { useEffectOnce } from 'react-use'
import { EMITTER } from '../../constants/emitter'

const useAnimationFrame = (callback: () => void): void => {
  const { emitter } = useMitt()
  useEffectOnce(() => {
    emitter.on(EMITTER.animationFrame, callback)
    return () => void emitter.off(EMITTER.animationFrame, callback)
  })
}

export default useAnimationFrame
