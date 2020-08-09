import React, { FC, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

interface Props {
  text: string
}

const Node: FC<Props> = ({ text }: Props) => {
  const { width, height } = useWindowSize()
  const [windowSize, setWindowSize] = useState('')

  useEffect(() => {
    setWindowSize(`{ width: ${width}, height: ${height} }`)
  }, [height, width])

  return (
    <div className="absolute inset-0 flex justify-center flex-col items-center text-3xl">
      <p>{text}</p>
      <aside className="mt-4 py-2 px-4 rounded-lg border text-sm border-gray-500">
        <p>{windowSize}</p>
      </aside>
    </div>
  )
}

export default Node
