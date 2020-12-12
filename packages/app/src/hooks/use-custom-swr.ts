import { request } from 'graphql-request'
import { RequestDocument } from 'graphql-request/dist/types'
import useSWR from 'swr'

const API_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL

// A sample when using WordPress
// Use:
// - https://www.wpgraphql.com/
// - https://github.com/wp-graphql/wp-graphql-acf
// - https://github.com/valu-digital/wp-graphql-offset-pagination

// eslint-disable-next-line
export const fetcher = (query: RequestDocument, variables = {}) =>
  request(API_URL, query, variables)

// eslint-disable-next-line
export const useSWRSettings = () => {
  return useSWR(
    `query Settings {
      readingSettings {
        postsPerPage
      }
    }`,
    fetcher
  )
}

// eslint-disable-next-line
export const useSWRAllPostsForHome = ({ size, offset }: { size: number; offset: number }) => {
  return useSWR(
    size === 0
      ? null
      : [
          `query PostsForHome($size: Int, $offset: Int) {
            posts(where: {offsetPagination: {offset: $offset, size: $size}}) {
              pageInfo {
                offsetPagination {
                  total
                }
              }
              nodes {
                id
                title
                content
              }
            }
          }`,
          size,
          offset,
        ],
    (query, size, offset) => fetcher(query, { size, offset })
  )
}

// eslint-disable-next-line
export const useSWRPostForDetail = (slug: string) => {
  return useSWR(
    [
      `query PostForDetail($slug: ID!) {
        post(idType: SLUG, id: $slug) {
          id
          title
          content
        }
      }`,
      slug,
    ],
    (query, slug) => fetcher(query, { slug })
  )
}
