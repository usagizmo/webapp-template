import React, { FC } from 'react'
import Link from 'next/link'
import { ROUTE } from '../constants/route'
import { useRouter } from 'next/router'

interface Props {}

const CNavigation: FC<Props> = () => {
  const router = useRouter()
  const pathname = router.pathname
  const { id: queryId } = router.query

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
