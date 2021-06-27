import React, { FC } from 'react'
import Link from 'next/link'
import { ROUTE } from '../constants/route'
import { flex } from '../styles/flex'
import CNavigation from '../components/c-navigation'

interface Props {
  text: string
}

const LHeader: FC<Props> = ({ text }) => {
  return (
    <div css={[flex.column, flex.center, { padding: '8px 16px' }]}>
      <div css={{ fontSize: 24 }}>
        <Link href={ROUTE.HOME}>{text}</Link>
      </div>
      <div css={{ marginTop: 16 }}>
        <CNavigation />
      </div>
    </div>
  )
}

export default LHeader
