import { RefObject, useEffect } from 'react'
import { useMitt } from 'react-mitt'
import gsap from 'gsap'
import { EMITTER } from '../../constants/emitter'

const useScrollParallax = (ref: RefObject<HTMLElement>, deep = 0, offsetY = 0): void => {
  const { emitter } = useMitt()

  useEffect(() => {
    const onAnimatedScrollTop = (scrollY: number) => {
      gsap.set(ref.current, { y: scrollY * deep + offsetY, force3D: true })
    }

    emitter.on(EMITTER.animatedScrollTop, onAnimatedScrollTop)
    return () => emitter.off(EMITTER.animatedScrollTop, onAnimatedScrollTop)
  }, [deep, emitter, offsetY, ref])
}

export default useScrollParallax
