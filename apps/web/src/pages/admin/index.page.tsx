import type { ReactElement } from 'react'
import { useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { SignOut } from 'phosphor-react'
import { Button } from '@/components/Button/Button'
import { Layout } from '@/components/Layout/Layout'
import { useAuth } from '@/hooks/useAuth'
import { useQueryHandle } from '@/hooks/useQueryHandle'
import type { NextPageWithLayout } from '@/types'
import { LoginFields } from './components/LoginFields'

const usePage = () => {
  const { signOut } = useAuth()
  const { data: session, status } = useSession()
  const queryHandle = useQueryHandle({ status })

  return {
    signOut,
    session,
    queryHandle,
  }
}

const Page: NextPageWithLayout = () => {
  const { signOut, session, queryHandle } = usePage()

  return (
    <>
      <NextSeo title="Admin" />
      <main className="container max-w-lg">
        {queryHandle ??
          (session ? (
            <div className="text-center">
              <p>
                Logged in as{' '}
                <span className="mt-1 block text-2xl font-medium">
                  {session.user.email}
                </span>
                <span className="mt-1block text-sm">{session.user.id}</span>
              </p>
              <div className="mt-10">
                <Button
                  onClick={() => {
                    signOut()
                  }}
                >
                  <SignOut width={20} height={20} className="mr-1.5" />
                  <span>Sign out</span>
                </Button>
              </div>
            </div>
          ) : (
            <LoginFields />
          ))}
      </main>
    </>
  )
}

Page.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}

export default Page
