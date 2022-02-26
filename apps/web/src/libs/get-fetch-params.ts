import { getSession } from 'next-auth/react'

export const getFetchParams = async () => {
  const session = await getSession()
  const idToken = session?.idToken
  return idToken ? { headers: { Authorization: `Bearer ${idToken}` } } : {}
}
