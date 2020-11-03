import React, { FC, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import {
  useMouseDown,
  useMouseMove,
  useMouseUp,
} from '../plugins/mouse-on-window/use-mouse-on-window'
import useStore from '../store'

const trans = (x: number, y: number) => `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`

const initialStyle = 'bg-teal-300 scale-50'

interface Props {}

const CCursor: FC<Props> = () => {
  const initialMouse = useStore((state) => state.mutation.mouse)
  const [props, set] = useSpring(() => ({ xy: [initialMouse.x, initialMouse.y], opacity: 1 }))
  const [style, setStyle] = useState(initialStyle)

  useMouseDown(() => {
    setStyle('bg-pink-300 scale-150')
  })

  useMouseMove(({ x, y }) => {
    set({ xy: [x, y] })
  })

  useMouseUp(() => {
    setStyle(initialStyle)
  })

  return (
    <animated.div
      style={{ transform: props.xy.interpolate(trans as any), opacity: props.opacity }}
      className="absolute top-0 left-0 pointer-events-none"
    >
      <div className={`w-8 h-8 rounded-full opacity-50 duration-100 transform ${style}`} />
    </animated.div>
  )
}

export default CCursor
