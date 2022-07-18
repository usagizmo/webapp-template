import type { CurrentUserQuery } from 'generated/dist/graphql-api'
import type { NextPage } from 'next'

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}
