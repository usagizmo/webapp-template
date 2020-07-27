import React, { FC } from 'react'
import style from './node.module.scss'

interface Props {
  text: string
}

const Node: FC<Props> = ({ text }: Props) => {
  return <p className={style.base}>{text}</p>
}

export default Node
