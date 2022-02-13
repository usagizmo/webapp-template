import { DefaultSession } from 'next-auth'
import { CurrentUserQuery } from '@/generated/graphql-api'

declare module 'next-auth' {
  interface Session {
    idToken: string
    user: DefaultSession['user'] & NonNullable<CurrentUserQuery['users_by_pk']>
  }
}
