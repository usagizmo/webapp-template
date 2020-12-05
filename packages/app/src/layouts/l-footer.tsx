import React, { FC } from 'react'

interface Props {
  text: string
}

const LFooter: FC<Props> = ({ text }) => {
  return <p className="px-4 py-2 text-xs">{text}</p>
}

export default LFooter
