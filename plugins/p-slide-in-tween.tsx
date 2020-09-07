import React, { FC } from 'react'
import { Tween } from 'react-gsap'

interface Props {
  delay?: number
}

const PSlideInTween: FC<Props> = ({ children, delay }) => {
  delay = delay ?? 0
  return (
    <Tween
      from={{ y: '32px', opacity: 0 }}
      duration={1.2}
      stagger={0.08}
      delay={delay}
      force3D={true}
      ease="power3"
    >
      {children}
    </Tween>
  )
}

export default PSlideInTween
