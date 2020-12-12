import React, { FC, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import classnames from 'classnames'
import {
  useMouseDown,
  useMouseMove,
  useMouseUp,
} from '../plugins/mouse-on-window/use-mouse-on-window'
import useStore from '../store'

interface Props {}

const CCursor: FC<Props> = () => {
  const initialMouse = useStore((state) => state.mutation.mouse)
  const [{ x, y }, set] = useSpring(() => ({ x: initialMouse.x, y: initialMouse.y }))
  const [isDown, setIsDown] = useState(false)

  useMouseDown(() => {
    setIsDown(true)
  })

  useMouseMove(({ x, y }) => {
    set({ x, y })
  })

  useMouseUp(() => {
    setIsDown(false)
  })

  return (
    <animated.div style={{ x, y }} className="absolute top-0 left-0 pointer-events-none">
      <div
        className={classnames(
          '-ml-4 -mt-4 w-8 h-8 rounded-full opacity-50 duration-100 transform',
          {
            'bg-pink-300 scale-150': isDown,
            'bg-green-300 scale-50': !isDown,
          }
        )}
      />
    </animated.div>
  )
}

export default CCursor
