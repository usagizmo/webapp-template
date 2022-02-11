import { GetCurrentUserQuery } from '@/generated/graphql-api'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    idToken: string
    user: DefaultSession['user'] &
      NonNullable<GetCurrentUserQuery['users_by_pk']>
  }
}
