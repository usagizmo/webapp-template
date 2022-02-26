// This is an example of how to access a session from an API route
import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })
  res.send(JSON.stringify(session, null, 2))
}
