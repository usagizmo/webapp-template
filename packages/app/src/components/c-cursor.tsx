import React, { FC, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import {
  useMouseDown,
  useMouseMove,
  useMouseUp,
} from '../plugins/mouse-on-window/use-mouse-on-window'
import { useStore } from '../store/use-store'

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
    <animated.div style={{ x, y }} css={{ position: 'absolute', top: 0, left: 0 }}>
      <div
        css={{
          width: 32,
          height: 32,
          marginTop: -16,
          marginLeft: -16,
          opacity: 0.5,
          transitionDuration: '0.1s',
          borderRadius: '50%',
          ...(isDown
            ? { backgroundColor: 'lightpink', transform: 'scale(1.5)' }
            : { backgroundColor: 'aquamarine', transform: 'scale(0.5)' }),
        }}
      />
    </animated.div>
  )
}

export default CCursor
