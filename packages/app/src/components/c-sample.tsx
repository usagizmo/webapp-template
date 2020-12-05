import React, { FC, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'

interface Props {}

const CSample: FC<Props> = () => {
  const { width, height } = useWindowSize()
  const [windowSize, setWindowSize] = useState('')

  useEffect(() => {
    setWindowSize(`{ width: ${width}, height: ${height} }`)
  }, [height, width])

  return (
    <div className="h-full flex justify-center flex-col items-center">
      <aside className="py-2 px-4 rounded-lg border text-xs border-gray-500 whitespace-pre-wrap">
        <p>Window Size: {windowSize}</p>
      </aside>
    </div>
  )
}

export default CSample
