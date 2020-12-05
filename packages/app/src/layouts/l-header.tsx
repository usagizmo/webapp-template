import React, { FC } from 'react'

interface Props {
  text: string
}

const LHeader: FC<Props> = ({ text }) => {
  return <div className="px-4 py-2 text-3xl">{text}</div>
}

export default LHeader
