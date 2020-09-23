import { RefObject, useEffect } from 'react'
import { useMitt } from 'react-mitt'
import gsap from 'gsap'
import { EMITTER } from '../../constants/emitter'

const useScrollParallax = (ref: RefObject<HTMLElement>, deep = 0, offsetY = 0): void => {
  const { emitter } = useMitt()

  useEffect(() => {
    const onAnimatedScrollY = (scrollY: number) => {
      gsap.set(ref.current, { y: scrollY * deep + offsetY, force3D: true })
    }

    emitter.on(EMITTER.animatedScrollY, onAnimatedScrollY)
    return () => emitter.off(EMITTER.animatedScrollY, onAnimatedScrollY)
  }, [deep, emitter, offsetY, ref])
}

export default useScrollParallax
