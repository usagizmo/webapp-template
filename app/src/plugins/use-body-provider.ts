import { useIsomorphicLayoutEffect } from 'react-use'
import { useMitt } from 'react-mitt'
import { EMITTER } from '../constants/emitter'

const useBodyProvider = (): void => {
  const { emitter } = useMitt()
  useIsomorphicLayoutEffect(() => {
    const onBodyHeight = (height: number) => {
      document.body.style.height = `${height}px`
    }

    emitter.on(EMITTER.bodyHeight, onBodyHeight)
    return () => void emitter.off(EMITTER.bodyHeight, onBodyHeight)
  }, [])
}

export default useBodyProvider
