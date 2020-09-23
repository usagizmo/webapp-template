import { useIsomorphicLayoutEffect } from 'react-use'
import { useMitt } from 'react-mitt'
import gsap from 'gsap'
import { EMITTER } from '../constants/emitter'

const useBodyProvider = () => {
  const { emitter } = useMitt()
  useIsomorphicLayoutEffect(() => {
    const onBodyHeight = (height: number) => {
      gsap.set(document.body, { height })
    }

    emitter.on(EMITTER.bodyHeight, onBodyHeight)
    return () => emitter.off(EMITTER.bodyHeight, onBodyHeight)
  }, [])

  useIsomorphicLayoutEffect(() => {
    const onBodyOverflowY = (enable: boolean) => {
      document.body.style.overflowY = enable ? 'visible' : 'hidden'
    }

    emitter.on(EMITTER.bodyOverflowY, onBodyOverflowY)
    return () => emitter.off(EMITTER.bodyOverflowY, onBodyOverflowY)
  }, [])
}

export default useBodyProvider
