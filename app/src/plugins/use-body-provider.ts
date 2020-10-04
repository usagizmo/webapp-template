import { useIsomorphicLayoutEffect } from 'react-use'
import { useMitt } from 'react-mitt'
import { EMITTER } from '../constants/emitter'

const useBodyProvider = () => {
  const { emitter } = useMitt()
  useIsomorphicLayoutEffect(() => {
    const onBodyHeight = (height: number) => {
      document.body.style.height = `${height}px`
    }

    emitter.on(EMITTER.bodyHeight, onBodyHeight)
    return () => void emitter.off(EMITTER.bodyHeight, onBodyHeight)
  }, [])

  useIsomorphicLayoutEffect(() => {
    const onBodyOverflowY = (enable: boolean) => {
      document.body.style.overflowY = enable ? 'visible' : 'hidden'
    }

    emitter.on(EMITTER.bodyOverflowY, onBodyOverflowY)
    return () => void emitter.off(EMITTER.bodyOverflowY, onBodyOverflowY)
  }, [])
}

export default useBodyProvider
