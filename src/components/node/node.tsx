import React, { FC } from 'react'
import { useWindowSize } from 'react-use'
import style from './node.module.scss'

interface Props {
  text: string
}

const Node: FC<Props> = ({ text }: Props) => {
  const { width, height } = useWindowSize()
  return (
    <div className={style.base}>
      <p>{text}</p>
      <aside>
        <p>
          {'{'} width: {width}, height: {height} {'}'}
        </p>
      </aside>
    </div>
  )
}

export default Node
