import React, { FC } from 'react'
import { MittProvider } from 'react-mitt'

interface Props {}

const FProviders: FC<Props> = ({ children }) => {
  return <MittProvider>{children}</MittProvider>
}

export default FProviders
