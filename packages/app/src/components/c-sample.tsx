import React, { FC, useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
// import { useArticlesQuery } from '../plugins/graphql/generated/client'

interface Props {
  text: string
}

const CSample: FC<Props> = ({ text }) => {
  const { width, height } = useWindowSize()
  const [windowSize, setWindowSize] = useState('')

  // const articlesQuery = useArticlesQuery()

  useEffect(() => {
    setWindowSize(`{ width: ${width}, height: ${height} }`)
  }, [height, width])

  // if (articlesQuery.loading || !articlesQuery.data) {
  //   return <p>Loading...</p>
  // }

  return (
    <div className="absolute inset-x-0 top-0 h-screen flex justify-center flex-col items-center text-3xl">
      <p>{text}</p>
      <aside className="mt-4 py-2 px-4 rounded-lg border text-xs border-gray-500 whitespace-pre-wrap">
        <p>Window Size: {windowSize}</p>
      </aside>
    </div>
  )
}

export default CSample
