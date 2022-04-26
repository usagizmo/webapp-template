import { useCurrentUserQuery } from 'generated/dist/graphql-api'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { firebaseAdmin } from '@/lib/firebaseAdmin'

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        idToken: { label: 'ID Token', type: 'password' },
      },
      async authorize(credentials) {
        const { idToken } = credentials ?? { idToken: null }
        if (!idToken) return null

        let decoded = null
        try {
          decoded = await firebaseAdmin.auth().verifyIdToken(idToken)
        } catch (error) {
          console.error('Failed to verify ID token:', error)
        }
        return { ...decoded, idToken }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token['idToken'] = user['idToken']
        token['uid'] = user['uid']
      }
      return token
    },
    async session({ session, token }) {
      const idToken = token['idToken'] as string

      const { users_by_pk } = await useCurrentUserQuery.fetcher(
        {
          endpoint: process.env['NEXT_PUBLIC_GRAPHQL_ENDPOINT'] as string,
          fetchParams: {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          },
        },
        { id: token['uid'] as string }
      )()
      const { __typename, ...hasuraUser } = users_by_pk ?? {}
      const extraProps = (
        Object.keys(hasuraUser) as Array<keyof typeof hasuraUser>
      ).map((key) => ({
        key,
        value: hasuraUser[key],
      }))

      // Set extra props on session
      session.idToken = idToken
      extraProps.forEach(({ key, value }) => {
        session.user[key] = value
      })

      return session
    },
  },
  secret: process.env['NEXTAUTH_SECRET']!,
  jwt: {
    secret: process.env['NEXTAUTH_SECRET']!,
  },
})
