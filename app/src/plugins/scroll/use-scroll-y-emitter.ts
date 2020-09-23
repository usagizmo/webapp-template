import { useCallback, useEffect, useRef } from 'react'
import { useWindowScroll } from 'react-use'
import { useMitt } from 'react-mitt'
import { EMITTER } from '../../constants/emitter'
import useIsMobileDevice from '../use-is-mobile-device'

const useScrollYEmitter = ({ ease } = { ease: 0.1 }): void => {
  const { emitter } = useMitt()
  const { y } = useWindowScroll()
  const isMobileDevice = useIsMobileDevice()

  const scrollerRef = useRef({
    ease,
    endY: 0,
    y: 0,
    scrollRequest: 0,
  })
  const requestRef = useRef(0)

  const updateScroller = useCallback(() => {
    const scroller = scrollerRef.current
    const scrollY = window.pageYOffset

    scroller.endY = scrollY
    scroller.y += (scrollY - scroller.y) * (isMobileDevice ? 1 : scroller.ease)

    if (Math.abs(scrollY - scroller.y) < 0.05) {
      scroller.y = scrollY
      scroller.scrollRequest = 0
    }

    emitter.emit(EMITTER.animatedScrollY, scroller.y)

    requestRef.current = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null
  }, [emitter, isMobileDevice])

  useEffect(() => {
    emitter.emit(EMITTER.scrollY, y)
    scrollerRef.current.scrollRequest = 1
    if (!requestRef.current) {
      requestRef.current = requestAnimationFrame(updateScroller)
    }
  }, [y, emitter, updateScroller])
}

export default useScrollYEmitter
