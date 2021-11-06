import React from 'react'
import Layout from '../components/Layout'
import Navigation from '../components/Navigation'
import LoginFields from '../components/LoginFields'
import CONST from '../constants/const'
import useStore from '../store/useStore'
import { useLogout } from '../hooks/useLogout'
import { SignOut } from 'phosphor-react'
import Button from '../components/Button'

export default function AdminPage() {
  const user = useStore((state) => state.user)
  const { logout } = useLogout()

  return (
    <Layout>
      <header className="u-flex-center h-[80px]">
        <h1 className="text-[24px] font-bold">{CONST.SITE_NAME}</h1>
      </header>
      <div className="container max-w-[480px]">
        <Navigation />

        <div className="mt-[24px]">
          {user ? (
            <div className="text-center">
              <p>
                Logged in as{' '}
                <span className="block mt-[4px] font-medium text-[20px]">{user.email}</span>
              </p>
              <div className="mt-[40px]">
                <Button
                  onClick={() => {
                    logout()
                  }}
                >
                  <SignOut width={20} height={20} className="mr-[4px]" />
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
