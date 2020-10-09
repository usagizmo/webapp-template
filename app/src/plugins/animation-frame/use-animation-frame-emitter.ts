import { useMitt } from 'react-mitt'
import { useEffectOnce } from 'react-use'
import { EMITTER } from '../../constants/emitter'

const useAnimationFrameEmitter = () => {
  const { emitter } = useMitt()

  useEffectOnce(() => {
    let frame = null

    const animate = () => {
      emitter.emit(EMITTER.animationFrame)
      frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => void cancelAnimationFrame(frame)
  })
}

export default useAnimationFrameEmitter
