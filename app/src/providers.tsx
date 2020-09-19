import React, { FC } from 'react'
import { MittProvider } from 'react-mitt'
import { RecoilRoot } from 'recoil'

interface Props {}

const Providers: FC<Props> = ({ children }) => {
  return (
    <RecoilRoot>
      <MittProvider>{children}</MittProvider>
    </RecoilRoot>
  )
}

export default Providers
