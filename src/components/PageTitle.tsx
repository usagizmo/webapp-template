import React, { VFC } from 'react'

interface Props {
  title: string
}

const PageTitle: VFC<Props> = ({ title }) => {
  return (
    <div className="container">
      <div className="flex-center">
        <h1 className="text-2xl font-medium">{title}</h1>
      </div>
    </div>
  )
}

export default PageTitle
