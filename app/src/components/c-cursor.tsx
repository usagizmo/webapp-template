import React, { FC } from 'react'
import { useSpring, animated } from 'react-spring'
import useMouseMove from '../plugins/mouse-move/use-mouse-move'

const trans = (x: number, y: number) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`

interface Props {}

const CCursor: FC<Props> = () => {
  const [props, set] = useSpring(() => ({ xy: [0, 0], opacity: 1 }))

  useMouseMove(({ x, y }) => {
    set({ xy: [x, y] })
  })

  return (
    <animated.div
      style={{ transform: props.xy.interpolate(trans as any), opacity: props.opacity }}
      className="absolute top-0 left-0 pointer-events-none"
    >
      <div className="w-8 h-8 bg-teal-300 rounded-full opacity-50" />
    </animated.div>
  )
}

export default CCursor
