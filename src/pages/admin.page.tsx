import React, { VFC } from 'react'
import { SignOut } from 'phosphor-react'
import { useSession } from 'next-auth/react'
import { Layout } from '@/components/layout'
import { Navigation } from '@/components/navigation'
import { LoginFields } from '@/components/login-fields'
import { CONST } from '@/constants/const'
import { Button } from '@/components/button'
import { useAuth } from '@/hooks/use-auth'

interface Props {}

const AdminPage: VFC<Props> = () => {
  const { signOut } = useAuth()
  const { data: session } = useSession()

  return (
    <Layout>
      <header className="u-flex-center h-[80px]">
        <h1 className="text-[24px] font-bold">{CONST.SITE_NAME}</h1>
      </header>
      <div className="container max-w-[480px]">
        <Navigation />

        <div className="mt-[24px]">
          {session ? (
            <div className="text-center">
              <p>
                Logged in as{' '}
                <span className="mt-[4px] block text-[20px] font-medium">{session.user.id}</span>
              </p>
              <div className="mt-[40px]">
                <Button
                  onClick={() => {
                    signOut()
                  }}
                >
                  <SignOut width={20} height={20} className="mr-[6px]" />
                  <span>Sign out</span>
                </Button>
              </div>
            </div>
          ) : (
            <LoginFields />
          )}
        </div>
      </div>
    </Layout>
  )
}

export default AdminPage
