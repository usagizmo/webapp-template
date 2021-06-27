import React, { FC } from 'react'
import Link from 'next/link'
import { ROUTE } from '../constants/route'

interface Props {
  pathname: string
  queryId?: string
}

const CNavigation: FC<Props> = ({ pathname, queryId }) => {
  return (
    <ul css={{ display: 'flex' }}>
      <li
        css={{
          padding: '0 8px',
          ...{
            color: pathname === ROUTE.HOME ? '#111' : '#666',
            '&:hover': {
              color: '#111',
            },
          },
        }}
      >
        <Link href={ROUTE.HOME}>HOME</Link>
      </li>
      <li
        css={{
          padding: '0 8px',
          ...{
            color: pathname === ROUTE.DETAIL_ID && queryId === '1' ? '#111' : '#666',
            '&:hover': {
              color: '#111',
            },
          },
        }}
      >
        <Link href={{ pathname: ROUTE.DETAIL_ID, query: { id: 1 } }}>detail/1</Link>
      </li>
      <li
        css={{
          padding: '0 8px',
          ...{
            color: pathname === ROUTE.DETAIL_ID && queryId === '2' ? '#111' : '#666',
            '&:hover': {
              color: '#111',
            },
          },
        }}
      >
        <Link href={{ pathname: ROUTE.DETAIL_ID, query: { id: 2 } }}>detail/2</Link>
      </li>
    </ul>
  )
}

export default CNavigation
