import React, { FC, useEffect, useRef } from 'react'
import { useEffectOnce, useMeasure } from 'react-use'
import gsap from 'gsap'
import { useMitt } from 'react-mitt'
import { EMITTER } from '../../constants/emitter'

interface Props {
  isCurrent: boolean
}

const PScrollContent: FC<Props> = ({ children, isCurrent }) => {
  const ref = useRef(null)
  const [measureRef, { height }] = useMeasure()
  const { emitter } = useMitt()

  useEffect(() => {
    if (isCurrent) {
      emitter.emit(EMITTER.bodyHeight, height)
    }
  }, [isCurrent, height, emitter])

  useEffectOnce(() => {
    const onAnimatedScrollY = (animatedScrollY: number) => {
      gsap.set(ref.current, { y: -animatedScrollY, force3D: true })
    }
    emitter.on(EMITTER.animatedScrollY, onAnimatedScrollY)
    return () => emitter.off(EMITTER.animatedScrollY, onAnimatedScrollY)
  })

  return (
    <div
      ref={(el) => {
        ref.current = el
        measureRef(el)
      }}
      className="fixed inset-x-0 top-0"
    >
      {children}
    </div>
  )
}

export default PScrollContent
