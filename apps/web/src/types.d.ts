import type { CurrentUserQuery } from 'generated/dist/graphql-api'
import type { NextPage } from 'next'
import type { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    idToken: string
    user: DefaultSession['user'] & NonNullable<CurrentUserQuery['users_by_pk']>
  }
}

export type NextPageWithLayout<T = {}> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode
}
