import { CurrentUserQuery } from '@/generated/graphql-api'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    idToken: string
    user: DefaultSession['user'] & NonNullable<CurrentUserQuery['users_by_pk']>
  }
}
