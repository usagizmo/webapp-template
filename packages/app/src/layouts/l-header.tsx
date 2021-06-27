import React, { FC } from 'react'
import Link from 'next/link'
import { ROUTE } from '../constants/route'

interface Props {
  text: string
}

const LHeader: FC<Props> = ({ text }) => {
  return (
    <div css={{ padding: '8px 16px', textAlign: 'center', fontSize: 24 }}>
      <Link href={ROUTE.HOME}>{text}</Link>
    </div>
  )
}

export default LHeader
