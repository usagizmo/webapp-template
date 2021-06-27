import React, { FC } from 'react'
import Link from 'next/link'
import { useSWRAllPostsForHome } from '../hooks/use-custom-swr'
import usePage from '../plugins/wp/use-page'
import { PostForHome, PageInfo } from '../interfaces'
import { ROUTE } from '../constants/route'

interface Props {}

const CCustomSWR: FC<Props> = () => {
  const { postsPerPage, offset } = usePage()
  const { data, error } = useSWRAllPostsForHome({ size: postsPerPage, offset })
  const posts: PostForHome[] = data?.posts?.edges ?? []
  const pageInfo: PageInfo | null = data?.posts?.pageInfo ?? null

  if (error) return <div>failed to load</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      {posts.map(({ node }) => (
        <Link key={node.id} href={{ pathname: ROUTE.DETAIL_ID, query: { id: node.id } }} passHref>
          <a css={{ display: 'block', marginTop: 4, '&:hover': { opacity: 0.75 } }}>{node.title}</a>
        </Link>
      ))}
      <p>{pageInfo.offsetPagination.total}</p>
    </>
  )
}

export default CCustomSWR
