import { VFC } from 'react'
import { SignOut } from 'phosphor-react'
import { useSession } from 'next-auth/react'
import { Layout } from '@/components/layout'
import { Navigation } from '@/components/navigation'
import { CONST } from '@/constants/const'
import { Button } from '@/components/button'
import { useAuth } from '@/hooks/use-auth'
import { useQueryHandle } from '@/hooks/use-query-handle'
import { LoginFields } from './components/login-fields'

type Props = {}

const AdminPage: VFC<Props> = () => {
  const { signOut } = useAuth()
  const { data: session, status } = useSession()
  const queryHandle = useQueryHandle({ status })

  return (
    <Layout>
      <header className="flex h-20 items-center justify-center">
        <h1 className="text-[24px] font-bold">{CONST.SITE_NAME}</h1>
      </header>
      <div className="container max-w-[480px]">
        <Navigation />

        <div className="mt-6">
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
        </div>
      </div>
    </Layout>
  )
}

export default AdminPage
