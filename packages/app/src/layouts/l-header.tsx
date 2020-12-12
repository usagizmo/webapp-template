import React, { FC } from 'react'
import Link from 'next/link'
import { ROUTE } from '../constants/route'

interface Props {
  text: string
}

const LHeader: FC<Props> = ({ text }) => {
  return (
    <div className="px-4 py-2 text-3xl text-center">
      <Link href={ROUTE.HOME}>{text}</Link>
    </div>
  )
}

export default LHeader
